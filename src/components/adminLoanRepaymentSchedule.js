import React, { useEffect, useState } from "react";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { Button } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { useAlert } from "react-alert";
import MaterialTable from "material-table";

const AdminLoanRepaymentSchedule = (props) => {
    const alert = useAlert();
    const data = props.data;
    const [show, setShow] = useState(false);
    const[ID, setID] = useState();

 
    useEffect(() => {
        
       


    },[]);
    function callList2(event) {
        props.callList2(props.loanID);
       
    }
    function currencyFormat(num) {
        return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
     const rows =  data.map((i, index)=>{
         const sn = index+1
         const obj ={
             sn:sn,
             amount:currencyFormat(Number(i.monthlyAmount)),
             months: i.month,
             status: i.status,
             id:i.id,
         }
         return obj;
    
       })
    
    let columns = [
        { title: "S/N", field: "sn", width: "1%" },
        { title: "Months", field: "months" },
    
        { title: "Amount", field: "amount" },
        { title: "Status", field: "status" },
      ];
      function handleClose2(event) {
   
        props.handleClose2(event);
      }
      const handleClose = () => setShow(false);
  return (
    <div>
    
      <Modal
      show={props.show}
      onHide={handleClose2}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
      
        <div className="row" style={{ width: "100%" }}>
          <h5 className="col-md-6">Loan Repayment Schedule</h5>{" "}
          <div className="col-md-2"></div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
         
        <div><MaterialTable
    title={ <div
        class="row"
        style={{
          backgroundColor: "#f15a29",
          color: "#fff",
          padding: 4,
          margin: 2,
        }}
      >
        <h6>LOAN REPAYMENT SCHEDULE</h6>
      </div>}
    columns={columns}
    data={rows}
    actions={[
        
        {
          icon: "checkCircleOutlineIcon",
          iconProps: { style: { fontSize: "34px", color: "green" } },
          tooltip: "Paid Installment",
          onClick: (event, rowData) => {
          
            setID(rowData.id)
            setShow(true);
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
  /></div>

        </div>
      </Modal.Body>
      <Modal.Footer>
     
      </Modal.Footer>
    </Modal>
    <Modal
            show={show}
            onHide={handleClose}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <b>Are you sure this loan repayment installment has been paid?</b>
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
                    const approveURL = `${webapibaseurl}/loan-schedule/approve/${ID}`;
                  axios.post(approveURL).then((res) => {
                    alert.success("Installment Paid");
                   
                    setShow(false);
                    callList2();
                  });
                }}
              >
                Installment Paid
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  );
};

export default AdminLoanRepaymentSchedule;
