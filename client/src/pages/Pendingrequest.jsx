import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Pendingexchange from "../components/Pendingexchange"

import { useAuthContext } from '../hooks/useAuthContext'


const Pendingrequest=()=>{
    const upperuser = JSON.parse(localStorage.getItem('user'))
    const user=upperuser.user

    const [requests, setrequests]= useState([])
    const [show, setshow] = useState(false)
    

    useEffect(() => {
        const getrequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/exchangereq/pending/' + user._id);
            if (Array.isArray(res.data) && res.data.length === 0) {
                console.log('Response is empty');
                setshow(false)
              } else if (typeof res.data === 'object' && Object.keys(res.data).length === 0) {
                console.log('Response is empty');
                setshow(false)
                // Handle the case when the response is empty
              } else {
                setshow(true);
                console.log('Check if any requests exist', res.data);
              }
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
        {show?<>
            {requests.map((request) => (
            <Pendingexchange  key={request._id} request={request} />
          ))}
            </>:<label>no pending requests</label>}
        </>
        
      )
    
    
}
export default Pendingrequest