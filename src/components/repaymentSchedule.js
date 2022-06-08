import React from 'react';
import MaterialTable from 'material-table';
export default function RepaymentSchedule(props) {
const data = props.data;
function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
 const rows =  data.map((i, index)=>{
     const sn = index+1
     const obj ={
         sn:sn,
         amount:currencyFormat(i),
         months: "month " + sn
     }
     return obj;

   })

let columns = [
    { title: "S/N", field: "sn", width: "2%" },
    { title: "Months", field: "months" },

    { title: "Amount", field: "amount" },
  ];
  return (
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
  )
}
