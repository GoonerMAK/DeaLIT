import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation , Link} from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";


const  AlreadyRented = ({product}) => {
   
    const [selected, setselected]=useState(false)
    const [Uproduct, setUproduct]=useState('')
    const [isowner, setisowner] = useState(false)
    const [issender, setissender] = useState(false)
    const [owner, setowner] = useState('')
    const [sender, setsender] = useState('')



    const [show, setshow] = useState(false)
    
    const upperuser = JSON.parse(localStorage.getItem('user'))
    const user=upperuser.user
    
    const handleclick = (e)=>{
      setselected(current => !current)
    }

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            'http://localhost:3000/api/products/find/'+ product.objectid
          );
          // console.log(res);
          setUproduct(res.data);
          
        } catch (err) {}
      };
      getProducts();
    }, [product.objectid]);

    
  useEffect(() => {
    const getuser = async () => {
      if(user._id===product.owner_id){
      try{
        const res = await axios.get('http://localhost:3000/api/user/find/'+product.sender_id)
        setsender(res.data)
        setisowner(true)
        console.log("User",res.data)
      }catch(error)
      {
        console.log(error)
      }
    }else if(user._id===product.sender_id){
        try{
            const res = await axios.get('http://localhost:3000/api/user/find/'+product.owner_id)
            setowner(res.data)
            setissender(true)
            console.log("user",res.data)
          }catch(error)
          {
            console.log(error)
          } 
    }
  };
  getuser();
  },[user._id]);



    return (
        <>
            <h1>Rented Product</h1>
            
            <h1>{Uproduct.title}</h1>
            {isowner&&<label>Rented to:{sender.username}</label>}
            {issender&&<label>Rented from:{owner.username}</label>}
            <label>Rented For:{product.renttype} Basis</label>
            <img src={Uproduct.img} />
            <li>
            {user._id===product.owner_id?<Link to= {`/messege?data=${product.sender_id}`}>Message</Link>:<Link to= {`/messege?data=${product.owner_id}`}>Message</Link>}
            </li>
            <label>Rent:{product.Price}</label>
            <button onClick={handleclick}>show contract</button>
            {selected&& <Contractforexc text={product.contract}/>}

        </>
    )
}


export default AlreadyRented