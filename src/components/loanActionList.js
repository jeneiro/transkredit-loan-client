import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
export default function LoanActionList() {
  const alert = useAlert();
  const CorporateId = localStorage.getItem("CorporateId");
  const getReqURL = `${webapibaseurl}/loan/corporate-loan-pending/${CorporateId}`;
  const [staff, setStaff] = useState([]);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('')
  const [payload, setPayload] = useState({});
  const [loanDetail, setLoanDetail] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [defaultReject, setDefaultReject] = useState(true);
  const [loanID, setLoanID] = useState();
  const approveURL = `${webapibaseurl}/loan/submit-loan-request/${loanID}`;
  const rejectURL = `${webapibaseurl}/loan/reject-loan-request/${loanID}`;
  const [email, setEmail] = useState();
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow(false);
  function changeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  }
  useEffect(() => {
    callList();
  }, []);
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function callList() {
    axios.get(getReqURL).then((res) => {
      
      setStaff(res.data.data);
      const list = res.data.data;
      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          id: item.id,
          username: item.username,
          date: moment(item.date).format("LL"),
          loanAmount: currencyFormat(Number(item.loanAmount)),
          tenor: item.tenor,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status: item.status,
          AuthId:item.AuthId
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
          <h5>Loan Action Request</h5>
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
                tooltip: "Submit Request",
                onClick: (event, rowData) => {
                  setAmount(rowData.loanAmount)
                  setLoanDetail(rowData)
                  let uri = `${webapibaseurl}/auth/${rowData.AuthId}`;
                  axios.get(uri).then((res) => {
                    setEmail(res.data.data.email);
                  });
                
                  setLoanID(rowData.id);
                  setShow(true);
                },
              },
              {
                icon: "clear",
                tooltip: "Reject Request",
                iconProps: { style: { fontSize: "34px", color: "red" } },
                onClick: (event, rowData) => {
                  let uri = `${webapibaseurl}/auth/${rowData.AuthId}`;
                  setAmount(rowData.loanAmount)
                  axios.get(uri).then((res) => {
                    setEmail(res.data.data.email);
                  });
                  setLoanID(rowData.id);
                  setShow2(true);
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
              <b>Are you sure you want to submit this loan for approval?</b>
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
                    alert.success("Record Submitted");
                    let emailURL = `${webapibaseurl}/email`;
                    let title = "Transkredit Loan Status Update";

                    const message = `Your loan request for ${amount}has been Submitted by your cooperative for further action. You You will be notified when your loan is approved.
                      Thank you`;
                    let loginPayload = { title, message, email };
                    axios
                      .post(emailURL, loginPayload)
                      .then((res) => {
                        
                        let title = "Loan Action Required";
    
                        let message = `A ${loanDetail.loanType} of ${amount} for ${loanDetail.tenor} Months with a ${loanDetail.repaymentMode} repayment mode has been submitted by ${loanDetail.username}.
                          Thank you`;
                          let emailPayload = { title, message, "email":"enquiries@transkreditfinance.com" };
                          axios.post(emailURL, emailPayload).then((response) => {}).catch((error) => {console.log(error);})
                        
                      })
                      .catch((err) => console.log(err));
                 
                    setPayload({});
                    setShow(false);
                    callList();
                  });
                }}
              >
                Submit
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
            {defaultReject && (
              <>
                <Modal.Body>
                  <b>Are you sure you want to reject this loan?</b>
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
                      setDefaultReject(false);
                    }}
                  >
                    Reject
                  </Button>
                </Modal.Footer>
              </>
            )}
            {!defaultReject && (
              <>
                <Modal.Body>
                  <b>Reason for rejection</b>
                  <form>
                    <textarea name="message" rows="4" value={""|| payload.message} placeholderr="Reason for rejection" className="form-control" width="100%" onChange={changeHandler}></textarea>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    color="danger"
                    type="submit"
                    className="btn-sm"
                    variant="primary"
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      setReason(payload.message);
                      axios.post(rejectURL, payload).then((res) => {
                        alert.success("Record Rejected");  
                        const emailURL = `${webapibaseurl}/email`;
                        const title = "Transkredit Loan Status Update";
    
                        const message = `Your loan request for ${amount} has been rejected. your loan was rejected because of this reason:</br>${reason}.
                          Thank you`;
                        let loginPayload = { title, message, email };
                        axios
                          .post(emailURL, loginPayload)
                          .then((res) => {
                         
                            
                          })
                          .catch((err) => console.log(err));
                        setDefaultReject(true);
                        setPayload({});
                        setShow2(false);
                        callList();

                      });
                    }}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
