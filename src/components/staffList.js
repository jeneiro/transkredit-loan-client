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
  const [show2, setShow2] = useState(false);
  const [staff, setStaff] = useState([]);
  const handleClose2 = () => setShow2(false);
  useEffect(() => {
    callList();
  }, []);

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
            <b>List Of All Cooperative Members</b>
          </div>

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
      </div>
    </div>
  );
}
