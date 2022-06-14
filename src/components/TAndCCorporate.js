import React, { useState, useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";

import PDFViewer from "pdf-viewer-reactjs";
import { webapibaseurl } from "../environment";
import PDF from "../assets/TandC.pdf";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import CorporateStepper from "./corporateStepper";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function TAndCCorporate() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const id = localStorage.getItem("id");
  const registeredURI = `${webapibaseurl}/register/${id}`;
  const corporateURL = `${webapibaseurl}/corporate/${id}`;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  function submitForm(e) {
    e.preventDefault();

    axios
      .put(registeredURI, { isRegistered: true, userType: "Corporate" })
      .then(() => {
        localStorage.setItem("isRegistered", true);
        localStorage.setItem("userType", "Corporate");
        axios
          .get(corporateURL)
          .then((res) => {
           
            localStorage.setItem("CorporateId", res.data.corporate.id);
            localStorage.setItem("username", res.data.corporate.companyName);
            alert.success("Registration Complete");
            navigate("/app/Home");
          })
          .catch((err) => {
            console.log(err);
          });

       
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function showSubmit() {
    if (show === true) setShow(false);
    else setShow(true);
  }

  return (
    <div>
      <CorporateStepper activeStep={3} />
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <div
          style={{ height: "720px", marginTop: 130, padding: 20,  marginBottom:100 }}
          className="col-md-10 offset-1"
        >
          <Viewer fileUrl={PDF} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
      <form
        style={{ float: "right", marginRight: 30 }}
        onSubmit={submitForm}
      >
        <div className="input-group">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            onClick={showSubmit}
            className=""
          />

          <label for="vehicle1" style={{ marginLeft: "-5px" }}>
            ...I Accept Terms & Conditions
          </label>
        </div>

        <div className="input-group">
          {show && <button type="submit">Submit</button>}
        </div>
      </form>
      <div style={{ height:100 }}>.</div>
    </div>
  );
}
