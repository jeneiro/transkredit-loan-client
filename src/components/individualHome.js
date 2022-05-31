import React, {useEffect}from 'react'
import { useNavigate } from "react-router-dom";
import $ from "jquery";
export default function IndividualHome() {
 
    const navigate = useNavigate();
  
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
          <h4>Join Cooporative</h4>
        </aside>
        <img src="" />
      </div>

      <div class="productBox small">
        <aside>
          <h4>Joint Account</h4>
        </aside>
        <img src="" />
      </div>
    </>
       
   
    );
}
