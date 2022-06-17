import React, {useEffect, useState}from 'react'
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Cooperative from './corporative';
export default function CooporateHome() {
 
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    useEffect(() => {
      
  
    hover() }, []);
  
    function hover(){
      $(".productBox").on('mouseenter',function(){$(this).addClass('color-hover')}).on('mouseleave',function(){$(this).removeClass('color-hover').show() })
    
    }
    function handleClose(event) {
      setShow(false);
    }
    
    return (
  
        <>

        <Cooperative show={show} handleClose={handleClose}/>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/loan-action-list");
              }}
            >
              <aside>
                <h4>Pending Loan Action</h4>
              </aside>
              <img src="" />
            </div>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/corporate-settled");
              }}
            >
              <aside>
                <h4>Members Settled Loans</h4>
              </aside>
              <img src="" />
            </div>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/corporate-approved");
              }}
            >
              <aside>
                <h4>Members Approved Loans</h4>
              </aside>
              <img src="" />
            </div>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/upload-staff-list");
              }}
            >
              <aside>
                <h4>Upload Staff List</h4>
              </aside>
              <img src="" />
            </div>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/staff-list");
              }}
            >
              <aside>
                <h4>Staff List</h4>
              </aside>
              <img src="" />
            </div>
  
            <div
              class="productBox small"
              onClick={() => {
                setShow(true);
              }}
            >
              <aside>
                <h4>Edit Cooperative Name</h4>
              </aside>
              <img src="" />
            </div>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/corporative-request-list");
              }}
            >
              <aside>
                <h4>Cooperative Request</h4>
              </aside>
              <img src="" />
            </div>
            <div
              class="productBox small"
              onClick={() => {
                navigate("/app/document-request-list");
              }}
            >
              <aside>
                <h4>Pending Documents Action</h4>
              </aside>
              <img src="" />
            </div>
          </>
       
   
    );
}
