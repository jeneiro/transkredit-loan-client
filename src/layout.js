import React, { useContext } from "react";
import NextOfKin from "./components/nextOfKin";
import WorkDetails from "./components/workDetails";
import JoinCorporative from "./components/joinCorporative";
import Cooporative from "./components/corporative";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DocumentRequestList from "./components/documentRequestList";
import Dashboard from "./components/dashboard";
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
import LoanList from "./components/loanList";
import LoanRequestLIst from "./components/loanRequestList";
import ActiveLoanList from "./components/activeLoan";
import SettledLoanList from "./components/settledLoansList";
import LoanActionList from "./components/loanActionList";
import AdminLoanRequestList from "./components/adminLoanRequestList";
import AdminApprovedLoans from "./components/adminApprovedLoans";
import  AdminAllUser from "./components/adminAllUser";
import UploadFiles from "./components/uploadFiles";
import CorporateApproved from "./components/corporateApproved";
import CorporateSettled from "./components/corporateSettled";
import AdminAllCooporativeMembers from "./components/adminAllCooporativeMembers";
import AdminAllCorporate from "./components/adminAllCorporate";
import AdminAllIndividuals from "./components/adminAllIndividual";
export default function Layout() {
  const navigate = useNavigate();
  const isRegistered = localStorage.getItem("isRegistered");
  const isAdmin = localStorage.getItem("isAdmin");
  function logout() {
    localStorage.setItem("isAuth", JSON.stringify({ isAuthenticated: false }));

    localStorage.clear();

    navigate("/");
  }

  function loan() {
    navigate("/app/loan-application");
  }
  function isAdminFunction() {
    if (isAdmin === "true") {
      return (
        <>
          <a
            target="_blank"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/app/dashboard");
            }}
          >
            <i className="fas fa-home"> </i> Home
          </a>
        </>
      );
    } else {
      return <></>;
    }
  }
  function isRegisteredFunction() {
    if (isRegistered === "true") {
      return (
        <>
          <a
            target="_blank"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/app/home");
            }}
          >
            <i className="fas fa-home"> </i> Home
          </a>
          
          <a
            target="_blank"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/app/loan-list");
            }}
          >
            <i className="fa fa-question"></i> Request
          </a>
        </>
      );
    } else {
      return <></>;
    }
  }
  return (
    <div>
      <div className="navigation">
        <input type="checkbox" id="navigation-check"></input>
        <div className="navigation-header">
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
          {isAdminFunction()}
          <span style={{ color: "white" }}>|</span>
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
        <Route path={"dashboard"} element={<Dashboard />} />
        <Route path={"directors"} element={<Director />} />
        <Route path={"tandc-corporate"} element={<TAndCCorporate />} />
        <Route path={"tandc-individual"} element={<TAndCIndividual />} />
        <Route path={"tandc-individual-2"} element={<TAndCIndividual2 />} />
        <Route path={"add-director"} element={<AddDirector />} />
        <Route path={"joint-next-of-Kin"} element={<JointNextOfKin />} />
        <Route path={"corporative"} element={<Cooporative />} />
        <Route path={"upload-files"} element={<UploadFiles />} />
        <Route path={"join-corporative"} element={<JoinCorporative />} />
        <Route
          path={"corporative-request-list"}
          element={<CorporateRequestTable />}
        />
           <Route
          path={"document-request-list"}
          element={<DocumentRequestList />}
        />
        <Route path={"loan-application"} element={<LoanApplication />} />
        <Route path={"loan-list"} element={<LoanList />} />
        <Route path={"active-loan-list"} element={<ActiveLoanList />} />
        <Route path={"settled-loan-list"} element={<SettledLoanList />} />
        <Route path={"loan-action-list"} element={<LoanActionList />} />
        <Route path={"loan-request"} element={<LoanRequestLIst />} />
        <Route path={"corporate-approved"} element={<CorporateApproved />} />
        <Route path={"corporate-settled"} element={<CorporateSettled />} />
        <Route
          path={"register-via-corporative"}
          element={<RegisterViaCorproative />}
        />
        <Route path={"upload-staff-list"} element={<UploadStaffList />} />
        <Route path={"staff-list"} element={<StaffList />} />
        {isAdmin && (
          <>
            <Route
              path={"admin-loan-request-list"}
              element={<AdminLoanRequestList />}
            />
            <Route
              path={"admin-approved-loans"}
              element={<AdminApprovedLoans />}
            />
             <Route
              path={"admin-all-users"}
              element={<AdminAllUser />}
            />
            <Route
              path={"admin-all-individuals"}
              element={<AdminAllIndividuals />}
            />
            <Route
              path={"admin-all-corporate"}
              element={<AdminAllCorporate />}
            />
             <Route
              path={"admin-all-cooporative-members"}
              element={<AdminAllCooporativeMembers />}
            />
          </>
        )}
      </Routes><div style={{ height:100 }}>.</div>
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          padding: 30,
          color: "#fff",
          width: "100%",
          height: 65,
          backgroundColor: "#03001a",
        }}
      >
          
        <div className="row">
          <div className="col-md-8">
            © 2022 Transkredit. All rights reserved.
          </div>
          <div className="col-md-4">
            <ul className="nav nav-pills nav-top">
              <li style={{ marginRight: "10px", fontSize: "20px" }}>
                <a
                  href="https://www.facebook.com/TranskreditNG"
                  target="_blank"
                >
                  <FontAwesomeIcon icon="fa-brands fa-facebook" />
                </a>
              </li>

              <li style={{ marginRight: "10px", fontSize: "20px" }}>
                <a href="https://twitter.com/TranskreditNG" target="_blank">
                  <FontAwesomeIcon icon="fa-brands fa-twitter" />
                </a>
              </li>

              <li style={{ fontSize: "20px" }}>
                <a
                  href="https://www.instagram.com/transkredit/"
                  target="_blank"
                >
                  <FontAwesomeIcon icon="fa-brands fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
