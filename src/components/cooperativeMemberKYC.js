import React, { useEffect, useState, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { webapibaseurl } from "../environment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function CooperativeMemberKYC(props) {
  const navigate = useNavigate();
  const alert = useAlert();
  const [payload, setPayload] = useState({});
  const [selectedDateID, handleDateChangeID] = useState(new Date());
  const [selectedDateED, handleDateChangeED] = useState(new Date());
  const id = localStorage.getItem("id");
  const kycURI = `${webapibaseurl}/cooperative-member-kyc/${id}`;
  function handleClose(event) {
    props.handleClose(event);
    setPayload({})
  }
  const formSchema = Yup.object().shape({
    bvn: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .length(11,'Must be exactly 11 digits')
   
  });
  const initialValues = {
    bvn: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema})
  useEffect(() => {}, []);
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
    
  }
  function submitForm(e) {
    e.preventDefault();
    payload.expiryDate = selectedDateED;
    payload.issuanceDate = selectedDateID;
    axios
      .post(kycURI, payload)
      .then(() => {
        alert.success("User Details Updated");
        navigate("/app/home");
      })
      .catch((error) => {
        alert.error(error.response.data.msg);
      });
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
        <div className="row" style={{ width: "100%" }}>
          <h5 className="col-md-6">Cooperative Member Detail</h5>{" "}
          <div className="col-md-2"></div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div class="Form-container ">
          <form className="register-form" onSubmit={submitForm}>
            <div
              class="row"
              style={{
                backgroundColor: "#f15a29",
                color: "#fff",
                padding: 4,
                margin: 2,
              }}
            >
              <h6></h6>
            </div>
            <div style={{ padding: 2 }}>
              {" "}
              <div className="row">
                <div class=" col-md-6">
                  <label>Means Of Identification</label>
                  <select
                    name="meansOfID"
                    class="input-group"
                    onChange={changeHandler}
                  >
                    <option value="Driver's License">Driver's License</option>
                    <option value="International Passport">
                      International Passport
                    </option>
                    <option value="National Identity Card">
                      National Identity Card
                    </option>
                    <option value="Birth Certificate">Birth Certificate</option>
                    <option value="Voters Card">
                     Voters Card
                    </option>
                  </select>
                </div>

                <div class="input-group col-md-6">
                  <label>ID Number</label>
                  <input
                    type="text"
                    placeholder="ID Number"
                    name="IDnumber"
                    value={"" || payload.IDnumber}
                    required
                    onChange={changeHandler}
                  />
                </div>
                <div className="input-group col-md-6">
                  <label>Issuance Date</label>
                  <Fragment >
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Issuance Date"
                      format="dd/MM/yyyy"
                      value={selectedDateID}
                      maxDate={Date.now()}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => handleDateChangeID(date)}
                    />
                  </Fragment>
                </div>
                <div className="input-group col-md-6">
                  <label>Expire Date</label>
                  <Fragment >
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Expire Date"
                      format="dd/MM/yyyy"
                      value={selectedDateED}
              minDate={selectedDateID}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => handleDateChangeED(date)}
                    />
                  </Fragment>
                </div>
              </div>
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
                <div className="input-group col-md-4">
                  <label>BVN</label>
                  <input
                    type="number"
                    className="input-group"
                    placeholder="BVN"
                    name="bvn"
                    value={"" || payload.bvn}
                    required
                    onChange={changeHandler}
                    {...formik.getFieldProps("bvn")}
                  ></input>
                  {formik.touched.bvn && formik.errors.bvn ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block" style={{ color: "red" }}>
                        *{formik.errors.bvn}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="input-group col-md-4">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    className="input-group"
                    placeholder="Phone Number"
                    name="phone"
                    value={"" || payload.phone}
                    required
                    onChange={changeHandler}
                  ></input>
                </div>
                <div className="input-group col-md-8">
                  <label>Residential Address</label>
                
                    <input
                     className="input-group"
                      name="address"
                      rows={4}
                      
                      value={"" || payload.address}
                      required
                      onChange={changeHandler}
                    ></input>
                  
                </div>
                <div className="col-md-4"> <label>&nbsp;</label><button
            onClick={(e) => {
              submitForm(e);
              handleClose();
            }}
          >
            Submit
          </button></div>
               
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
     
    </Modal>
  );
}
