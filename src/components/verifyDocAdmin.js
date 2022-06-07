import React, { useEffect, useState } from "react";
import "./upload.css";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import MaterialTable from "material-table";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
import Modal from "react-bootstrap/Modal";
export default function VerifyDocAdmin() {
  const alert = useAlert();
  const id = localStorage.getItem("id");
  const cooprateId = localStorage.getItem("CorporateId");
  const [document, setDocument] = useState();
  const [name, setName] = useState();
  const [documentID, setDocumentID] = useState();
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState({});
  const [payloadList, setPayloadList] = useState([]);
  const url = `${webapibaseurl}/documents/admin/`;
  const [image, setImage] = useState("");

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    callList();
  }, []);
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Staff Name", field: "staffName" , width:"10%"},
    { title: "Status", field: "status" , width:"10%"},
    { title: "Document Type", field: "documentType", width:"10%"},
  ];
  function callList() {
    axios
      .get(url)
      .then((res) => {
     
       setPayloadList(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  const rows = payloadList.map((i, index) => {
const sn = index+1
    const row = {
      sn:sn,
      documentType:i.name,
      staffName:i.staffName,
      status:i.status,
      document:i.document,
      id:i.id
    }
    return row
  });

  return (
    <div style={{ marginTop: 120 }} className="col-md-10 offset-1">
      <div className="Form-container " style={{ paddingBottom: 100 }}>
        <h5>Documents</h5>
        <div
          className="row "
          style={{
            backgroundColor: "#f15a29",
            color: "#fff",
            padding: 4,
            margin: 2,
          }}
        >
          <b>Validate Documents</b>
        </div>

        <div class="container">
          <center className="mb-2"></center>

          <MaterialTable
            title={<b>Documents List</b>}
            columns={columns}
            data={rows}
            actions={[
             
              {
                icon: "addIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "View Document",
                onClick: (event, rowData) => {
                 
                  setShow(true);
               
                  setImage(rowData.document)
                
                  setDocumentID(rowData.id)
                },
              },
             
          
              
            ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#8a8988",
                color: "#FFF",
              },
              rowStyle: (x) => {
                if (x.tableData.id % 2) {
                  return { backgroundColor: "#f2f2f2" };
                }
              },
            }}
          />
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <img src={image} style={{ height: 600, maxWidth: 480 }} />
            </Modal.Body>
            <Modal.Footer><Button
                color="secondary"
                type="submit"
                className="btn-sm"
                variant="secoundary"
                style={{ marginTop: 10 }}
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                type="submit"
                className="btn-sm"
                variant="primary"
                style={{ marginTop: 10 }}
                onClick={() => {
                  const validateURL = `${webapibaseurl}/documents/validate/${documentID}`;
                  axios.post(validateURL, payload).then((res) => {
                    alert.success("Document Verified");
                 
                    setShow(false);
                    callList();
                  });
                }}
              >
               Verify
              </Button></Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
