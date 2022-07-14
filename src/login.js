import React, {  useEffect, useState} from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { axiosInstance } from "./interceptor";
import logoTag from "./assets/logo-white.png";
import { useNavigate } from "react-router";
import { webapibaseurl } from "./environment";
import $ from "jquery";
import "./login.css";
import SecureLS from "secure-ls";
import { TailSpin } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
function Login() {
  const alert = useAlert();
  var ls = new SecureLS();
  const [payload, setPayload] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailURL = `${webapibaseurl}/email`;
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .max(50, "Maximum 50 symbols")
      .required(),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema})
  useEffect(() => {}, []);

  function login(e) {
    e.preventDefault();
    setIsLoading(true);
    let uri = `${webapibaseurl}/auth/login`;
    axios
      .post(uri, payload)
      .then((res) => {
        const id = res.data.userD.id;
        const token = res.data.token;
        const title = "Transkredit Login";
        const email = res.data.userD.email;
        setIsLoading(false);
        ls.set("email", email);
        const message =
          "You have succesfully logged into your Transkredit Loan Portal account. Thank you";
        let loginPayload = { title, message, email };
        axios
          .post(emailURL, loginPayload)
          .then((res) => {})
          .catch((err) => console.log(err));

        ls.set("token", token);

        localStorage.setItem(
          "isAuth",
          JSON.stringify({ isAuthenticated: true })
        );
        localStorage.setItem("id", JSON.stringify(id));
        const individualURL = `${webapibaseurl}/individual/${id}`;
        const corporateURL = `${webapibaseurl}/corporate/${id}`;
        const staffCorporativeURL = `${webapibaseurl}/staff/byAuth/${id}`;
        if (res.data.userD.isAdmin === true) {
          localStorage.setItem("home", "/app/dashboard");
          navigate("/app/dashboard");
          localStorage.setItem("isAdmin", true);
        } else {
          axios.get(`${webapibaseurl}/register/${id}`).then((res) => {
            if (res.data.registered.isRegistered) {
              localStorage.setItem("isRegistered", true);
              const userType = res.data.registered.userType;
              localStorage.setItem("userType", userType);
              if (userType === "Individual") {
                axiosInstance
                  .get(individualURL)
                  .then((res) => {
                    if (
                      res.data.individual.name !== undefined ||
                      res.data.individual.name !== null
                    ) {
                      localStorage.setItem(
                        "individualId",
                        res.data.individual.id
                      );
                      localStorage.setItem(
                        "username",
                        res.data.individual.name
                      );
                      localStorage.setItem("home", "/app/home");
                      navigate("/app/home");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              if (userType === "Corporate") {
                axiosInstance
                  .get(corporateURL)
                  .then((res) => {
                    if (
                      res.data.corporate.name !== undefined ||
                      res.data.corporate.name !== null
                    ) {
                      localStorage.setItem(
                        "CorporateId",
                        res.data.corporate.id
                      );
                      localStorage.setItem(
                        "username",
                        res.data.corporate.companyName
                      );
                      navigate("/app/home");
                      localStorage.setItem("home", "/app/home");
                    } else {
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              if (userType === "Cooperative Member") {
                axiosInstance.get(staffCorporativeURL).then((res) => {
                  localStorage.setItem("coporativememberId", res.data.data.id);
                  localStorage.setItem(
                    "corporateId",
                    res.data.data.CorporateId
                  );
                  localStorage.setItem("username", res.data.data.fullName);
                  localStorage.setItem("home", "/app/home");
                  navigate("/app/home");
                });
              }
            } else if (
              res.data.registered.isRegistered === null ||
              res.data.registered.isRegistered === undefined
            ) {
              localStorage.setItem("isRegistered", false);
              localStorage.setItem("home", "/app/register");
              navigate("/app/register");
            } else {
              localStorage.setItem("isRegistered", false);
              localStorage.setItem("home", "/app/register");
              navigate("/app/register");
            }
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response === undefined) {
          alert.error("No Network Detected");
        } else alert.error(err.response.data.errorMessage);
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
    let uri = `${webapibaseurl}/auth/register`;
    axios
      .post(uri, payload)
      .then((res) => {
        const id = res.data.userD.id;
        const title = "Transkredit Loan Portal Registration";
        const email = res.data.userD.email;
        const message =
          "You have succesfully registered this email to the Transkredit Loan Portal. Thank you";
        alert.success("User registered, please login to proceed");
        let loginPayload = { title, message, email };
        axios
          .post(emailURL, loginPayload)
          .then((res) => {})
          .catch((err) => console.log(err));

        axios
          .post(`${webapibaseurl}/register/${id}`, {
            isRegistered: false,
            userType: "Unregistered",
          })
          .then((res) => {
            setPayload({});
          });
        toggle();
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
                  {" "}
                  LOAN REQUEST PORTAL
                </h6>
                <form className="register-form" onSubmit={createUser}>
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={payload.username || ""}
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
                  <input
                    type="text"
                    placeholder="email address"
                    name="email"
                    value={payload.email || ""}
                    onChange={handleChange}
                  ></input>
                  <button type="submit">create</button>
                  <p className="message">
                    Already registered?{" "}
                    <a style={{ cursor: "pointer" }} onClick={toggle}>
                      Sign In
                    </a>
                  </p>
                </form>
                <form className="login-form" onSubmit={login}>
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={payload.username || ""}
                    onChange={handleChange}
                    {...formik.getFieldProps("username")}
                  ></input>
                   {formik.touched.username && formik.errors.username ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block" style={{ color: "red" }}>
                        *{formik.errors.username}
                      </div>
                    </div>
                  ) : null}
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={payload.password || ""}
                    onChange={handleChange}
                  ></input>
                  <button>
                    <span
                      className="row text-center"
                      style={{ margin: "auto", width: "30%" }}
                    >
                      login &nbsp;{" "}
                      {isLoading ? (
                        <TailSpin
                          height="20"
                          width="20"
                          color="white"
                          ariaLabel="loading"
                        />
                      ) : (
                        <></>
                      )}
                    </span>
                  </button>
                  <p className="message">
                    Not registered?{" "}
                    <a style={{ cursor: "pointer" }} onClick={toggle}>
                      Create an account
                    </a>
                  </p>
                  <p className="message">
                    <a
                      style={{ cursor: "pointer", color: "#ed8d64" }}
                      onClick={() => {
                        navigate("/forgotPassword");
                      }}
                    >
                      Forgot Password?
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}
export default Login;
