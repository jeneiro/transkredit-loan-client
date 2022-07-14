import React, { useState } from "react";
import MaterialTable from "material-table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";
import Pdf from "react-to-pdf";
import logo from "../assets/logo-text.png";
export default function AdminAllCorporate() {
  const alert = useAlert();
  const ref = React.createRef();
  const getReqURL = `${webapibaseurl}/admin/all-corporate-accounts`;
  const [staff, setStaff] = useState([]);
  const [payload, setPayload] = useState({});
  const [show, setShow] = useState(false);
  const [director, setDirector] = useState([]);

  const [detail, setDetail] = useState({});
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow(false);

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
          username: item.companyName,
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
    { title: "CompanyName", field: "username" },
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
              const detailURL = `${webapibaseurl}/admin/corporate-detail/${rowData.id}`;
              const directorURL = `${webapibaseurl}/director/${rowData.id}`;
              axios.get(detailURL).then((res) => {
                setDetail(res.data.data);
                console.log(res.data.data);
                setShow(true);
              });
              axios.get(directorURL).then((res) => {console.log(res.data.directors);setDirector(res.data.directors)});
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
          <h5>Admin - All Corporate Accounts</h5>
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
            title={<b>Cooporate Members</b>}
            columns={columns}
            data={rows}
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
          <div style={{ height: 100 }}>.</div>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            ref={ref}
            centered
          >
             <Modal.Header> <img
            src={logo}
            alt="Logo"
            style={{ height: 32, marginLeft: 25, marginTop: 10, cursor:"pointer"}}
          
          /></Modal.Header>
            <Modal.Body >
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
                  <b>Corporate Account</b>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <label>
                      <b>Company Name</b>
                    </label>
                    <br />
                    {detail.companyName}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Category</b>
                    </label>
                    <br />
                    {detail.category}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Rregistration No.</b>
                    </label>
                    <br />
                    {detail.registrationNumber}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Date of Incorporation</b>
                    </label>
                    <br />
                    {moment(detail.dob).format("LL")}{" "}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-md-3">
                    <label>
                      <b>Country Of Reg.</b>
                    </label>
                    <br />
                    {detail.countryOfRegistration}{" "}
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <label>
                      <b>Type Of Business</b>
                    </label>
                    <br />
                    {detail.typeOfBusiness}{" "}
                  </div>{" "}
                  <div className="col-md-3">
                    {" "}
                    <label>
                      <b>Sector</b>
                    </label>
                    <br />
                    {detail.sector}
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <label>
                      <b>SCUML Reg No.</b>
                    </label>
                    <br />
                    {detail.scumlRegNo}
                  </div>
                  <hr />
                </div>

                <div>
                  <hr />
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <label>
                      <b>TIN</b>
                    </label>
                    <br />
                    {detail.tin}
                  </div>
                  <div className="col-md-4">
                    <label>
                      <b>Email</b>
                    </label>
                    <br />
                    {detail.email}
                  </div>
                  <div className="col-md-4">
                    <label>
                      <b>Phone</b>
                    </label>
                    <br />
                    {detail.phoneNumber}
                  </div>
                 
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <label>
                      <b>Corporate Address</b>
                    </label>
                    <br />
                    {detail.CorporateAddress}{" "}
                  </div>
                  <div className="col-md-6">
                    <label>
                      <b>Operating Address</b>
                    </label>
                    <br />
                    {detail.OperatingAddress}{" "}
                  </div>
                </div>
              </div>

             
{
  director.map((i, index)=>{

return(
  <>
   <div
                className="row "
                style={{
                  backgroundColor: "#f15a29",
                  color: "#fff",
                  padding: 4,
                  margin: 2,
                }}
              >
                <b>Director {index+1}</b>
              </div>
              
  <div className="row">
                  <div className="col-md-3">
                    <label>
                      <b>Title</b>
                    </label>
                    <br />
                    {i.title}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>Full Name</b>
                    </label>
                    <br />
                    {i.name}{" "}
                  </div>
                  <div className="col-md-3">
                    <label>
                      <b>TIN</b>
                    </label>
                    <br />
                    {i.tin}{" "}
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <label>
                      <b>DOB</b>
                    </label>
                    <br />
                    {moment(i.dob).format("LL")}{" "}
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-md-3">
                    <label>
                      <b>Marital Status</b>
                    </label>
                    <br />
                    {i.maritalStatus}{" "}
                  </div>
                  <div className="col-md-3">
                  <label>
                    <b>Mothers Maiden Name</b>
                  </label>
                  <br />
                  {detail.motherMaidenName}
                </div>
                <div className="col-md-3">
                  <label>
                    <b>Nationality</b>
                  </label>
                  <br />
                  {i.nationality}
                </div>
                <div className="col-md-3">
                  <label>
                    <b>State Of Origin</b>
                  </label>
                  <br />
                  {i.stateOfOrigin}
                </div>
                  <hr />
                </div>

                <div>
                  <hr />
                </div>
            
              <div className="row">
                
              <div className="col-md-3">
                    {" "}
                    <label>
                      <b>Phone :</b>
                    </label>
                    <br />
                    {detail.phone}{" "}
                  </div>{" "}
                  <div className="col-md-3" style={{paddingRight: "4px", paddingLeft: "4px"}}>
                    {" "}
                    <label>
                      <b>Email:</b>
                    </label>
                    <br />
                    {detail.email} &nbsp;
                  </div>
                
                <div className="col-md-6" style={{paddingRight: "4px", paddingLeft: "4px"}}>
                  <label>
                    <b>Address:</b>
                  </label>
                  <br />
                  {i.address}{" "}
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
                <b>Work Detail</b>
              </div>

              <div className="row">
              <div className="col-md-4">
                  <label>
                    <b>Occupation:</b>
                  </label>  <br />
                  {i.occupation}
                </div>
                <div className="col-md-4">
                  <label>
                    <b>Work Place:</b>
                  </label> <br />
                  {i.placeOfWork}
                </div>
                <div className="col-md-4">
                  <label>
                    <b>Nature Of Business:</b>
                  </label>  <br />
                  {i.natureOfBusiness}{" "}
                </div>
               
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label>
                    <b>BVN</b>
                  </label>  <br />
                  {i.bvn}
                </div>
                <div className="col-md-8">
                  <label>
                    <b>Work Address:</b>
                  </label>  <br />
                  {i.workAddress}{" "}
                </div>
              </div>
              <hr />
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
                  </label>
                  <br />
                  {i.meansOfID}{" "}
                </div>
                <div className="col-md-3">
                  <label>
                    <b>ID Number:</b>
                  </label>
                  <br />
                  {i.IDnumber}{" "}
                </div>
                <div className="col-md-3">
                  <label>
                    <b>Issuance Date:</b>
                  </label>
                  <br />
                  {moment(i.issuanceDate).format("LL")}
                </div>
                <div className="col-md-3">
                  <label>
                    <b>Expiry Date:</b>
                  </label>
                  <br />
                  {moment(i.expiryDate).format("LL")}
                </div>
              </div></>
)


  })
}
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
              <Pdf targetRef={ref} filename="MemberDetail.pdf">
                {({ toPdf }) => (
                  <Button
                    color="success"
                    type="submit"
                    className="btn-sm"
                    variant="success"
                    style={{ marginTop: 10 }}
                    onClick={toPdf}
                  >
                    Download PDF
                  </Button>
                )}
              </Pdf>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
