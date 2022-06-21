import React, { useEffect, useState, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import FileBase64 from "react-file-base64";
import { webapibaseurl } from "../environment";
import logoTag from "../assets/avatar.png";

export default function UploadPassport(props) {
    const navigate = useNavigate();
    const alert = useAlert();
    function handleClose(event) {
        props.handleClose(event);
       
      }
  
      const individualId = localStorage.getItem("individualId")
      const id = localStorage.getItem("id")
      const [Image, setImage] = useState({
       
        // background-image: url('../assets/darkBG.jpg'); 
        photo:  logoTag,
      });
    
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
         
       alert.success("Image Uploaded Successfully");
       handleClose();
          }
          
          ).catch((error)=>{alert.error("Image size too large")
          console.log(error)
          })
        }
      };
    
  return (
    <div><Modal
    show={props.show}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <div className="row" style={{ width: "100%" }}>
        <h5 className="col-md-6">Upload Passport Photograph</h5>{" "}
        <div className="col-md-2"></div>
      </div>
    </Modal.Header>
    <Modal.Body>
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
     </div></Modal.Body></Modal></div>
  )
}
