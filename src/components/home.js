import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const username = localStorage.getItem("username");
    setUserType(userType);
    setUsername(username);
  }, []);

  function view(){
	  if(userType==="Corporate"){
		  return<>
		  <div
            class="productBox small"
            onClick={() => {
              navigate("/app/upload-staff-list");
            }}
          >
            <aside>
              <h4>Upload Staff List</h4>
            </aside>
            <img src="" />
          </div>
		  <div
            class="productBox small"
            onClick={() => {
              navigate("/app/staff-list");
            }}
          >
            <aside>
              <h4>Staff List</h4>
            </aside>
            <img src="" />
          </div>
		  
		  <div
            class="productBox small"
            onClick={() => {
              navigate("/app/corporative");
            }}
          >
            <aside>
              <h4>Register Corporative</h4>
            </aside>
            <img src="" />
          </div>
		  <div class="productBox small" onClick={()=>{
			  navigate("/app/corporative-request-list")
		  }}>
            <aside>
              <h4>Pending Approvals</h4>
            </aside>
            <img src="" />
          </div>
		 
		  </>

	  }
	  if(userType==="Individual"){
		  return <>
		  	<div
		class="productBox small"
		onClick={() => {
		  navigate("/app/join-corporative");
		}}
	  >
		<aside>
		  <h4>Join Corporative</h4>
		</aside>
		<img src="" />
	  </div>
	  
	  <div class="productBox small">
            <aside>
              <h4>Joint Account</h4>
            </aside>
            <img src="" />
          </div></>
	
	  }

  }
  return (
    <div style={{ marginTop: 40, padding: 50, marginLeft: 20 }}>
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
          <div class="productBox color-blue"  onClick={() => {
              navigate("/app/loan-application");
            }}>
            <aside>
              <h4>Book a Loan</h4>
            </aside>
            <img src="" />
          </div>

          <div class="productBox small color-green">
            <aside>
              <h4>Loan Request</h4>
            </aside>
            <img src="" />
          </div>

         

         

          <div class="productBox small">
            <aside>
              <h4>Running Loans</h4>
            </aside>
            <img src="" />
          </div>
		  <div class="productBox small">
            <aside>
              <h4>Settled Loans</h4>
            </aside>
            <img src="" />
          </div>
          

          
		  {view()}

        
        </div>
      </div>
    </div>
  );
}
