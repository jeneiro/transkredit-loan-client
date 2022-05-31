import React from 'react'
import CSV from './csv'

export default function UploadStaffList() {
  return (
    <div>
    <div style={{ marginTop: 90 }} className="col-md-8 offset-2">
      <div className="Form-container ">
        <h5>Cooporative</h5>
        <div
          className="row "
          style={{
            backgroundColor: "#f15a29",
            color: "#fff",
            padding: 4,
            margin: 2,
          }}
        >
          <b>Upload Staff List</b>
        </div>
    <div><CSV/></div>
    </div></div></div>
  )
}
