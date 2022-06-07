import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
export default function AdminLoanRequestList() {
  const alert = useAlert();

  const getReqURL = `${webapibaseurl}/admin/all-pending-loans`;
  const [staff, setStaff] = useState([]);
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loanID, setLoanID] = useState();

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow(false);
  const approveURL = `${webapibaseurl}/admin/approve-loan-request/${loanID}`;
  const rejectURL = `${webapibaseurl}/admin/reject-loan-request/${loanID}`;

  useEffect(() => {
    callList();
  }, []);
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function callList() {
    axios.get(getReqURL).then((res) => {
      console.log(res.data.data);
      setStaff(res.data.data);
      const list = res.data.data;
      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          id:item.id,
          date: moment(item.date).format("LL"),
          loanAmount: currencyFormat(Number(item.loanAmount)),
          tenor: item.tenor,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status: item.status,
          username: item.username,
        };
        console.log(payload);
        return payload;
      });
      setStaff(listItems);
    });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Applicant", field: "username" },
    { title: "Loan Amount", field: "loanAmount" },
    { title: "Loan Type", field: "loanType" },
    { title: "Repayment Mode", field: "repaymentMode" },
    { title: "Tenor", field: "tenor" },
    { title: "Date", field: "date" },
    { title: "Status", field: "status" },
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-10 offset-1">
        <div className="Form-container ">
          <h5>Admin Loan Action</h5>
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
            title={<b>Pending Action List</b>}
            columns={columns}
            data={rows}
            actions={[
              {
                icon: "checkCircleOutlineIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "Approve Request",
                onClick: (event, rowData) => {
                  setLoanID(rowData.id);
               
                  setShow(true);
                },
              },
              {
                icon: "clear",
                tooltip: "Reject Request",
                iconProps: { style: { fontSize: "34px", color: "red" } },
                onClick: (event, rowData) => {
                  setLoanID(rowData.id);
                 
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
              <b>Are you sure you want approve this loan?</b>
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
              <b>Are you sure you want reject this loan?</b>
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
        </div>
      </div>
    </div>
  );
}
