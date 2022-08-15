import React, { useState, Fragment } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { useEffect } from "react";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { DatePicker } from "@material-ui/pickers";
export default function CorporateApproved() {
  const id = localStorage.getItem("id");
  const CorporateId = localStorage.getItem("CorporateId");
  const getReqURL = `${webapibaseurl}/loan/corporate-approved/${CorporateId}`;
  const [total, setTotal] = useState(0);
  const [selectedDateID, handleDateChangeID] = useState(new Date());
  const [toggle, setToggle] = useState(false);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    callList();
  }, []);
  function currencyFormat(num) {
    return "₦" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function callList() {
    axios.get(getReqURL).then((res) => {
      const list = res.data.data;
      console.log(res.data.total);
      setTotal(res.data.total);
      const listItems = list.map((item, index) => {
        const payload = {
          sn: index + 1,
          date: moment(item.date).format("LL"),
          loanAmount: currencyFormat(Number(item.loanAmount)),
          tenor: item.tenor,
          loanType: item.loanType,
          repaymentMode: item.repaymentMode,
          status: item.status,
          username: item.username,
        };

        return payload;
      });
      setStaff(listItems);
    });
  }
  function callListMonthRange(startOfMonth, endOfMonth) {
    const getMonthlyRequestURL = `${webapibaseurl}/loan/corporate-approved/date-range/${CorporateId}`;
    axios
      .post(getMonthlyRequestURL, { startOfMonth, endOfMonth })
      .then((res) => {
        const list = res.data.data;
        console.log(res.data.total);
        setTotal(res.data.total);
        const listItems = list.map((item, index) => {
          const payload = {
            sn: index + 1,
            date: moment(item.date).format("LL"),
            loanAmount: currencyFormat(Number(item.loanAmount)),
            tenor: item.tenor,
            loanType: item.loanType,
            repaymentMode: item.repaymentMode,
            status: item.status,
            username: item.username,
          };

          return payload;
        });
        setStaff(listItems);
      });
  }
  let rows = staff;
  let columns = [
    { title: "S/N", field: "sn", width: "1%",  width: 5 },
    { title: "Applicant", field: "username" },
    { title: "Loan Amount", field: "loanAmount" },
    { title: "Loan Type", field: "loanType" },
    { title: "Repayment Mode", field: "repaymentMode" },
    { title: "Tenor", field: "tenor", width: 10 },
    { title: "Date", field: "date" },
   
  ];

  return (
    <div>
      <div style={{ marginTop: 120 }} className="col-md-8 offset-2">
        <div className="Form-container ">
          <h5>Approved Loans</h5>

          <div
            className="row "
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <b>Approved Loan List</b>
          </div>
          <div className="row">
            {toggle && (
              <div className=" col-md-3">
                <Fragment className="input-group">
                  <DatePicker
                    variant="inline"
                    maxDate={new Date()}
                    openTo="month"
                    views={["month", "year"]}
                    label="Month & Year"
                    helperText="approved loans for selected month"
                    value={selectedDateID}
                    autoOk={true}
                    onChange={(date) => {
                      handleDateChangeID(date);

                      const startOfMonth = moment(date)
                        .startOf("month")
                        .format("YYYY-MM-DD hh:mm");
                      const endOfMonth = moment(date)
                        .endOf("month")
                        .format("YYYY-MM-DD hh:mm");
                     

                      callListMonthRange(startOfMonth, endOfMonth);
                    }}
                  />
                </Fragment>
              </div>
            )}
            <div className="col-md-6">
              <form className="col-md-5">
                {toggle ? (
                  <button
                  style={{borderColor:'white'}}
                    onClick={(e) => {
                      e.preventDefault();
                      callList();
                      setToggle(false);
                    }}
                  >
                    All Records
                  </button>
                ) : (
                  <button
                  style={{borderColor:'white'}}
                    onClick={(e) => {
                      e.preventDefault();
                      const startOfMonth = moment(selectedDateID)
                      .startOf("month")
                      .format("YYYY-MM-DD hh:mm");
                    const endOfMonth = moment(selectedDateID)
                      .endOf("month")
                      .format("YYYY-MM-DD hh:mm");
                    callListMonthRange(startOfMonth, selectedDateID);
                      setToggle(true);
                    }}
                  >
                    Select Month
                  </button>
                )}
              </form>
            </div>
            {toggle?<></>:<div className="col-md-3"></div>}
            <div className="col-md-3">
              <h5>{currencyFormat(total)}</h5>
            </div>
          </div>
          <MaterialTable
            title={<b>List of Approved Loans</b>}
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
