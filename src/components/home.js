
import React, {useEffect, useState} from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate();
  return (
    <div  style={{ marginTop: 55,padding:50, marginLeft:20}}>
      <div className='row header title' ><h4>Welcome</h4> <h6> name</h6>  </div>
      <div className='row'>
      <div class="productShell" style={{marginTop: 55}}>
	<div class="productBox color-blue">
		<aside><h4>Book a Loan</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>

	<div class="productBox small color-green">
		<aside><h4>Loan Request</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>

	<div class="productBox small">
		<aside><h4>Pending Approvals</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>

	<div class="productBox small">
		<aside><h4>Members</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>

	<div class="productBox small">
		<aside><h4>Running Loans</h4></aside>
		<img src="" />
	</div>

	<div class="productBox small" onClick={()=>{navigate("/app/corporative")}}>
		<aside><h4>Register Corporative</h4></aside>
		<img src="" />
	</div>

	<div class="productBox small"onClick={()=>{navigate("/app/join-corporative")}}>
		<aside><h4>Join Corporative</h4></aside>
		<img src="" />
	</div>

	{/* <div class="productBox small">
		<aside><h4>Text Name Here</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>

	<div class="productBox small">
		<aside><h4>Text Name Here</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div> */}

	{/* <div class="productBox small">
		<aside><h4>Text Name Here</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>

	<div class="productBox small">
		<aside><h4>Text Name Here</h4></aside>
		<img src="http://placehold.it/240x240" />
	</div>					 */}
</div>
      </div>
    
    
    
    </div>
  )
}
