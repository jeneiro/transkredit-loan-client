import React, { useContext, useEffect, useState, createContext } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { useFormik } from "formik";
import logoTag from "./assets/logo-white.png";
import { useNavigate } from "react-router";
import { webapibaseurl } from "./environment";
import { AuthContext } from "./App";
import BarLoader from "react-spinners/BarLoader";
import $ from "jquery";
import "./login.css";

function Login() {
  const alert = useAlert();

  const [payload, setPayload] = useState({});

  const navigate = useNavigate();

  useEffect(() => {}, []);

  function login(e) {
    e.preventDefault();

    let uri = `${webapibaseurl}/auth/login`;
    axios
      .post(uri, payload)
      .then((res) => {
        const id =res.data.userD.id
        const token = res.data.token
        localStorage.setItem("token",  token)
        localStorage.setItem(
          "isAuth",
          JSON.stringify({ isAuthenticated: true })
        );
        localStorage.setItem("id", JSON.stringify(id));
        console.log(res);

        axios.get(`${webapibaseurl}/register/${id}`).then((res)=>{

        
          if(res.data.registered.isRegistered){
            localStorage.setItem("isRegistered", true);
            navigate("/app/dashboard")
          }
         else if(res.data.registered.isRegistered===null || res.data.registered.isRegistered===undefined){
          localStorage.setItem("isRegistered", false);
          navigate("/app/register")
         }
        else{

            localStorage.setItem("isRegistered", false);
            navigate("/app/register")
            
          }

         
        
        })
        
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
        const id =res.data.userD.id;

        alert.success("User registered, please login to proceed");
        axios.post(`${webapibaseurl}/register/${id}`, {"isRegistered":false}).then((res)=>{console.log(res.data)
          setPayload({})} );
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
      <div style={{zIndex:20, float:"right", position:"relative", top:0}} >
          
          <img
            src={logoTag}
            alt="Logo"
            style={{ height: 60, float:"right", marginRight:20,marginTop:7, padding:5}}
          />
        </div>
        <div className="triangle_rose">  </div>
        <div className="triangle_vert"></div>

        <header>
          <div className="grid" style={{ marginTop: -150 }}>
            <div className="login-page">
              <div className="form">
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
