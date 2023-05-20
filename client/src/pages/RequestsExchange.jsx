import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Requestsexchange from "../components/Requestsexchange"

import { useAuthContext } from '../hooks/useAuthContext'


const RequestsExchange=()=>{
    const upperuser = JSON.parse(localStorage.getItem('user'))
    const user=upperuser.user

    const [requests, setrequests]= useState([])
    

    useEffect(() => {
        const getrequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/exchangereq/' + user._id);
            // console.log("for message", res.data)
            setrequests(res.data);
            console.log(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        getrequests();
      }, [user._id]);

      return (
        <>
        {requests.map((request) => (
        <Requestsexchange  key={request._id} request={request} />
      ))}
        </>
      )
    
    
}
export default RequestsExchange