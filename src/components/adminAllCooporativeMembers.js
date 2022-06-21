import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
import SecureLS from "secure-ls";
import Pdf from "react-to-pdf";
import logoTag from "../assets/avatar.png";
export default function AdminAllCooporativeMembers() {
  const ref = React.createRef();
  const alert = useAlert();
  var ls = new SecureLS();
  const getReqURL = `${webapibaseurl}/admin/all-cooporative-member-accounts`;
  const [staff, setStaff] = useState([]);
  const [corporativeName, setCorporativeName] = useState("");
  const [show, setShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [staffID, setStaffID] = useState("");
  const [passport, setPassport] = useState(logoTag)
  const [detail, setDetail] = useState({});
  const handleClose = () =>{ setShow(false);
     setPassport(logoTag)};

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
          username: item.fullName,
          staffId: item.staffId,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status: item.status,
          authId: item.AuthId,
          CorporateId: item.CorporateId
          
        };

        return payload;
      });
      setStaff(listItems);
    });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Full Name", field: "username" },
    { title: "staff ID", field: "staffId" },
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
              setFullName(rowData.username);
              setStaffID(rowData.staffId);
              let id = rowData.authId;
              setShow(true);
              const detailURL = `${webapibaseurl}/cooperative-member-kyc/${id}`;
              const passportURL = `${webapibaseurl}/passport/${id}`;
              const cooporativeURL = `${webapibaseurl}/corporative/${rowData.CorporateId}`;
              axios.get(passportURL).then((res)=>{
                setPassport(res.data.data.passport);
              }).catch((err)=>{console.error(err);});
              axios.get(cooporativeURL).then((response) => {setCorporativeName(response.data.corporative.name)});
              axios.get(detailURL).then((res) => {
                if(res.data.data === undefined ){
                  setDetail({})
                }
                else {setDetail(res.data.data);
                  if(res.data.data.passport !== undefined ){
                setPassport(res.data.data.passport)}};

            
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
          <h5>Admin - All Cooperative Member Accounts</h5>
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
            title={<b>Cooperative Members</b>}
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
            <Modal.Body ref={ref}>
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
                  <b>Cooperative Member Account</b>
                </div>
                <div className="row">
                  <div className="col-md-3">
                  
                    <img
                      src={passport}
                      style={{ width: 150, height: 150 }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-7">
                        <label>
                          <b>Full Name:</b>
                        </label><br/>
                        {fullName}
                      </div>
                      
                      <div className="col-md-5">
                       
                        <label>
                          <b>Staff ID:</b>
                        </label><br/>
                        {staffID}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                    <div className="col-md-7">
                       
                       <label>
                         <b>Cooperative Name:</b>
                       </label><br/>
                       {corporativeName}
                     </div>
                      <div className="col-md-5">
                        {" "}
                        <label>
                          <b>Phone :</b>
                        </label><br/>
                        {detail.phone}{" "}
                      </div>
                      <hr />
                    </div>
                    <hr />
                   
                  </div>
                </div>
                <div className="row"> <div className="col-md-4">
                  
                  <label>
                    <b>Email:</b>
                  </label><br/>
                  {detail.email}
                </div>{" "}
                <div className="col-md-3">
              
                  <label>
                    <b>Phone :</b>
                  </label><br/>
                  {detail.phone}{" "}
                </div>
                      <div className="col-md-5">
                      <label>
                          <b>Address:</b>
                        </label><br/>
                        {detail.address}{" "}
                      </div>
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
                  <b>Bank Details</b>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    {" "}
                    <label>
                      <b>Account Name:</b>
                    </label><br/>
                    {detail.accountName}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Bank Name:</b>
                    </label><br/>
                    {detail.bankName}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Account Number:</b>
                    </label><br/>
                    {detail.accountNumber}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>BVN:</b>
                    </label><br/>
                    {detail.bvn}
                  </div>
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
                  <b>Means of Identification</b>
                 
                </div>
                <div className="row">
                  <div className="col-md-3">
                    {" "}
                    <label>
                      <b>Means Of ID:</b>
                    </label><br/>
                    {detail.meansOfID}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>ID Number:</b>
                    </label><br/>
                    {detail.IDnumber}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Issuance Date:</b>
                    </label><br/>
                     {  moment(detail.issuanceDate).format("LL")}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Expiry Date:</b>
                    </label><br/>
                    {  moment(detail.expiryDate).format("LL")}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
            <Pdf targetRef={ref} filename="MemberDetail.pdf">
        {({ toPdf }) => <Button
                color="success"
                type="submit"
                className="btn-sm"
                variant="success"
                style={{ marginTop: 10 }}
                onClick={toPdf}
              >
                Download PDF
              </Button>}
      </Pdf>
              
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
