import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import AdminInterestRate from "./adminInterestRate";
export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleClose = (event) => {
    setShow(false);
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const username = localStorage.getItem("username");
    setUserType(userType);
    setUsername(username);
    hover();
  }, []);
  function hover() {
    $(".productBox")
      .on("mouseenter", function () {
        $(this).addClass("color-hover");
      })
      .on("mouseleave", function () {
        $(this).removeClass("color-hover").show();
      });
  }
  return (
    <div style={{ marginTop: 40, padding: 50, marginLeft: 20 }}>
      <div className="row">
        <h5 style={{ color: "#f15a29" }}>Welcome </h5>
        <b> &nbsp; | Admin</b> <br />
      </div>
      <div>
        <small style={{ color: "grey" }}>
          <b>Administrator</b> Account
        </small>
      </div>
      <div className="row">
        <div className="productShell" style={{ marginTop: 55 }}>
          <div
            className="productBox color-blue"
            onClick={() => {
              navigate("/app/admin-loan-request-list");
            }}
          >
            <aside>
              <h4>Loans Request</h4>
            </aside>
            <img src="" />
          </div>
          <div
            className="productBox small"
            onClick={() => {
              navigate("/app/admin-approved-loans");
            }}
          >
            <aside>
              <h4>Active Loans</h4>
            </aside>
            <img src="" />
          </div>

          <div
            className="productBox small"
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
            className="productBox small"
            onClick={() => {
              navigate("/app/admin-all-users");
            }}
          >
            <aside>
              <h4>All Users</h4>
            </aside>
            <img src="" />
          </div>
          <div
            className="productBox small"
            onClick={() => {
              navigate("/app/admin-all-individuals");
            }}
          >
            <aside>
              <h4>All Individual Accounts</h4>
            </aside>
            <img src="" />
          </div>
          <div
            className="productBox small"
            onClick={() => {
              navigate("/app/admin-all-corporate");
            }}
          >
            <aside>
              <h4>All Corporate Accounts</h4>
            </aside>
            <img src="" />
          </div>
          <div
            className="productBox small"
            onClick={() => {
              navigate("/app/admin-all-cooporative-members");
            }}
          >
            <aside>
              <h4>All Cooperative Member Accounts</h4>
            </aside>
            <img src="" />
          </div>
          <div
            className="productBox small"
            onClick={() => {
              setShow(true);
            }}
          >
            <aside>
              <h4>Set Interest Rate</h4>
            </aside>
            <img src="" />
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <AdminInterestRate handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
