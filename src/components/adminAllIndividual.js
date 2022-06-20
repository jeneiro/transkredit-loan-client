import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
export default function AdminAllIndividuals() {
  const alert = useAlert();

  const getReqURL = `${webapibaseurl}/admin/all-individual-accounts`;
  const [staff, setStaff] = useState([]);
  const [payload, setPayload] = useState({});
  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loanID, setLoanID] = useState();

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow(false);

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
          id: item.id,
          date: moment(item.createdAt).format("LL"),
          username: item.name,
          email: item.email,
          title: item.title,
        };
     
        return payload;
      });
      setStaff(listItems);
    });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Title", field: "title" },
    { title: "Full Name", field: "username" },
    { title: "email", field: "email" },
    { title: "Date Created", field: "date" },
    {
      field: "url",
      title: "Detail",
      tooltip: "Detail",
      render: (rowData) => (
        <div>
          <Button
            className="ml-3"
            onClick={() => {
              const detailURL = `${webapibaseurl}/admin//individual-detail/${rowData.id}`;
              axios.get(detailURL).then((res) => {
                
               setDetail(res.data.data);
               detail.fullname = rowData.username
                setShow(true);
              });
            }}
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-10 offset-1">
        <div className="Form-container ">
          <h5>Admin - All Individual Account</h5>
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
            title={<b>Individual Members</b>}
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
          <div style={{ height: 100 }}>.</div>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
            <div>
            <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <b>Individual Account</b>
          </div>
                <div className="row">
               
                  <div className="col-md-3"> <img src={detail.passport} style={{width:150, height:150}}/></div><div className="col-md-7">
                  <div className="row">
                          <div className="col-md-5"><label><b>Title:</b></label> {detail.title}</div><div className="col-md-7"><label><b>Full Name:</b></label>  {detail.fullname} </div>
                         
                      </div>
                      <hr/>
                      <div className="row">
                      <div className="col-md-5"> <label><b>DOB:</b></label> {moment(detail.dob).format("LL")} </div><div className="col-md-7"><label><b>Marital Status:</b></label>  {detail.maritalStatus} </div>
                       
                      </div>
                      <hr/>
                      <div className="row">
                      <div className="col-md-5">  <label><b>Phone :</b></label>  {detail.phone}  </div>  <div className="col-md-7"> <label><b>Email:</b></label>  {detail.email}</div>
                          <hr/>
                      </div>
                     
                      <div>
                        
                          <hr/>
                      </div>
                      
                      </div></div> 
                </div>
                <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <b>Work Detail</b>
          </div>
        
          <div className="row">
                          <div className="col-md-5"><label><b>Work Place:</b></label> {detail.placeOfWork}</div><div className="col-md-7"><label><b>Nature Of Business:</b></label>  {detail.natureOfBusiness} </div>
                         
                      </div>
                      <hr/>
                      <div className="row">
                          <div className="col-md-5"><label><b>Salary Range:</b></label> {detail.salaryRange}</div><div className="col-md-7"><label><b>Work Address:</b></label>  {detail.natureOfBusiness} </div>
                         
                      </div>
                      <hr/>
              <div className="col-md-6"></div>
          
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
                onClick={() => {}}
              >
               Download
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
              
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
