import React, {useEffect, useState}from 'react'
import axios from 'axios'
import { webapibaseurl } from '../environment'
import { useNavigate } from "react-router";


export default function Corporate() {
    const navigate =useNavigate()
    const [payload, setPayload]=useState({})
    const uri = `${webapibaseurl}/corporate`
    useEffect(()=>{},[])

    function changeHandler(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setPayload({ ...payload, [name]: value });
    }
    function onSubmit(e){
       
    }



  return (
    <div>corporate</div>
  )
}
