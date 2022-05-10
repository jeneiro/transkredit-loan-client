import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { webapibaseurl } from "../environment";
export default function Corporative() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [directors, setDirectors] = useState([]);
  const [activate, setActivate] = useState(true);
  const id = localStorage.getItem("CorporateId");

  useEffect(() => {
    const director = `${webapibaseurl}/director/${id}`;
    axios.get(director).then((res) => {
      console.log(res.data);
      setDirectors(res.data.directors);
    });
  }, []);
  const url = `${webapibaseurl}/corporative/${id}`;
 
  function submitForm(e) {
    e.preventDefault();
   
    axios.post(url, payload).then((res)=>{
        console.log(res.data)
        alert.success("Corporative Created")
    }).catch((err)=>{
        console.log(err)
    })
  }
  function changeHandler(e) {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  }
  return (
    <div>
      <div style={{ marginTop: 155 }} className="col-md-6 offset-3">
        <div className="Form-container ">
          <h5>Corporative</h5>
          <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <b>Add Corporative</b>
          </div>

          <form className="register-form" onSubmit={submitForm}>
            <hr />

            <div className="row">
              <div class="input-group col-md-6">
                <label>Corporative Name</label>
                <input
                  type="text"
                  placeholder="Corporative Name"
                  name="name"
                  value={"" || payload.name}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className="col-md-4" style={{ marginTop: 30 }}>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
