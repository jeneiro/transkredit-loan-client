import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { webapibaseurl } from "../environment";
export default function JoinCorporative() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [corporative, setCorporative] = useState([]);
  const [activate, setActivate] = useState(true);
  const id = localStorage.getItem("IndividualId");

  useEffect(() => {
    const corporativeURL = `${webapibaseurl}/corporative`;
    axios.get(corporativeURL).then((res) => {
    
      setCorporative(res.data.corporative)

    
    });
  }, []);
  const url = `${webapibaseurl}/joinRequest/${id}`;

  const row = corporative.map((corp)=>{
      return <option value={corp.CorporateId}>{corp.name}</option>
  })
 
  function submitForm(e) {
    e.preventDefault();
   
    axios.post(url, payload).then((res)=>{
  
        alert.success("Request to Join Corporative Sent")
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
            <b>Join Corporative</b>
          </div>

          <form className="register-form" onSubmit={submitForm}>
            <hr />

            <div className="row">
            <div class=" col-md-6">
                <label>Select Corporative</label>
                <select
                  name="title"
                  class="input-group"
                  required
                  onChange={changeHandler}
                >
              
                  <option selected>-List Of Corporative-</option>
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
    </div>
  );
}