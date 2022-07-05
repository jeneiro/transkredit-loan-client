import React, { useEffect, useState } from "react";
import { webapibaseurl } from "../environment";
import { axiosInstance as axios } from "../interceptor";
import { Button } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { useAlert } from "react-alert";

const AdminInterestRate = (props) => {
  const alert = useAlert();
  const [rate, setRate] = useState("");
  const [show, setShow] = useState(false);
  const [newRate, setNewRate] = useState("");
  const getURL = `${webapibaseurl}/interest-rate`;
  const postURL = `${webapibaseurl}/interest-rate`;
  function handleClose2(event) {
    props.handleClose(event);
  }

  useEffect(() => {
    axios.get(getURL).then((res) => {
      setRate(res.data.data[0].rate);
    });
  }, []);
  const handleClose = () => setShow(false);
  function submitForm(e) {
    e.preventDefault();
    setShow(true);
  }

  return (
    <div>
      <form onSubmit={submitForm} style={{ padding: 5 }}>
        <div style={{ margin: 20 }}>
          {" "}
          <label className="">New Rate</label>{" "}
          <input
            type="number"
            min="1"
            max="100"
            id="myPercent"
            onChange={(e) => {
              setNewRate(e.target.value);
            }}
          />
        </div>
        <button>Submit Rate</button>
      </form>

      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <b>
            Are you sure you want to set a {newRate}% Interest Rate?{" "}
            {newRate / 100} Reducing Interest will be charged on all loan
            request. Previous rate is {rate}
          </b>
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
              const value = newRate / 100;
              const valueString = { rate: value.toString() };
              axios.post(postURL, valueString).then((res) => {
                handleClose();
                alert.success(`New Rate Successfully set at ${newRate}%`);
                handleClose2();
              });
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminInterestRate;
