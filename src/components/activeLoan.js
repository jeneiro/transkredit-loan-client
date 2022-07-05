import React, { useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import LoanRepaymentSchedule from "./loanRepaymentSchedule";
export default function ActiveLoanList() {
  const id = localStorage.getItem("id");
  const getReqURL = `${webapibaseurl}/loan/approved-loans/${id}`;
  const [show2, setShow2] = useState(false);
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState([]);
  const handleClose2 = () => setShow2(false);
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
          date:moment(item.date).format('LL'),
          loanAmount:currencyFormat(Number(item.loanAmount)),
          tenor: item.tenor,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status:item.status,
          repaymentAmount: currencyFormat(Number(item.totalRepayment))
        };
     
        return payload;
      });
      setStaff(listItems);
    });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Loan Amount", field: "loanAmount" },
    { title: "Repayment Amount", field: "repaymentAmount" },
    { title: "Loan Type", field: "loanType" },
    { title: "Repayment Mode", field: "repaymentMode" },
    { title: "Tenor", field: "tenor" },
    { title: "Date", field: "date" },
  
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-8 offset-2">
        <div className="Form-container ">
          <h5>Active Loans</h5>
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
            title={<b>List of Active Loans</b>}
            columns={columns}
            data={rows}
            actions={[
              {
                icon: "previewIcon",
                iconProps: { style: { fontSize: "34px", color: "green" } },
                tooltip: "Repayment Schedule",
                onClick: (event, rowData) => {
              
                 
                callList2(rowData.id)
             
                 
                },
              }]}
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
        </div>
      </div>
      <LoanRepaymentSchedule data={data} handleClose2={handleClose2} show={show2}/>
    </div>
  );
}
