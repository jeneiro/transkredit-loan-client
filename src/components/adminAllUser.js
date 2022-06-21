import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
export default function AdminAllUsers() {
  const alert = useAlert();

  const getReqURL = `${webapibaseurl}/auth`;
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
     
      setStaff(res.data.data);
      const list = res.data.data;
      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          id:item.id,
          date: moment(item.createdAt).format("LL"),
          username: item.username,
          email: item.email,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status: item.status,
        };
       
        return payload;
      });
      setStaff(listItems);
    });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Username", field: "username" },
    { title: "email", field: "email" },
    { title: "Date Created", field: "date" },
    // {
    //   field: "url",
    //   title: "Detail",
    //   tooltip: "Detail",
    //   render: (rowData) => (
    //     <div>
         
    //       <Button
    //         className="ml-3"
    //         onClick={() => {
           
    //           }}
    //       >
          
    //       Detail
           
    //       </Button>
    //     </div>
    //   ),
    // },
   
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-10 offset-1">
        <div className="Form-container ">
          <h5>Admin All Users</h5>
          <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
         
          </div>
          <MaterialTable
            title={<b>All User Accounts</b>}
            columns={columns}
            data={rows}
           
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
 <div style={{ height:100 }}>.</div>
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
