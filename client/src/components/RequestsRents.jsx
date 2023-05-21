import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation , Link} from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";

const RequestsRents = ({request}) => {
    const [product, setProduct] = useState('')
    const [renttype, setrenttype] = useState(request.renttype)
    const [price, setprice] = useState(request.proposed_price)
    const [selected, setselected]=useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [updated, setupdated] = useState(false)
    const [show, setshow] = useState(false)
    
    
    const handleclick = (e)=>{
      setselected(current => !current)
    }

    const handleaccept = () =>{
      setShowConfirmation(true);
    }

    const handleConfirm = async(e) => {
      e.preventDefault()
      // Perform the action after confirmation
      console.log('Action confirmed');
      await axios.post('http://localhost:3000/api/products/rentreq/verifyowner/'+request._id, {price, renttype})
      .then((response) =>{
        console.log(response)
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
  
    const handleCancel = () => {
      // Cancel the action
      console.log('Action canceled');
      setShowConfirmation(false);
    };

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
        const getRequests = async () => {
          try {
            const res = await axios.get('http://localhost:3000/api/products/rentreq/pending/' + request.owner_id);
            if (Array.isArray(res.data) && res.data.length === 0) {
              console.log('Response is empty for rent');
              setshow(false)
            } else if (typeof res.data === 'object' && Object.keys(res.data).length === 0) {
              console.log('Response is empty');
              setshow(false)
              // Handle the case when the response is empty
            } else {
              setshow(true);
              console.log('Check if any requests exist', res.data);
            }
          } catch (err) {
            console.log(err);
          }
        };
      
        getRequests();
      }, [request.owner_id, request.owner_verify]);

      const text= `this is a contract for ${product.title} `
    
    return (
        <>
            <h1>{product.title}</h1>
            <label>prefered rent type:{renttype}</label>
            <label>change Rent Type?</label>
            {!updated&&<select value={renttype} onChange={e => setrenttype(e.target.value)}>
                <option value="choose">weekly</option>
                <option value="Weekly">weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>}
            <label>prefered price:{price}</label>
            <label>change price?</label>
            <input 
            type="number"
            onChange={(e) => setprice(e.target.value)}
            value={price}
            // className={emptyFields.includes('load') ? 'error' : ''}
          />
            <li>
            <Link to= {`/messege?data=${request.sender_id}`}>Message</Link>
            </li>
            
            {show||request.owner_verify||updated?<label>this product is already verified</label>:<button onClick={handleaccept}>varify</button>}
            {showConfirmation && (
                <ConfirmationDialog
                message="Are you sure you want to verify? Once you varify contract will be generated and you cant undo"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
            {(request.owner_verify||updated)&&<button onClick={handleclick}>show contract</button>}
            {selected&& <Contractforexc text={text}/>}

        </>
    )
}


export default RequestsRents