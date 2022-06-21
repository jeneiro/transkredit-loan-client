import React, { useState, useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import IndividualSteppr from "./individualSteppr"
import FileBase64 from "react-file-base64";
import { webapibaseurl } from "../environment";
import logoTag from "../assets/avatar.png";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
//const img = "/media/users/blank.jpeg";
export default function UploadPassport() {
  const alert = useAlert();
  const navigate = useNavigate();
  const individualId = localStorage.getItem("individualId")
  const id = localStorage.getItem("id")
  const [Image, setImage] = useState({
   
    // background-image: url('../assets/darkBG.jpg'); 
    photo:  logoTag,
  });
  useEffect(() => {
  

    // clear selections list
  }, []);
  const handleSubmit = (e) => {
    if (Image.photo === "/media/users/blank.png") {
      alert("You have not uploaded an image");
    } else {
      const individualURL = `${webapibaseurl}/passport/${id}`;
      
      e.preventDefault();
      const formData = new FormData();
      formData.append("photo", Image.photo);
      //formData.append("individualId", Image.individualId);
      Image.individualId = individualId;

      axios.post(individualURL, Image).then(()=>{
     
       navigate("/app/tandc-individual")
      }
      
      ).catch((error)=>{alert.error("Image size too large")
      console.log(error)
      })
    }
  };

  return (
      <div style={{marginTop:155}}>
   <IndividualSteppr activeStep={4} />
    <div className="col-md-6 offset-md-3">
       
      <div className="card card-custom gutter-b example example-compact">
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">Passport Photograph</h3>
          </div>
          <div className="card-toolbar" style={{ color: "blue" }}>
            upload file should not be more than 40kb
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setImage({ ...Image, photo: base64 })}
              className="form-control"
            />

            <img
              src={Image.photo}
              style={{ width: 200, height: 200 }}
              alt="Upload File"
            />
            <button
          
              type="submit"
              style={{ marginTop: 20 }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}