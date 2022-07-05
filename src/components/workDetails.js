import React, { useState, Fragment } from "react";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import IndividualSteppr from "./individualSteppr";
import "./form.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
export default function WorkDetails() {
  const [payload, setPayload] = useState({});
  const individualId = localStorage.getItem("individualId")
  const alert = useAlert();
  const navigate = useNavigate();
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
    console.log(e.target.name);
  }
  const individualURL = `${webapibaseurl}/work-detail/${individualId}`;
  function submitForm(e){
    e.preventDefault()
   
    axios.post(individualURL, payload).then(()=>{
      alert.success("Work Details Submitted")
      navigate("/app/bank-detail")
    }
    
    ).catch((error)=>{alert.error(error.response.data.msg)})
  }
  return (
    <div style={{ marginTop: 155 }}>
      <IndividualSteppr activeStep={2} />
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
            <h6>WORK DETAILS</h6>
          </div>
          <div style={{ padding: 2 }}>
            <div class="row">
              <div class="input-group col-md-6">
                <label>Place of Work</label>
                <input
                  type="text"
                  placeholder="Place of Work"
                  name="placeOfWork"
                  value={"" || payload.placeOfWork}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class="input-group col-md-6">
                <label>Nature of BUsiness</label>
                <input
                  type="text"
                  placeholder="Nature of BUsiness"
                  name="natureOfBusiness"
                  value={"" || payload.natureOfBusiness}
                  required
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="row">
            <div class=" col-md-4">
                <label>Source Of Regular Income</label>
                <select
                  name="sourceOfIncome"
                  class="input-group"
                  required="required"
                  onChange={changeHandler}
                > <option >--Source Of Income--</option>
                  <option value="Salary">Salary</option>
                  <option value="Business">Business Revenue/Profit</option>
                  <option value="Inheritance">Inheritance</option>
                 
                </select>
              </div>
              <div class="input-group col-md-8">
                <label>Annual Income Range</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="salaryRange"
                  onChange={changeHandler}
                >
                  <FormControlLabel
                    value="Below N5M"
                    control={<Radio />}
                    label="Below N5M"
                  />
                  <FormControlLabel
                    value="N5M-N10M"
                    control={<Radio />}
                    label="N5M-N10M"
                  />
                  <FormControlLabel
                    value="N10M-N50M"
                    control={<Radio />}
                    label="N10M-N50M"
                  />
                    <FormControlLabel
                    value="N50M-N100M"
                    control={<Radio />}
                    label="Above N100M"
                  />
                 
                </RadioGroup>
              </div>
            </div>

            <div className="row">
              <div className="input-group col-md-8">
                <label>Work Address</label>
                <input
                  type="text"
                  className="input-group"
                  placeholder="Work Address"
                  name="workAddress"
                  value={"" || payload.workAddress}
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
      <div style={{height:100}}>
        &nbsp;
      </div>
    </div>
  );
}
