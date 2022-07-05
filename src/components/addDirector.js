import React, { useState, Fragment, useEffect } from "react";
import CustomizedTables from "./directorTable";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { useAlert } from "react-alert";
import CorporateStepper from "./corporateStepper";
export default function AddDirector() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [directors, setDirectors] = useState([]);
  const [activate, setActivate] = useState(true);
  const id = localStorage.getItem("CorporateId");

  // const dashboard = `${webapibaseurl}/dashboard?officerId=${url}`;
  useEffect(() => {
    const director = `${webapibaseurl}/director/${id}`;
    axios.get(director).then((res) => {
   
      setDirectors(res.data.directors);
    });
  }, []);
  const individualURL = `${webapibaseurl}/director/${id}`;
 function skip(){
   navigate("/app/tandc-corporate")
 }
  function submitForm(e) {
    e.preventDefault();
    navigate("/app/directors");
  }

  return (
    <div style={{ marginTop: 155 }}>

      <CorporateStepper activeStep={2} />
      <div class="Form-container ">
        <h5>Corporate Account Registration</h5>
        <div
            class="row"
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <h6>DIRECTORs</h6>
          </div>
        <CustomizedTables directors={directors} />
        <form className="register-form" onSubmit={submitForm}>
          <hr />
          

          <div className="row">
            <div className="col-md-4" style={{ marginTop: 30 }}>
              <button type="submit">Add Director</button>
            </div>
            <div className="col-md-4" style={{ marginTop: 30 }}>
              <button onClick={skip}>Skip</button>
            </div>
          </div>
        </form>
      </div>
      <div style={{height:100}}>
        &nbsp;
      </div>
    </div>
  );
}
