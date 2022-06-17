import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
export default function CorporateRequestTable(props) {
  const alert = useAlert();
  const CorporateId = localStorage.getItem("CorporateId");
  const getReqURL = `${webapibaseurl}/joinRequest/corporate/${CorporateId}`;
  const [staff, setStaff] = useState([]);
  const [fullName, setFullName] = useState("");
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState();
  const [corpname, setCorpName] = useState();
  const approveURL = `${webapibaseurl}/joinRequest/approve/${CorporateId}`;
  const rejectURL = `${webapibaseurl}/joinRequest/reject/${CorporateId}`;
  const cooperativeName = `${webapibaseurl}/corporative/${CorporateId}`;
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => setShow4(false);

  useEffect(() => {
    axios.get(cooperativeName).then((res) => {
      setCorpName(res.data.corporative.name);
    });
    callList();
  }, []);

  function callList() {
    axios.get(getReqURL).then((res) => {
      setStaff(res.data.data);
      const list = res.data.data;

      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          fullName: item.IndividualName,
          staffId: item.StaffId,
          id: item.id,
          AuthId: item.AuthId,
          document: item.document,
        };

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
    {
      field: "url",
      title: "Verify Fullname",
      tooltip: "Verify fullname",
      render: (rowData) => (
        <div>
          <Button
            className="ml-3"
            onClick={() => {
              console.log(rowData);
              const validUsername = `${webapibaseurl}/staff/byStaffId/${CorporateId}/${rowData.staffId}/`;

              const validName = axios
                .get(validUsername)
                .then((res) => {
                  let fullName = res.data.data.fullName;
                  console.log(fullName);
                  setFullName(fullName);
                  setShow4(true);
                })
                .catch((err) => console.log(err));
            }}
          >
            Verify Full Name
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-8 offset-2">
        <div className="Form-container ">
          <h5>Cooperative Request</h5>
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
                icon: "preview",
                iconProps: { style: { fontSize: "34px", color: "#f15a29" } },
                tooltip: "View Staff ID",
                onClick: (event, rowData) => {
                  setImage(rowData.document);
                  setShow3(true);
                },
              },
              {
                icon: "checkCircleOutlineIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "Approve Request",
                onClick: (event, rowData) => {
                  let uri = `${webapibaseurl}/auth/${rowData.AuthId}`;
                  axios.get(uri).then((res) => {
                    setEmail(res.data.data.email);
                  });

                  const Item = {
                    staffId: rowData.staffId,
                    id: rowData.id,
                    fullName: rowData.fullName,
                    AuthId: rowData.AuthId,
                  };
                  setPayload(Item);
                  setShow(true);
                },
              },
              {
                icon: "clear",
                tooltip: "Reject Request",
                iconProps: { style: { fontSize: "34px", color: "red" } },
                onClick: (event, rowData) => {
                  console.log(rowData);
                  const Item = { staffId: rowData.staffId, id: rowData.id };
                  setPayload(Item);
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
                  axios.post(approveURL, payload).then((res) => {
                    alert.success("Record Approved");
                    setPayload({});
                    setShow(false);
                    callList();
                    const emailURL = `${webapibaseurl}/email`;
                    const title = "Transkredit Registration";

                    const message = `Your requested to join ${corpname} has been approved. You can proceed to the Transkredit Loan Portal to complete your registration.
                      Thank you`;
                    let loginPayload = { title, message, email };
                    axios
                      .post(emailURL, loginPayload)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  });
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
                  axios.post(rejectURL, payload).then((res) => {
                    alert.success("Record Rejected");
                    const emailURL = `${webapibaseurl}/email`;
                    const title = "Transkredit Registration";

                    const message = `Your requested to join ${corpname} has been rejected. You can proceed to the Transkredit Loan Portal for further action.
                      Thank you`;
                    let loginPayload = { title, message, email };
                    axios
                      .post(emailURL, loginPayload)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                                     setPayload({});
                    setShow2(false);
                    callList();
                  });
                }}
              >
                Reject
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={show3}
            onHide={handleClose3}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <img src={image} style={{ height: 600, maxWidth: 480 }} />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <Modal
            show={show4}
            onHide={handleClose4}
            aria-labelledby="contained-modal-title-vcenter"
            size="sm"
            centered
          >
            <Modal.Body>
              <h4 className="text-centre">
                <b>{fullName}</b>
              </h4>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
