import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { axiosInstance as axios } from "../interceptor";
import { DataGrid } from "@mui/x-data-grid";
import { webapibaseurl } from "../environment";
import { useAlert } from "react-alert";
export default function CSV() {
  const alert = useAlert();
  const CorporateId = localStorage.getItem("CorporateId");
  const Cooporative = localStorage.getItem("CorporativeId")
  const [data, setData] = useState([]);
  const [columns, setKeys] = useState([]);
  const postList = `${webapibaseurl}/staff/${CorporateId}`;
  const rows = data;

  return (
    <div className="App">
      <div className="row">
      <input
        className="input-group col-md-10"
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;

          if (files) {
            Papa.parse(files[0], {
              complete: function (results) {
                let keys = results.data[0];

                keys = results.data[0].map((v) =>
                  v
                    .toLowerCase()
                    .replace(/ /g, "_")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                );
                let keyArr = keys.map((key) => {
                  let i = { field: key, headerName: key, width: "50%" };
                  return i;
                });

                let column = [
                  { field: "id", headerName: "ID", width: 90 },
                  ...keyArr,
                ];

                setKeys(column);
                let values = results.data.slice(1);
                let objects = values.map((array) => {
                  let object = {};
                  keys.forEach((key, i) => (object[key] = array[i]));

                  return object;
                });
                let dataRow = objects.map((object, index) => {
                  let id = index + 1;
                  object.id = id;
                  return object;
                });

                setData(dataRow);
              },
            });
          }
        }}
      />
      <div  className="col-md-2" style={{padding:10}}><button className="btn btn-outline-secondary" onClick={()=>{
        alert.info("List Cleared");
        setData([])
        setKeys([])

      }}><i class="fa fa-times" ></i></button></div>
      
      </div>
      <div className="row">
        <div className="col-md-8">
          <small style={{ color: "blue" }}>
            {" "}
            *Uploads should be in (.csv) format and must have fullName and
            staffId columns
          </small>{" "}
        </div>
        <div className="col-md-4">
          <form>
            <button
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post(postList, data)
                  .then((res) => {
                    console.log(res);
                    alert.success("Member List submitted successfully");
                    setData([])
                    setKeys([])
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
