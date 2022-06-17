import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { axiosInstance as axios } from "../interceptor";
import { useNavigate } from "react-router-dom";
import { webapibaseurl } from "../environment";
import Modal from "react-bootstrap/Modal";
export default function Cooperative(props) {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [directors, setDirectors] = useState([]);
  const [activate, setActivate] = useState(true);
  const id = localStorage.getItem("CorporateId");

  useEffect(() => {
    const director = `${webapibaseurl}/director/${id}`;
    axios.get(director).then((res) => {
    
      setDirectors(res.data.directors);
    });
  }, []);
  function handleClose(event) {
  
    props.handleClose(event);
  }
  const url = `${webapibaseurl}/corporative/${id}`;
 
  function submitForm(e) {
    e.preventDefault();
   
    axios.put(url, payload).then((res)=>{
      
        alert.success(res.data.msg)
    }).catch((err)=>{
        console.log(err)
    })
  }
  function changeHandler(e) {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  }
  return (
    <Modal
    show={props.show}
    onHide={handleClose}
   
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >  <Modal.Header closeButton>
  <Modal.Title id="contained-modal-title-vcenter">
  <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
              fontSize:16
            }}
          >
          Edit Cooperative Name
          </div>
  </Modal.Title>
</Modal.Header>
    <Modal.Body>
    <div>
    
        <div className="Form-container ">
      

          <form className="register-form" onSubmit={submitForm}>
            <hr />

            <div className="row">
             
                <label>Cooperative Name</label>
                <input
                  type="text"
                  placeholder="Cooperative Name"
                  name="name"
                  value={"" || payload.name}
                  required
                  onChange={changeHandler}
                />
             
             
            </div>
          </form>
        </div>
      
    </div>
    </Modal.Body>
    <Modal.Footer>
    <form> <button onClick={(e)=>{submitForm(e);  handleClose()}}>Submit</button></form>
    </Modal.Footer>
  </Modal>
  );
}
