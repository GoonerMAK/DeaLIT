import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation , Link} from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";

const Pendingrentrequests = ({request}) => {
    const [product, setProduct] = useState('')
    const [renttype, setrenttype] = useState(request.renttype)
    const [price, setprice] = useState(request.proposed_price)
    const [selected, setselected]=useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [ShowConfirmationRe, setShowConfirmationRe] = useState(false);
    const [updated, setupdated] = useState(false)
    const [show, setshow] = useState(false)
    const [owner, setowner] = useState('')
    
    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            'http://localhost:3000/api/products/find/'+ request.objectid
          );
          // console.log(res);
          setProduct(res.data);
        } catch (err) {}
      };
      getProducts();
    }, [request.objectid]);

    useEffect(() => {
      const getsender = async () => {
        try{
          const res = await axios.get('http://localhost:3000/api/user/find/'+request.sender_id)
          setowner(res.data)
          console.log(res.data)
        }catch(error)
        {
          console.log(error)
        }
    };
    getsender();
    },[request.sender_id]);

    useEffect(() => {
      const getowner = async () => {
        try{
          const res = await axios.get('http://localhost:3000/api/user/find/'+request.owner_id)
          setowner(res.data)
          console.log(res.data)
        }catch(error)
        {
          console.log(error)
        }
    };
    getowner();
    },[request.owner_id]);
    
    const handleclick = (e)=>{
      setselected(current => !current)
    }

    const handleaccept = () =>{
      setShowConfirmation(true);
    }
    const handlereject = () =>{
      
      setShowConfirmationRe(true);
    }
    const text= `this is a contract for ${product.title}. Where Owner ID: ${request.owner_id} Rented this product to  Reciever ID: ${request.sender_id} `
    const handleConfirm = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/rentreq/sender/'+request._id, {text})
      .then((response) =>{
        console.log(response.data)
          setupdated(true)
      }).catch((error)=>{
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      })
      setShowConfirmation(false);
    };

    const handleConfirmRe = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/rentreq/sender/reject/'+request._id)
      .then((response) =>{
        console.log(response)
          setupdated(false)
      }).catch((error)=>{
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      })
      setShowConfirmationRe(false);
    };
  
    const handleCancel = () => {
      // Cancel the action
      console.log('Action canceled');
      setShowConfirmationRe(false);
      setShowConfirmation(false);
    };

  

      

      
    
    return (
        <>
            <h1>{product.title}</h1>
            <h1>{request.proposed_price}</h1>
            <label>{request.renttype}</label>
            <li>
            <Link to= {`/messege?data=${request.owner_id}`}>Message</Link>
            </li>
            {updated?<>
            {request.owner_verify?<button onClick={handleaccept}>varify</button>:<label>Owner havent varified this product yet.</label>}
            {request.owner_verify?<button onClick={handlereject}>Reject</button>:<label>Owner havent varified this product yet.</label>}</>:
            <label>You have already processed this </label>}
            
            {showConfirmation && (
                <ConfirmationDialog
                message="Are you sure you want to verify? Once you varify contract will be generated and you cant undo"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
            {ShowConfirmationRe && (
                <ConfirmationDialog
                message="Are you sure you want to reject? Once you reject, you cant undo"
                onConfirm={handleConfirmRe}
                onCancel={handleCancel}
              />
            )}
            {(request.sender_verify||updated)&&<button onClick={handleclick}>show contract</button>}
            {selected&& <Contractforexc text={text}/>}

        </>
    )
}


export default Pendingrentrequests