import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import "./form.css";
import Modal from "react-bootstrap/Modal";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "reactstrap";
export default function LoanApplication(props) {
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [corpList, setCorpList] = useState([]);
  const individualId = localStorage.getItem("individualId");
  const id =localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const loanURL = `${webapibaseurl}/loan/${id}`;
  const CorporateId = localStorage.getItem("corporateId");
  const url = `${webapibaseurl}/joinRequest/approved/${individualId}`;

  function handleClose(event) {
  
    props.handleClose(event);
  }
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
    setPayload({ ...payload, [name]: value,['loanAmount']:amount });
    
    if(CorporateId){
        setPayload({...payload, [name]: value,[ 'CorporateId' ]:CorporateId, ['loanAmount']:amount })
      
        console.log(payload)
    }
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
   
    axios
      .post(loanURL, payload)
      .then(() => {
        alert.success("Loan Request Submitted");
        document.getElementById("loan-form").reset();
        setAmount(0);
        setPayload({});
        navigate("/app/home/")
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
              <label>Select Cooporative</label>
              <select
                name="loanType"
                class="input-group"
                onChange={changeHandler}
              >
                <option disabled selected>
                  -Select Cooporative-
                </option>

               {corpList.map((corp)=>{
                  return <option value={corp.CorporateId}>{corp.CorporativeName}</option>
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


    <Modal
    show={props.show}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Body>
    <div >
      <div class="Form-container ">
        <form className="register-form" id="loan-form" onSubmit={submitForm}>
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
                    prefix={"₦"}
                    className="currency"
                    fixedDecimalScale={true}
                    name="loanAmount"
                    value={amount||payload.loanAmount}
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
              <div class=" col-md-3">
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
              <div class=" col-md-8">{checkType()}</div>
              {/* <div class=" col-md-3" style={{ marginTop: 35 }}>
                {" "}
                <button type="submit">Submit</button>
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
    </Modal.Body>
    <Modal.Footer>
    <form> <button onClick={(e)=>{submitForm(e);  handleClose()}}>Submit</button></form>
    </Modal.Footer>
  </Modal>
  
  );
}
