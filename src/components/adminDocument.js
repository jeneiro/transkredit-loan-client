import React, { useEffect, useState } from "react";
import "./upload.css";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import FileBase64 from "react-file-base64";
import Modal from "react-bootstrap/Modal";
export default function UploadFiles() {
  const id = localStorage.getItem("id");
  const [document, setDocument] = useState();
  const [name, setName] = useState();
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState({});
  const [payloadList, setPayloadList] = useState([]);
  const url = `${webapibaseurl}/documents/${id}`;
  const [image, setImage] = useState("")

const AdminDocument = () => setShow(false);
  useEffect(() => {
    callList();
  }, []);
  function callList() {
    axios
      .get(url)
      .then((res) => {
        setPayloadList(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
    setName(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const doc = { document, name };
    axios
      .post(url, doc)
      .then((res) => {
        console.log(res.data);
        callList()
      })
      .catch((err) => {
        console.log(err);
      });
    // setPayloadList([...payloadList, payload])
  }

  const rows = payloadList.map((i, index) => {
    return (
      <tr key={index} id={index}>
        <td>
          <span>{index + 1}</span>
        </td>
        <td>{i.name}</td>
      

    
        <td>
          {" "}
          <button
              type="button"
              className="form-control deleteButton"
            outline
            onClick={()=>{
              const url = `${webapibaseurl}/documents/download/${id}/${i.id}`;
              axios.get(url).then((res)=>{ setShow(true);setImage(res.data.data.document)
            console.log(res.data.data.document)
              
              }).catch(err=>console.log(err))
            }}
          >
            <i class="fa fa-eye"></i>View
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ marginTop: 120 }} className="col-md-10 offset-1">
      <div className="Form-container " style={{ paddingBottom: 100 }}>
        <h5>Upload Documents</h5>
        <div
          className="row "
          style={{
            backgroundColor: "#f15a29",
            color: "#fff",
            padding: 4,
            margin: 2,
          }}
        >
          <b>Upload All Applicable Documents</b>
        </div>
        <div style={{ marginTop: 20 }}>
          <form onSubmit={handleSubmit} className="col-md-10 offset-1">
            <div className="row border shadow" style={{ padding: 5 }}>
              <div className="col-md-4">
                <select
                  name="documentName"
                  class="input-group border"
                  required
                  onChange={changeHandler}
                >
                  <option selected>-List Of Cooporative-</option>
                  <option value="Birth Certificate">Birth Certificate</option>
               
                  <option value="Certificate Of Incorporation">
                    Certificate Of Incorporation
                  </option>
                  <option value="Drivers License">Drivers License</option>
                    <option value="National ID">National ID</option>
                  <option value="Staff ID">Staff ID</option>
                 
                  <option value="Utility Bill">Utility Bill</option>
                  <option value="Voters Card">Voters Card</option>
                </select>
              </div>
              <div className="col-md-4">
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) =>
                    setDocument({ ...Image, photo: base64 })
                  }
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <button type="submit">Add File</button>
              </div>
            </div>
            <small style={{color:"#f15a29"}}>*upload format should be in JPG or PNG format and Should not exceed 50kb</small>
          </form>
      
        </div>
       
        <div class="container" style={{ marginTop: "70px" }}>
          <center className="mb-2"></center>

          <table className="table table-dark">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Document Type</th>
               

                <th>View</th>
              </tr>
            </thead>

            <tbody id="tbodyContainer">{rows}</tbody>
          </table>
          <Modal
            show={show}
            onHide={handleClose}
          
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
            <img src={image}  style={{ height: 600, maxWidth:480 }}  />
            </Modal.Body>
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
