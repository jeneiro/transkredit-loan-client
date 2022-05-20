import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import "./form.css";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
export default function LoanApplication() {
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [corpList, setCorpList] = useState([]);
  const individualId = localStorage.getItem("individualId");
  const userType = localStorage.getItem("userType");
  const individualURL = `${webapibaseurl}/bank-detail/${individualId}`;
  const url = `${webapibaseurl}/joinRequest/approved/${individualId}`;

  const [amount, setAmount] = useState();
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data.data);
      setCorpList(res.data.data)
    });
  }, []);
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  }
  function changeHandler2(e) {
    e.preventDefault();

    const value = e.target.value;
    if (value === "yes") {
      setShow(true);
    }
    if (value === "no") {
      setShow(false);
    }
  }
  function submitForm(e) {
    e.preventDefault();
    console.log(payload);
    axios
      .post(individualURL, payload)
      .then(() => {
        alert.success("Loan Request Submitted");
        navigate("/app/home");
      })
      .catch((error) => {
        alert.error(error.response.data.msg);
      });
  }

  function checkType() {
    if (userType === "Individual") {
      return (
        <div className="row">
          <div className="col-md-6">
            <label>Are you applying through your corporative?</label>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="salaryRange"
              onChange={changeHandler2}
            >
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </div>
          {show && (
            <div className="col-md-6">
              <label>Select Corporative</label>
              <select
                name="loanType"
                class="input-group"
                onChange={changeHandler}
              >
                <option disabled selected>
                  -Select Corporative-
                </option>

               {corpList.map((corp)=>{
                  return <option value={corp.CorporativeName}>{corp.CorporativeName}</option>
               })} 
               
              </select>
            </div>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  }
  return (
    <div style={{ marginTop: 155 }}>
      <div class="Form-container ">
        <form className="register-form" onSubmit={submitForm}>
          <h5>Loan Applcation</h5>
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
            <h6>FILL DETAILS TO BOOK A LOAN</h6>
          </div>
          <div style={{ padding: 2 }}>
            <div class="row">
              <div className="col-md-6">
                <label> Loan Amount </label>

                <div>
                  <CurrencyFormat
                    thousandSeparator={true}
                    prefix={"NGN"}
                    className="currency"
                    value={amount || payload.amount}
                    onValueChange={(values) => {
                      const { formattedValue, value } = values;

                      setAmount(value);
                      // setFormattedAmount2(formattedValue);
                    }}
                  />
                </div>
              </div>
              <div class=" col-md-3">
                <label>Loan Type</label>
                <select
                  name="loanType"
                  class="input-group"
                  onChange={changeHandler}
                >
                  <option disabled selected>
                    -Select Loan Type-
                  </option>
                  <option value="Consumer Loan">Consumer Loan</option>
                  <option value="Corporate Loan">Corporate Loan</option>
                </select>
              </div>
              <div class=" col-md-3">
                <label>Repayment Mode</label>
                <select
                  name="repaymentMode"
                  class="input-group"
                  onChange={changeHandler}
                >
                  <option disabled selected>
                    -Repayment Mode-
                  </option>
                  <option value="Direct Debit">Direct Debit</option>
                  <option value="Cheques">Cheques</option>
                </select>
              </div>
              <div class=" col-md-2">
                <label>Tenor</label>
                <input
                  className="input-group"
                  onChange={changeHandler}
                  name="tenor"
                  value={"" || payload.tenor}
                  type="number"
                  placeholder="Tenor"
                />
              </div>
              <div class=" col-md-7">{checkType()}</div>
              <div class=" col-md-3" style={{ marginTop: 35 }}>
                {" "}
                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
