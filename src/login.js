import React, { useContext, useEffect, useState, createContext } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { axiosInstance } from "./interceptor";
import { useFormik } from "formik";
import logoTag from "./assets/logo-white.png";
import { useNavigate } from "react-router";
import { webapibaseurl } from "./environment";
import $ from "jquery";
import "./login.css";

function Login() {
  const alert = useAlert();

  const [payload, setPayload] = useState({});

  const navigate = useNavigate();

  useEffect(() => {}, []);

  function login(e) {
    e.preventDefault();
    const emailURL = `${webapibaseurl}/email`;
    let uri = `${webapibaseurl}/auth/login`;
    axios
      .post(uri, payload)
      .then((res) => {
        const id = res.data.userD.id;
        const token = res.data.token;
        const title = "Transkredit Login";
        const email = res.data.userD.email;
        const message =
          "You have succesfully logged into your transkredit account. Thank you";
        let loginPayload = { title, message, email };
        axios.post(emailURL, loginPayload).then((res)=>{console.log(res)}).catch(err=>console.log(err));



        localStorage.setItem("token", token);
        localStorage.setItem(
          "isAuth",
          JSON.stringify({ isAuthenticated: true })
        );
        localStorage.setItem("id", JSON.stringify(id));

        const individualURL = `${webapibaseurl}/individual/${id}`;
        const corporateURL = `${webapibaseurl}/corporate/${id}`;
        const staffCorporativeURL = `${webapibaseurl}/staff/byAuth/${id}`;
        if (res.data.userD.isAdmin === true) {
          navigate("/app/dashboard");
          localStorage.setItem("isAdmin", true);
        } else {
          axios.get(`${webapibaseurl}/register/${id}`).then((res) => {
            if (res.data.registered.isRegistered) {
              localStorage.setItem("isRegistered", true);
              const userType = res.data.registered.userType;
              localStorage.setItem("userType", userType);
              if(userType==="Individual"){
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
                    localStorage.setItem("username", res.data.individual.name);
                    navigate("/app/home");
                  }
                })
                .catch((err) => {
                  console.log(err.response);
                });
              }
              if(userType==="Corporate"){
                axiosInstance
                .get(corporateURL)
                .then((res) => {
                  if (
                    res.data.corporate.name !== undefined ||
                    res.data.corporate.name !== null
                  ) {
                    localStorage.setItem("CorporateId", res.data.corporate.id);
                    localStorage.setItem(
                      "username",
                      res.data.corporate.companyName
                    );
                    navigate("/app/home");
                  } else {
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              }
             if(userType==="Cooporative Member"){
              axiosInstance.get(staffCorporativeURL).then((res) => {
                console.log(res.data);
                localStorage.setItem("coporativememberId", res.data.data.id);
                localStorage.setItem("corporateId", res.data.data.CorporateId);
                localStorage.setItem("username", res.data.data.fullName);
                navigate("/app/home");
              });
             }
           
            } else if (
              res.data.registered.isRegistered === null ||
              res.data.registered.isRegistered === undefined
            ) {
              localStorage.setItem("isRegistered", false);
              navigate("/app/register");
            } else {
              localStorage.setItem("isRegistered", false);
              navigate("/app/register");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert.error(err.response.data.errorMessage);
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

        alert.success("User registered, please login to proceed");
        axios
          .post(`${webapibaseurl}/register/${id}`, {
            isRegistered: false,
            userType: "Unregistered",
          })
          .then((res) => {
            console.log(res.data);
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
                  ></input>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={payload.password || ""}
                    onChange={handleChange}
                  ></input>
                  <button>login</button>
                  <p className="message">
                    Not registered?{" "}
                    <a style={{ cursor: "pointer" }} onClick={toggle}>
                      Create an account
                    </a>
                  </p>
                  <p className="message">
                   
                    <a style={{ cursor: "pointer", color: "#ed8d64" }}  onClick={() => {
                      navigate("/forgotPassword")
                    }}>
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
