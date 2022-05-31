import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { webapibaseurl } from "../environment";
import IndividualRequestTable from "./individualReqTable";
export default function JoinCorporative() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [corporative, setCorporative] = useState([]);
  const [reqcorporative, setReqCorporative] = useState([]);
  const [activate, setActivate] = useState(true);

  const id = localStorage.getItem("id");

  const url = `${webapibaseurl}/joinRequest/${id}`;
  const username = localStorage.getItem("username");
  useEffect(() => {
    const corporativeURL = `${webapibaseurl}/corporative`;
    axios.get(corporativeURL).then((res) => {
      setCorporative(res.data.corporative);
    });
    axios.get(url).then((res) => {
      console.log(res.data);
      setReqCorporative(res.data.data);
    });
  }, []);

  const row = corporative.map((corp) => {
    return <option value={corp.CorporateId}>{corp.name}</option>;
  });

  function submitForm(e) {
    e.preventDefault();
    payload.IndividualName = username;
    axios
      .post(url, payload)
      .then((res) => {
        axios.get(url).then((res) => {
          console.log(res.data);
          setReqCorporative(res.data.data);
        });
        alert.success("Request to Join Cooporative Sent");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function changeHandler(e) {
    e.preventDefault();

    const value = e.target.value;
    const name = e.target.name;
    setPayload({ ...payload, [name]: value });
  }
  function changeHandler2(e) {
    e.preventDefault();

    const value = e.target.value;
    const getCorpurl = `${webapibaseurl}/corporative/${value}`;
    axios.get(getCorpurl).then((res) => {
        console.log(res.data.corporative)
       
     setPayload({...payload, ...res.data.corporative});
    });
  }
  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-6 offset-3">
        <div className="Form-container ">
          <h5>Cooporative</h5>
          <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <b>Join Cooporative</b>
          </div>

          <form className="register-form" onSubmit={submitForm}>
            <hr />

            <div className="row">
              <div class=" col-md-6">
                <label>Staff ID</label>
                <input
                  name="StaffId"
                  type="text"
                  class="input-group"
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class=" col-md-6">
                <label>Select Cooporative</label>
                <select
                  name="CorporateId"
                  class="input-group"
                  required
                  onChange={changeHandler2}
                >
                  <option selected>-List Of Cooporative-</option>
                  {row}
                </select>
              </div>
              <div className="col-md-4" style={{ marginTop: 30 }}>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-8 offset-2" style={{ padding: 10 }}>
        <IndividualRequestTable corporative={reqcorporative} />
      </div>
    </div>
  );
}
