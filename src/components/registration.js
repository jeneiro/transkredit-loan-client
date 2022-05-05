import React from "react";
import "./component.css";
import { useNavigate } from "react-router-dom";
export default function Registration() {
    const navigate = useNavigate();
  return (
    <div>
         <div style={{height:250}}  className=" bg-reg">
          <h1 className="gradient-text text-center" style={{paddingTop:45}} >WELCOME</h1>
          <br />
          <h5 className="text-center">~ one more step to get a facility, please create an account ~</h5>
        
        </div>
      
     

    
     

      <div className="row bg-dark" style={{height:"100%"}}>
      <hr/>
        <div className="col-md-6 text-center" style={{padding:"10%", color:"white"}}>
          <button className="btn btn-outline-light btn-lg mx-auto" onClick={()=>{navigate("/app/individual-registration")}} >
            Individual Account
          </button>
        </div>
        <div className="col-md-6 text-center" style={{padding:"10%"}}>
          <button className="btn btn-outline-light btn-lg" onClick={()=>{navigate("/app/corporate-registration")}}>Corporate Account</button>
        </div>
      </div>
      <div style={{padding:20, float:"right"}}><h6><b>Money<span style={{color:"#f15a29"}}> when you need it</span> </b></h6></div>
    </div>
  );
}
