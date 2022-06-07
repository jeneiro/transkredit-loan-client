import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import {useAlert} from "react-alert"
export default function LoanRequestLIst() {
  const alert = useAlert();
  const CorporateId = localStorage.getItem("CorporateId");
  const getReqURL = `${webapibaseurl}/joinRequest/corporate/${CorporateId}`;
  const [staff, setStaff] = useState([]);
  const [payload, setPayload] = useState({})
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const approveURL = `${webapibaseurl}/joinRequest/approve/${CorporateId}`;
  const rejectURL = `${webapibaseurl}/joinRequest/reject/${CorporateId}`;

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    callList();
  }, []);
  function callList() {
    axios.get(getReqURL).then((res) => {
      console.log(res.data.data);
      setStaff(res.data.data);
      const list = res.data.data;
      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          fullName: item.IndividualName,
          staffId: item.StaffId,
          id: item.id,
          AuthId:item.AuthId
        };
        console.log(payload)
        return payload;
      });
      setStaff(listItems);
    });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Full Name", field: "fullName" },

    { title: "Staff ID", field: "staffId" },
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-8 offset-2">
        <div className="Form-container ">
          <h5>Cooporative Request</h5>
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
          <MaterialTable
            title={<b>Request List</b>}
            columns={columns}
            data={rows}
            actions={[
              {
                icon: "checkCircleOutlineIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "Approve Request",
                onClick: (event, rowData) => {
                  console.log(rowData);
                  const Item = { staffId: rowData.staffId, id: rowData.id, fullName: rowData.fullName, AuthId:rowData.AuthId };
                  setPayload(Item)
                  setShow(true);
                },
              },
              {
                icon: "clear",
                tooltip: "Reject Request",
                iconProps: { style: { fontSize: "34px", color: "red" } },
                onClick: (event, rowData) => {
                  console.log(rowData);
                  const Item = { staffId: rowData.staffId ,id: rowData.id };
                  setPayload(Item)
                  setShow2(true);
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
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <b>Are you sure you want approve this record?</b>
            </Modal.Body>
            <Modal.Footer>
              <Button
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
                color="success"
                type="submit"
                className="btn-sm"
                variant="success"
                style={{ marginTop: 10 }}
                onClick={() => {
                  axios.post(approveURL,payload).then((res)=>{
                    alert.success('Record Approved')
                    setPayload({})
                    setShow(false);
                    callList();
                  })
                }}
              >
                Approve
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={show2}
            onHide={handleClose2}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <b>Are you sure you want reject this record?</b>
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
                  axios.post(rejectURL,payload).then((res)=>{
                    alert.success('Record Rejected')
                    setPayload({})
                    setShow2(false);
                    callList();
                  })
                }}
              >
                Reject
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
