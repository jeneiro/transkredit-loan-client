import React, { useContext, useEffect, useState, createContext } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { axiosInstance } from "./interceptor";
import { useFormik } from "formik";
import cryptoRandomString from "crypto-random-string";
import logoTag from "./assets/logo-white.png";
import { useNavigate } from "react-router";
import { webapibaseurl } from "./environment";
import $ from "jquery";
import "./login.css";
import SecureLS from "secure-ls";
function ForgotPassword() {
  const alert = useAlert();
  var ls = new SecureLS();
  const [payload, setPayload] = useState({});
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const updatePasswordURL = `${webapibaseurl}/auth/update-password`;
  const navigate = useNavigate();

  useEffect(() => {}, []);

  function sendEmail(e) {
    e.preventDefault();
    const randomString = cryptoRandomString({ length: 10 });
   
    ls.set("randomString", randomString);
    const emailURL = `${webapibaseurl}/email`;
    const title = "Transkredit Loan Portal Password Reset";
    const email = payload.email;
    setRequestEmail(payload.email);
    const message = `You have requested a password change and your code is:<b>${randomString}</b>`;
    let loginPayload = { title, message, email };
    axios.post(emailURL, loginPayload).then(() => {
      toggle();
    });
  }
  function toggle() {
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
  }

  function handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    setPayload((values) => ({ ...values, [name]: value }));
  }
  function createUser(e) {
    e.preventDefault();
   
    axios
      .post(updatePasswordURL, payload)
      .then((res) => {
       

        alert.success("User Password Successfully Changed");
        
       navigate("/")
      })
      .catch((err) => {
        alert.error(err.response.data.errorMessage);
        setPayload({});
      });
  }
  return (
    <div className="align" style={{ backgroundColor: "#000000" }}>
      <section id="accueil">
        <div
          style={{ zIndex: 20, float: "right", position: "relative", top: 0 }}
        >
          <img
            src={logoTag}
            alt="Logo"
            style={{
              height: 60,
              float: "right",
              marginRight: 20,
              marginTop: 7,
              padding: 5,
            }}
          />
        </div>
        <div className="triangle_rose"> </div>
        <div className="triangle_vert"></div>

        <header>
          <div className="grid" style={{ marginTop: -150 }}>
            <div className="login-page">
              <div className="form">
                <h6 style={{ fontWeight: 700, color: "#f15a29" }}>
                  LOAN REQUEST PORTAL
                </h6>
                {validCode ? (
                  <>
                    <form className="register-form" onSubmit={createUser}>
                      <input
                        type="text"
                        placeholder="email address"
                        name="email"
                        value={payload.email || ""}
                        onChange={handleChange}
                      ></input>
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={payload.password || ""}
                        onChange={handleChange}
                      ></input>
                      <input
                        type="password"
                        name="verifypassword"
                        placeholder="confirm password"
                        value={payload.verifypassword || ""}
                        onChange={handleChange}
                      />

                      <button type="submit">create</button>
                      <p className="message">
                        Already registered?{" "}
                        <a style={{ cursor: "pointer" }} onClick={toggle}>
                          Sign In
                        </a>
                      </p>
                    </form>
                  </>
                ) : (
                  <>
                    <form className="register-form">
                      <input
                        type="text"
                        placeholder="Code"
                        id="code"
                        name="code"
                        value={code || ""}
                        onChange={(e)=>{setCode(e.target.value)
                        }
                      }
                      ></input>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          let validationCode = ls.get("randomString");
                          if (validationCode === code) {
                            setValidCode(true);
                          } else {
                           
                          
                            alert.error("Wrong Code");
                            document.getElementById("code").value = "";
                          }
                        }}
                      >
                        Validate Code
                      </button>
                      <p className="message">
                        Wrong Email or Did'nt get a Code?{" "}
                        <a style={{ cursor: "pointer" }} onClick={toggle}>
                          Resend Code
                        </a>
                      </p>
                      <p className="message">
                        <a
                          style={{ cursor: "pointer", color: "#ed8d64" }}
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Back to Login
                        </a>
                      </p>
                    </form>
                    <form className="login-form" onSubmit={sendEmail}>
                      <input
                        type="text"
                        placeholder="email address"
                        name="email"
                        value={requestEmail || ""||payload.email}
                        onChange={handleChange}
                      ></input>
                      <button type="submit">Email</button>
                      <p className="message">
                       
                     
                        <a
                          style={{ cursor: "pointer", color: "#ed8d64" }}
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Back to Login
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}
export default ForgotPassword;
