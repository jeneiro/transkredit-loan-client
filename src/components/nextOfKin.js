import React, { useState, Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import IndividualSteppr from "./individualSteppr";
import "./form.css";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function NextOfKin() {
  const individualId = localStorage.getItem("individualId")
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});

  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
   
  }
  const individualURL = `${webapibaseurl}/nextofkin/${individualId}`;
  function submitForm(e){
    e.preventDefault()
    console.log(payload)
    axios.post(individualURL, payload).then(()=>{
      alert.success("Next of Kin Details Submitted")
      navigate("/app/work-detail")
    }
    
    ).catch((error)=>{alert.error(error.response.data.msg)})
  }
  return (
    <div style={{marginTop:160}}>
     <IndividualSteppr activeStep={1} />
      <div class="Form-container ">
     
        <form className="register-form" onSubmit={submitForm}>
        <h5>Individual Account Registration</h5>
          <hr />
          <div
            class="row"
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <h6>NEXT OF KIN INFORMATION</h6>
          </div>
          <div style={{ padding: 2 }}>
            <div class="row">
             
                
              <div class="input-group col-md-8">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={"" || payload.name}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className=" input-group col-md-4">
                {" "}
                <label>Relationship</label>{" "}
                <input
                  type="text"
                  placeholder="Relationship"
                  required
                  name="relationship"
                  value={"" || payload.relationship}
                  onChange={changeHandler}
                />
              </div>
            </div>

            
            <div className="row">
              <div className=" input-group col-md-4">
                {" "}
                <label>Phone Number</label>{" "}
                <input
                  type="number"
                  placeholder="Phone Number"
                  minLength={11}
                  required
                  name="phone"
                  value={"" || payload.phone}
                  onChange={changeHandler}
                />
              </div>

              <div className=" input-group col-md-4">
                {" "}
                <label>Email Address</label>{" "}
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  name="email"
                  value={"" || payload.email}
                  onChange={changeHandler}
                />
              </div>

           
            </div>

          
      

            <div className="row">
            <div className="input-group col-md-8">
            <label>Address</label>
              <input type="text"
              className="input-group"
                  placeholder="Address"
                  name="address"
                  value={"" || payload.address}
                  required
                  onChange={changeHandler}></input>
            </div>
            <div className="col-md-4" style={{marginTop:30}}>

              <button>Submit</button>
            </div>
            </div>
          </div>

      
        </form>
      </div>
      <div style={{height:100}}>
        &nbsp;
      </div>
    </div>
  );
}
