import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
import AdminLoanRepaymentSchedule from "./adminLoanRepaymentSchedule";
export default function AdminApprovedLoans() {
  const alert = useAlert();

  const getReqURL = `${webapibaseurl}/admin/all-approved-loans`;
  const [staff, setStaff] = useState([]);
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loanID, setLoanID] = useState();
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const approveURL = `${webapibaseurl}/admin/complete-repayment/${loanID}`;

  useEffect(() => {
    callList();
 
  }, []);
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function callList2(id){
    const URL = `${webapibaseurl}/loan-schedule/${id}`;
      
    axios.get(URL).then((res) => {
        setData(res.data.data);
        setShow2(true); 
      });
  }
  function callList() {
    axios.get(getReqURL).then((res) => {
      setStaff(res.data.data);
      const list = res.data.data;
      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          id: item.id,
          date: moment(item.date).format("LL"),
          loanAmount: currencyFormat(Number(item.loanAmount)),
          tenor: item.tenor,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          repaymentStatus: item.repaymentStatus,
          status: item.status,
          username: item.username,
          totalRepayment:currencyFormat(Number(item.totalRepayment)),
        };

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
    { title: "Repayment Amount", field: "totalRepayment" },
    { title: "Loan Type", field: "loanType" },
    { title: "Repayment Mode", field: "repaymentMode" },
   
    { title: "Tenor", field: "tenor" },
    { title: "Date", field: "date" },
    { title: "Repayment Status", field: "repaymentStatus" },
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-12">
        <div className="Form-container ">
          <h5>Admin Loans</h5>
          <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 3,
              margin: 2,
            }}
          >
            <b></b>
          </div>
          <MaterialTable
            title={<b>Approved Loan List</b>}
            columns={columns}
            data={rows}
            actions={[
              {
                icon: "previewIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "Repayment Schedule",
                onClick: (event, rowData) => {
                setLoanID(rowData.id);
                 
                callList2(rowData.id);
                console.log(rowData.id);
             
                 
                },
              },
              {
                icon: "checkCircleOutlineIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "Fully Paid",
                onClick: (event, rowData) => {
                  setShow(true);
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

          <Modal
            show={show}
            onHide={handleClose}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <b>Are you sure this loan repayment has been completed?</b>
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
                    alert.success("Repayment Complete");
                    setPayload({});
                    setShow(false);
                    callList();
                  });
                }}
              >
                Repayment Complete
              </Button>
            </Modal.Footer>
          </Modal>
          <AdminLoanRepaymentSchedule
            show={show2}
            handleClose2={handleClose2}
            callList2={callList2}
            data={data}
            loanID = {loanID}
          />
        </div>
      </div>
      <div style={{ height: 100 }}>.</div>
      <div style={{ height: 100 }}>&nbsp;</div>
    </div>
  );
}
