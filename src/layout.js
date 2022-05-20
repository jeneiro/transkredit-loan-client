import React, { useContext } from "react";
import NextOfKin from "./components/nextOfKin";
import WorkDetails from "./components/workDetails";
import JoinCorporative from "./components/joinCorporative";
import Corporative from "./components/corporative";
import Individual from "./components/individual";
import Registration from "./components/registration";
import Corporate from "./components/corporate";
import TAndCCorporate from "./components/TAndCCorporate";
import Director from "./components/director";
import BankDetails from "./components/bankDetail";
import Home from "./components/home";
import UploadPassport from "./components/passport";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router";
import logoTag from "./assets/logo-text2.png";
import RegisterViaCorproative from "./components/registerViaCorporative";
import "./layout.css";
import TAndCIndividual from "./components/TAndCIndividual";
import JointNextOfKin from "./components/jointNextOfKin";
import AddDirector from "./components/addDirector";
import CorporateRequestTable from "./components/corporativeRequestList";
import LoanApplication from "./components/loanApplication";
import UploadStaffList from "./components/UploadStaffList";
import StaffList from "./components/staffList";
import TAndCIndividual2 from "./components/TAndCIndividual2";
export default function Layout() {
  const navigate = useNavigate();
  const isRegistered = localStorage.getItem("isRegistered");

  function logout() {
    localStorage.setItem("isAuth", JSON.stringify({ isAuthenticated: false }));
   
    localStorage.clear();

    navigate("/");
  }
  
  function apply() {}
  function loan() {}
  function isRegisteredFunction(){
    if(isRegistered==="true")
    { return<>
   
      <a target="_blank" style={{ cursor: "pointer" }} onClick={()=>{navigate("/app/home")}}>
      <i className="fas fa-home"> </i> Home
    </a>
    <a target="_blank" style={{ cursor: "pointer" }} onClick={loan}>
    <i className="fa fa-credit-card" ></i>   Loan
    </a>
    <a target="_blank" style={{ cursor: "pointer" }} onClick={loan}>
    <i className="fa fa-question" ></i>  Request
    </a></>}
    else{ return<></>}
   
  }
  return (
    <div>
      <div className="navigation">
        <input type="checkbox" id="navigation-check"></input>
        <div className="navigation-header" >
          <img
            src={logoTag}
            alt="Logo"
            style={{ height: 32, marginLeft: 25, marginTop: 10 }}
          />
        </div>
        <div className="navigation-btn">
          <label htmlFor="navigation-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="navigation-links">
          {isRegisteredFunction()}
       
          <a target="_blank" style={{ cursor: "pointer" }} onClick={logout}>
            Logout <i className="fas fa-sign-out-alt"> </i>
          </a>
        </div>
      </div>

      <Routes>
        <Route path={"register"} element={<Registration />} />
        <Route path={"Individual-registration"} element={<Individual />} />
        <Route path={"next-of-kin"} element={<NextOfKin />} />
        <Route path={"work-detail"} element={<WorkDetails />} />
        <Route path={"corporate-registration"} element={<Corporate />} />
        <Route path={"bank-detail"} element={<BankDetails />} />
        <Route path={"passport-upload"} element={<UploadPassport />} />
        <Route path={"home"} element={<Home />} />
        <Route path={"directors"} element={<Director />} />
        <Route path={"tandc-corporate"} element={<TAndCCorporate />} />
        <Route path={"tandc-individual"} element={<TAndCIndividual/>}/>
        <Route path={"tandc-individual-2"} element={<TAndCIndividual2/>}/>
        <Route path={"add-director"} element={<AddDirector/>}/>
        <Route path={"joint-next-of-Kin"} element ={<JointNextOfKin/>}/>
        <Route path={"corporative"} element={<Corporative/>}/>
        <Route path={"join-corporative"} element={<JoinCorporative/>}/>
        <Route path={"corporative-request-list"} element={<CorporateRequestTable/>}/>
        <Route path={"loan-application"} element={<LoanApplication/>}/>
        <Route path={"register-via-corporative"} element={<RegisterViaCorproative/>}/>
        <Route path={"upload-staff-list"} element={<UploadStaffList/>}/>
        <Route path={"staff-list"} element={<StaffList/>}/>
      </Routes>
    </div>
  );
}
