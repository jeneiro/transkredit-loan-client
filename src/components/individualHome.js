import React, {useEffect, useState}from 'react'
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import JointAccountKYC from './jointAccountKYC';
export default function IndividualHome() {
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
          navigate("/app/join-corporative");
        }}
      >
        <aside>
          <h4>Join Cooperative</h4>
        </aside>
        <img src="" />
      </div>

      <div class="productBox small"
        onClick={() => {
         setShow(true);
        }}
        >
        <aside>
          <h4>Joint Account</h4>
        </aside>
        <img src="" />
      </div>
      <JointAccountKYC show={show} handleClose={handleClose} />  
    </>
       
   
    );
}
