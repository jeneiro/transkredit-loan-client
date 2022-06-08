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
import RepaymentSchedule from "./repaymentSchedule";
export default function LoanApplication(props) {
  const alert = useAlert();
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [corpList, setCorpList] = useState([]);
  const [repaymentList, setRepaymentList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [form, setForm] = useState(true);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [tenor, setTenor] = useState(1);
  const individualId = localStorage.getItem("individualId");
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const loanURL = `${webapibaseurl}/loan/${id}`;
  const CorporateId = localStorage.getItem("corporateId");
  const url = `${webapibaseurl}/joinRequest/approved/${individualId}`;

  function handleClose(event) {
    props.handleClose(event);
  }

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((res) => {
      setCorpList(res.data.data);
    });
  }, [tenor, amount, totalRepayment]);

  function addTenor() {
    if (tenor < 24) {
      const newTenor = tenor + 1;
      CalculateRepayment(newTenor,amount);
      setTenor(tenor + 1);
    }
  }
  function reduceTenor() {
    if (tenor > 1) {
      const newTenor = tenor - 1;
      CalculateRepayment(newTenor,amount);
      setTenor(tenor - 1);
    }
  }
  function CalculateRepayment(tenor,amount){
    const principal = amount / tenor;
      let list = [];
      let updatedAmount = amount;
      for (let i = 0; i < tenor; i++) {
        const formattedPrincipal = Math.round(principal * 100) / 100;
        const initialInterest = 0.03 * updatedAmount;
        const item = formattedPrincipal + initialInterest;
        list = [...list, item];
        updatedAmount = updatedAmount - formattedPrincipal;

        setRepaymentList(list);
        var sum = list.reduce(function (a, b) {
          return a + b;
        }, 0);
      }
      setTotalRepayment(sum.toFixed(2));
  }
 
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setPayload({ ...payload, [name]: value, ["loanAmount"]: amount });
   
    if (CorporateId) {
      setPayload({
        ...payload,
        [name]: value,
        ["CorporateId"]: CorporateId,
        ["loanAmount"]: amount,
      });
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
    payload.username = username;
    axios
      .post(loanURL, payload)
      .then(() => {
        alert.success("Loan Request Submitted");
        document.getElementById("loan-form").reset();
        setAmount(0);
        setPayload({});
        navigate("/app/home/");
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
            <label>Are you applying through your Cooporative?</label>

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

                {corpList.map((corp) => {
                  return (
                    <option value={corp.CorporateId}>
                      {corp.CorporativeName}
                    </option>
                  );
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
      <Modal.Header>
        {" "}
        <div className="row" style={{ width: "100%" }}>
          <h5 className="col-md-6">Loan Applcation</h5>{" "}
          <div className="col-md-2"></div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div class="Form-container ">
            {form && (
              <div>
                <div style={{ textAlign: "right", color: "#f15a29" }}>
                  {" "}
                  <small
                    className="text-end text-right"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setForm(false);
                    }}
                  >
                    View Loan Repayment Schedule
                  </small>
                </div>
                <form
                  className="register-form"
                  id="loan-form"
                  onSubmit={submitForm}
                >
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
                      <div className="col-md-5">
                        <label> Loan Amount </label>

                        <div>
                          <CurrencyFormat
                            thousandSeparator={true}
                            prefix={"₦"}
                            className="currency"
                            fixedDecimalScale={true}
                            name="loanAmount"
                            value={amount || payload.loanAmount}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;

                              setAmount(value);
                              CalculateRepayment(tenor,value)
                              // setFormattedAmount2(formattedValue);
                            }}
                          />
                        </div>
                      </div>
                      <div class=" col-md-4">
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
                        <div
                          class="btn-group form-control "
                          style={{ height: "60px" }}
                          role="group"
                          aria-label="Second group"
                        >
                          <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={reduceTenor}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={addTenor}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-1">
                        {" "}
                        <div
                          className="form-control"
                          style={{ marginTop: 40, width: 50 }}
                        >
                          <h4>{tenor}</h4>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <label>Total Repayment</label>{" "}
                        <div style={{ marginTop: "20px" }}>
                          <CurrencyFormat
                            thousandSeparator={true}
                            displayType="text"
                            prefix={"₦"}
                            className="currency"
                            fixedDecimalScale={true}
                            value={totalRepayment}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;

                              setAmount(value);
                              // setFormattedAmount2(formattedValue);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {!form && (
              <div>
                <div style={{ textAlign: "right", color: "#f15a29" }}>
                  {" "}
                  <small
                    className="text-end text-right"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setForm(true);
                    }}
                  >
                    View Loan Application
                  </small>
                </div>

                <RepaymentSchedule data={repaymentList} />
              </div>
            )}
          </div>
          <div className="card " style={{ padding: 10 }}>
            <div class=" col-md-7">{checkType()}</div>
          </div>

          <div
            className="text-center"
            style={{
              backgroundColor: "#f15a29",
              textAlign: "center",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <small className="text-center">
              *All loan request attracts a 3% commision which comprises of
              management, commitements and insurance fees{" "}
            </small>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <form>
          {" "}
          <button
            onClick={(e) => {
              submitForm(e);
              handleClose();
            }}
          >
            Submit
          </button>
        </form>
      </Modal.Footer>
    </Modal>
  );
}
