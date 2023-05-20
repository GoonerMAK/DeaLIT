import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Pendingexchange from "../components/Pendingexchange"

import { useAuthContext } from '../hooks/useAuthContext'


const Pendingrequest=()=>{
    const upperuser = JSON.parse(localStorage.getItem('user'))
    const user=upperuser.user

    const [requests, setrequests]= useState([])
    

    useEffect(() => {
        const getrequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/exchangereq/pending/' + user._id);
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
        <Pendingexchange  key={request._id} request={request} />
      ))}
        </>
      )
    
    
}
export default Pendingrequest