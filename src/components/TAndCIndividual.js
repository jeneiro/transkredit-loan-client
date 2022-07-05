import React, { useState, useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import IndividualStepper from "./individualSteppr";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function TAndCIndividual() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const id = localStorage.getItem("id");
  const tandcURL = `${webapibaseurl}/tandc`;
  const registeredURI = `${webapibaseurl}/register/${id}`;
  const individualURL = `${webapibaseurl}/individual/${id}`;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdf,setPDF] = useState("");
  useEffect(() => {
    
   
   }, []);
  function submitForm(e) {
    e.preventDefault();
    axios
      .put(registeredURI, { isRegistered: true, userType: "Individual" })
      .then(() => {
        localStorage.setItem("isRegistered", true);
        localStorage.setItem("userType", "Individual");
        axios
          .get(individualURL)
          .then((res) => {
            localStorage.setItem("individualId", res.data.individual.id);
            localStorage.setItem("username", res.data.individual.name);
            alert.success("Registration Complete");
            navigate("/app/Home");
          })
          .catch((err) => {
            console.log(err.response);
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
      <IndividualStepper activeStep={5} />
    
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <div
          style={{ height: "720px", marginTop: 130, padding: 20 ,  marginBottom:100}}
          className="col-md-10 offset-1"
        >
          <Viewer fileUrl={tandcURL} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    
      <form
        style={{ marginTop: 10, float: "right", marginRight: 30 }}
        onSubmit={submitForm}
      >
    
        <div className="input-group">
          <input
            type="checkbox"
            onClick={showSubmit}
            id="vehicle1"
            name="vehicle1"
            value="Bike"
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
      <div style={{height:100}}>
        &nbsp;
      </div>
    </div>
  );
}
