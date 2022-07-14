import React, { useState, useEffect } from "react";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { useAlert } from "react-alert";
import MaterialTable from "material-table";
import { Button } from "reactstrap";
import Modal from "react-bootstrap/Modal";
export default function StaffList() {
    const alert =useAlert();
    const [payload, setPayload] = useState({})
  const CorporateId = localStorage.getItem("CorporateId");
  const geturl = `${webapibaseurl}/staff/${CorporateId}`;
  const deleteUrl = `${webapibaseurl}/staff/delete/${CorporateId}`;
  const addurl = `${webapibaseurl}/staff/add-one-staff/${CorporateId}`;
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [payload2, setPayload2] = useState({});
  const [staff, setStaff] = useState([]);
  const handleClose2 = () => setShow2(false);
  const handleClose = () =>{ setPayload2({}); setShow(false)};
  useEffect(() => {
    callList();
  }, []);
  function changeHandler(e) {
    e.preventDefault();

    const value = e.target.value;
    const name = e.target.name;
    setPayload2({ ...payload2, [name]: value });
  }

  function callList() {
    axios.get(geturl).then((res) => {
     
      const list = res.data.List.map((item, index) => {
        item.sn = index + 1;
        return item;
      });
      setStaff(list);
    });
  }

  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Full Name", field: "fullName" },

    { title: "Staff ID", field: "staffId" },
    { title: "Status", field: "Status" },
  ];

  return (
    <div>
      <div style={{ marginTop: 100 }} className="col-md-8 offset-2">
        <div className="Form-container ">
          <h5>Cooperative Staff List</h5>
          <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <b></b>
          </div>
<form ><button className="col-md-4" onClick={(e)=>{
e.preventDefault();
setShow(true);
}} >Add Member</button></form>
          <MaterialTable
            title={<b>Member List</b>}
            columns={columns}
            data={rows}
            actions={[
              {
                icon: "deleteforever",
                tooltip: "Remove Member from List",
                onClick: (event, rowData) => {
                 
                  const deleteItem = {"staffId":rowData.staffId}
                  setPayload(deleteItem)
                  setShow2(true)
               
                },
              },
            ]}
            options={{
              padding: "dense",
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
        </div>
        <Modal
            show={show2}
            onHide={handleClose2}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <b>Are you sure you want remove this record?</b>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="secondary"
                type="submit"
                className="btn-sm"
                variant="secoundary"
                style={{ marginTop: 10 }}
                onClick={() => {
                  setShow2(false);
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
                    axios
                    .post(deleteUrl, payload)
                    .then((res) => {
                      alert.success("Record Removed from Staff List");
                      setShow2(false)
                      callList();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Remove Staff
              </Button>
            </Modal.Footer>
          </Modal>
          
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
          <Modal.Header>
      
      <div className="row" style={{ width: "100%" }}>
        <h5 className="col-md-6">Loan Applcation</h5>{" "}
        <div className="col-md-2"></div>
      </div>
    </Modal.Header>
            <Modal.Body>
            <form >
            <div className="row" style={{paddingLeft:10, paddingRight:10}}>
            <div class=" col-md-8 ">
                <label>Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  class="input-group"
                  required
                  onChange={changeHandler}
                />
              </div>
            <div class=" col-md-4">
                <label>Staff ID</label>
                <input
                  name="staffId"
                  type="text"
                  class="input-group"
                  required
                  onChange={changeHandler}
                />
              </div>
              </div>
          </form> 
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="secondary"
                type="submit"
                className="btn-sm"
                variant="secoundary"
                style={{ marginTop: 10 }}
                onClick={() => {
              handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="success"
                type="submit"
                className="btn-sm"
                variant="primary"
                style={{ marginTop: 10 }}
                onClick={() => {
                    axios
                    .post(addurl, payload2)
                    .then((res) => {
                      alert.success(res.data.msg);
                      callList();
                      handleClose();
                      
                    })
                    .catch((err) => {
                      alert.error("Staff ID Already Exists");
                      handleClose();
                    });
                }}
              >
              Add Staff
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
      <div style={{ height:100 }}>.</div>
      <div style={{height:100}}>
        &nbsp;
      </div>
    </div>
  );
}
