import React, { useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";

export default function SettledLoanList() {
  const id = localStorage.getItem("id");
  const getReqURL = `${webapibaseurl}/loan/settled-loans/${id}`;
  console.log(id)
  const [staff, setStaff] = useState([]);

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
          date:moment(item.date).format('LL'),
          loanAmount:currencyFormat(Number(item.loanAmount)),
          tenor: item.tenor,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status:item.status,
          username:item.username
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
      <div style={{ marginTop: 120 }} className="col-md-8 offset-2">
        <div className="Form-container ">
          <h5>Settled Loans</h5>
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
            title={<b>List of Settled Loans</b>}
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
        </div>
      </div>
    </div>
  );
}
