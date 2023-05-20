import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation , Link} from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";

const Pendingexchange = ({request}) => {
    const [product, setProduct] = useState('')
    const [returndate, setreturndate] = useState(request.return_date)
    const [selected, setselected]=useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [ShowConfirmationRe, setShowConfirmationRe] = useState(false);
    const [updated, setupdated] = useState(false)
    const [show, setshow] = useState(false)
    
    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            'http://localhost:3000/api/products/find/'+ request.objectid
          );
          // console.log(res);
          setProduct(res.data);
          console.log(returndate)
        } catch (err) {}
      };
      getProducts();
    }, [request.objectid]);
    
    const handleclick = (e)=>{
      setselected(current => !current)
    }

    const handleaccept = () =>{
      setShowConfirmation(true);
    }
    const handlereject = () =>{
      
      setShowConfirmationRe(true);
    }
    const text= `this is a contract for ${product.title}. Where Owner ID: ${request.owner_id} and Reciever ID: ${request.sender_id} has agreed to exchange this product. `
    const handleConfirm = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/exchangereq/sender/'+request._id, {text})
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
      await axios.post('http://localhost:3000/api/products/exchangereq/sender/reject/'+request._id)
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
            <h1>{request.title}</h1>
            <label>{request.desc}</label>
            <label>return Date:{returndate}</label>
            <img src={request.img} />
            <li>
            <Link to= {`/messege?data=${request.owner_id}`}>Message</Link>
            </li>
            
            {request.owner_verify?<button onClick={handleaccept}>varify</button>:<label>Owner havent varified this product yet.</label>}
            {request.owner_verify?<button onClick={handlereject}>Reject</button>:<label>Owner havent varified this product yet.</label>}
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


export default Pendingexchange