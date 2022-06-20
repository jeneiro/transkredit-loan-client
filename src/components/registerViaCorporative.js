import React, { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import IndividualSteppr from "./joinCorporativeSteppr";
import "./form.css";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import SecureLS from "secure-ls";
export default function RegisterViaCorproative() {
  var ls = new SecureLS();
  const [payload, setPayload] = useState({});
  const id = localStorage.getItem("id");

  const url = `${webapibaseurl}/joinRequest/${id}`;

  const alert = useAlert();
  const navigate = useNavigate();
  const [corporative, setCorporative] = useState([]);
  const [corpname, setCorpName] = useState("");
  const [request, setRequest] = useState(false);
  const [stepper, setStepper] = useState(0);
  const [Status, SetStatus] = useState("");
  const [document, setDocument] = useState();
  useEffect(() => {
    const corporativeURL = `${webapibaseurl}/corporative`;
    checkStatus();
    axios.get(corporativeURL).then((res) => {
      setCorporative(res.data.corporative);
    });
  }, []);
  const row = corporative.map((corp) => {
    return <option value={corp.CorporateId}>{corp.name}</option>;
  });
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  }
  function changeHandler2(e) {
    e.preventDefault();

    const value = e.target.value;
    const getCorpurl = `${webapibaseurl}/corporative/${value}`;
    axios.get(getCorpurl).then((res) => {
    
      setCorpName(res.data.corporative.name);
      setPayload({ ...payload, ...res.data.corporative });
      
    });
  }
  function checkStatus() {
    axios.get(url).then((res) => {
      const status = res.data.data[0].Status;
      const corprativename = res.data.data[0].CorporativeName;
      SetStatus(status);

      if (status) {
        setStepper(1);
        setRequest(true);
        setCorpName(corprativename);
      }
    });
  }
  function submitForm(e) {
    e.preventDefault();
    payload.document = document.photo;
   
    axios
      .post(url, payload)
      .then(() => {
        checkStatus();
        alert.success("Request Sent");

        //email
        const emailURL = `${webapibaseurl}/email`;
        const title = "Transkredit Registration";
        const email = ls.get("email");
        const message = `You have requested to join ${corpname}. Your request will be processed and you will be notified shortly.
          Thank you`;
        let loginPayload = { title, message, email };
        axios
          .post(emailURL, loginPayload)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.response);
        alert.error(error.response.data.msg);
      });
  }
  function pendingWindow() {
    if (Status === "Pending") {
      return (
        <div>
          <p style={{ fontSize: 20, textAlign: "center", marginTop: 30 }}>
            You have a <b>Pending Request</b> to join through {corpname}
          </p>{" "}
          <br />
          <p style={{ textAlign: "center" }}>
            <i>
              An email will be sent to you immediately your request is
              approved/rejected. You will be able to move to the next step if
              your request is approved or re-apply if your request is rejected
            </i>
          </p>
          <form style={{ marginTop: 20 }} className="col-md-4 offset-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/app/register");
              }}
            >
              Return to Home
            </button>
          </form>
        </div>
      );
    }
    if (Status === "Approved") {
      return (
        <div>
          <p style={{ fontSize: 20, textAlign: "center", marginTop: 30 }}>
            Your request has been <b> Approved</b> by {corpname}
          </p>{" "}
          <br />
          <p style={{ textAlign: "center" }}>
            <i>Please proceed to Terms and Conditions</i>
            <form style={{ marginTop: 20 }} className="col-md-4 offset-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/app/tandc-individual-2");
                }}
              >
                Terms and Conditions
              </button>
            </form>
          </p>
        </div>
      );
    }
    if (Status === "Rejected") {
      return (
        <div>
          <p style={{ fontSize: 20, textAlign: "center", marginTop: 30 }}>
            Your request has been <b> Rejected</b> by {corpname}
          </p>{" "}
          <br />
          <p style={{ textAlign: "center" }}>
            <i>Please contact your cooporative and try again</i>
            <form style={{ marginTop: 20 }} className="col-md-4 offset-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRequest(false);
                  setStepper(0);
                }}
              >
                Send New Request
              </button>
            </form>
          </p>
        </div>
      );
    }
  }

  return (
    <div style={{ marginTop: 155 }}>
      <IndividualSteppr activeStep={stepper} />
      {request ? (
        <div>
          <div className="Form-container ">
            <h5>REGISTER USING A COOPORATIVE</h5>
            <div
              className="row "
              style={{
                backgroundColor: "#f15a29",
                color: "#fff",
                padding: 4,
                margin: 2,
              }}
            >
              <b>Join Cooperative Request Status</b>
            </div>
            {pendingWindow()}
          </div>
        </div>
      ) : (
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
              <h6>REGISTER USING A COOPORATIVE</h6>
            </div>
            <div style={{ padding: 2 }}>
              <div class="row">
                <div class="input-group col-md-6">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="IndividualName"
                    value={"" || payload.IndividualName}
                    required
                    onChange={changeHandler}
                  />
                </div>
                <div class="input-group col-md-6">
                  <label>Staff ID</label>
                  <input
                    type="text"
                    placeholder="Staff ID"
                    name="StaffId"
                    value={"" || payload.staffID}
                    required
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="row">
                <div class=" col-md-6">
                  <label>Select Cooperative</label>
                  <select
                    name="CorporateId"
                    class="input-group"
                    required
                    onChange={changeHandler2}
                  >
                    <option selected>-List Of Cooperative-</option>
                    {row}
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Upload Staff ID</label>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) =>
                      setDocument({ ...Image, photo: base64 })
                    }
                    className="form-control"
                  />
                  <small style={{ color: "#f15a29" }}>
                    *Accepted upload formats are JPG/PNG & file size Should not
                    exceed 50kb
                  </small>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{ marginTop: 30 }}>
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
