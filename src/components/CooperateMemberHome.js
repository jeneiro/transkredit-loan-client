import React, {useEffect, useState}from 'react'
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import CooperativeMemberKYC from "./cooperativeMemberKYC"
import UploadPassport from './uploadPassport';
export default function CooperateMemberHome() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const navigate = useNavigate();
    function handleClose(event) {
        setShow(false);
      }
      function handleClose2(event) {
        setShow2(false);
      }
    useEffect(() => {
      
  
    hover() }, []);
  
    function hover(){
      $(".productBox").on('mouseenter',function(){$(this).addClass('color-hover')}).on('mouseleave',function(){$(this).removeClass('color-hover').show() })
    
    }
    
    
    return (
  
      <>
      <div
        className="productBox small"
        onClick={() => {
         setShow(true)
        }}
      >
        <aside>
          <h4>Update User Details</h4>
        </aside>
        <img src="" />
      </div>
      <div
        className="productBox small"
        onClick={() => {
         setShow2(true)
        }}
      >
        <aside>
          <h4>Upload Passport Photograph</h4>
        </aside>
        <img src="" />
      </div>

      <CooperativeMemberKYC show={show} handleClose={handleClose} /> 
      <UploadPassport show={show2} handleClose={handleClose2} /> 
     
    </>
       
   
    );
}
