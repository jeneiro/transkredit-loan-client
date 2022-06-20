import React, { useState, Fragment } from "react";

import IndividualSteppr from "./individualSteppr";
import "./form.css";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
export default function BankDetails() {
  const [payload, setPayload] = useState({});
  const individualId = localStorage.getItem("individualId")
  const individualURL = `${webapibaseurl}/bank-detail/${individualId}`;
  const alert = useAlert();
  const navigate = useNavigate();
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  
  }
  function submitForm(e){
    e.preventDefault()
  
    axios.post(individualURL, payload).then(()=>{
      alert.success("Next of Kin Details Submitted")
      navigate("/app/passport-upload")
    }
    
    ).catch((error)=>{alert.error(error.response.data.msg)})
  }

  return (
    <div style={{ marginTop: 155 }}>
      <IndividualSteppr activeStep={3} />
      <div class="Form-container ">
        <form className="register-form" onSubmit={submitForm}>
          <h5>Individual Registration</h5>
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
            <h6>BANK DETAIL FOR DISBURSMENT/REPAYMENT</h6>
          </div>
          <div style={{ padding: 2 }}>
            <div class="row">
              <div class="input-group col-md-6">
                <label>Bank Name</label>
                <input
                  type="text"
                  placeholder="Bank Name"
                  name="bankName"
                  value={"" || payload.bankName}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class="input-group col-md-6">
                <label>Account Name</label>
                <input
                  type="text"
                  placeholder="Account Name"
                  name="accountName"
                  value={"" || payload.accountName}
                  required
                  onChange={changeHandler}
                />
              </div>
            </div>

          

            <div className="row">
              <div className="input-group col-md-4">
                <label>Account Number</label>
                <input
                  type="number"
                  className="input-group"
                  placeholder="Account Number"
                  name="accountNumber"
                  value={"" || payload.accountNumber}
                  required
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="col-md-4" style={{ marginTop: 30 }}>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
