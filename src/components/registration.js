import React from "react";
import "./component.css";
import corporative from "../assets/corporative.png";
import individual from "../assets/individual.png";
import { useNavigate } from "react-router-dom";
import corporate from "../assets/corporate.png";
export default function Registration() {
    const navigate = useNavigate();
  return (
    <div>
          <div   className="banner"  style={{color:"#ffffff", paddingTop:"100px", paddingLeft:"40px"}}>
  <h4><b><i>Welcome</i></b></h4>
  <b><i>Select registration mode</i></b>
  <br />
  
       
          {/* <h5 className="text-center">~ one more step to get a facility, please create an account ~</h5> */}
        
        </div> 
      
     

    
     

      <div className="row " style={{height:"100%", padding:40}} >
     
        <div class="box box-1 col-md-4 "  onClick={()=>{navigate('/app/Individual-registration')}}>
            <div class="cover card shadow" style={{ cursor: "pointer"}}><img className="btnimg" src={individual} alt=""/></div>
            <button className="buttonReg"><div></div></button>
        </div>
        <div class="box box-2 col-md-4" onClick={()=>{navigate('/app/register-via-corporative')}}>
       
            <div  style={{ cursor: "pointer"}} class="cover card shadow"><img className="btnimg" src={corporative} alt=""/></div>
            <button className="buttonReg"><div></div></button>
        </div>
        <div class="box box-3 col-md-4" onClick={()=>{navigate('/app/corporate-registration')}} >
            <div class="cover card shadow" style={{ cursor: "pointer"}}><img className="btnimg" src={corporate} alt=""/></div>
            <button className="buttonReg"><div></div></button>
        </div>
        {/* <div class="box box-4">
            <div class="cover"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/3433202-f79c4cc8de2f84ae.png" alt=""/></div>
            <button><div></div></button>
        </div> */}

   
  </div>
      <div style={{width:"100%", backgroundColor:"grey"}}>
      <div style={{padding:80, float:"right", }}><h6><b>Money<span style={{color:"#f15a29"}}> when you need it.</span> </b></h6></div>
    </div>
    </div>
  );
}
