import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import LoanApplication from "./loanApplication";
import IndividualHome from "./individualHome";
import CooporateHome from "./cooporateHome";
import CooperateMemberHome from "./CooperateMemberHome";
import $ from "jquery";
export default function Home() {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const [individual, setIndividual]= useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const username = localStorage.getItem("username");
    setUserType(userType);
    setUsername(username);
    if(userType === "Individual"){setIndividual(true)}

  hover() }, []);

  function hover(){
    $(".productBox").on('mouseenter',function(){$(this).addClass('color-hover')}).on('mouseleave',function(){$(this).removeClass('color-hover').show() })
  
  }
  function handleClose(event) {
    setShow(false);
  }
  function view() {
    
    if (userType === "Corporate") {
  
      return (
      <CooporateHome/>
      );
    }
    if (userType === "Individual") {

      return (
      <IndividualHome />
      );
    }
    if (userType === "Cooperative Member") {

      return (
      <CooperateMemberHome />
      );
    }
  }
  return (
    <div style={{ marginTop: 40, padding: 50, marginLeft: 20 }}>
      <LoanApplication show={show} handleClose={handleClose} />
      <div className="row">
        <h5 style={{ color: "#f15a29" }}>Welcome </h5>
        <b> &nbsp; | {username}</b> <br />
      </div>
      <div>
        <small style={{ color: "grey" }}>
          <b>{userType}</b> Account
        </small>
      </div>
      <div className="row">
        <div class="productShell" style={{ marginTop: 55 }}>
          
          <div
            class="productBox color-blue"
            onClick={() => {
              setShow(true);
            }}
          >
            <aside>
              <h4>Request a Loan</h4>
            </aside>
            <img src="" />
          </div>

          <div
            class="productBox small"
            onClick={() => {
              navigate("/app/loan-list");
            }}
          >
            <aside>
              <h4>Loan Request List</h4>
            </aside>
            <img src="" />
          </div>

          <div
            class="productBox small"
            onClick={() => {
              navigate("/app/active-loan-list");
            }}
          >
            <aside>
              <h4>Running Loans</h4>
            </aside>
            <img src="https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg=w240-h480-rw" />
          </div>
          <div
            class="productBox small"
            onClick={() => {
              navigate("/app/settled-loan-list");
            }}
          >
            <aside>
              <h4>Settled Loans</h4>
            </aside>
            <img src="" />
          </div>
          <div
            class="productBox small"
            onClick={() => {
              navigate("/app/upload-files");
            }}
          >
            <aside>
              <h4>Upload Documents</h4>
            </aside>
            <img src="" />
          </div>

          {view()}
        </div>
      </div>
    </div>
  );
}
