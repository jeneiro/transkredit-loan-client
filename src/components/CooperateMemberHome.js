import React, {useEffect, useState}from 'react'
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import CooperativeMemberKYC from "./cooperativeMemberKYC"
export default function CooperateMemberHome() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    function handleClose(event) {
        setShow(false);
      }
  
    useEffect(() => {
      
  
    hover() }, []);
  
    function hover(){
      $(".productBox").on('mouseenter',function(){$(this).addClass('color-hover')}).on('mouseleave',function(){$(this).removeClass('color-hover').show() })
    
    }
    
    
    return (
  
      <>
      <div
        class="productBox small"
        onClick={() => {
         setShow(true)
        }}
      >
        <aside>
          <h4>Update User Details</h4>
        </aside>
        <img src="" />
      </div>

      <CooperativeMemberKYC show={show} handleClose={handleClose} /> 
     
    </>
       
   
    );
}
