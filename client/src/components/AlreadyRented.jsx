import { useState, useEffect } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation , Link} from "react-router-dom";
import Contractforexc from "./Contractforexc";
import { current } from "@reduxjs/toolkit";
import ConfirmationDialog from "./ConfirmationDialog";


const Wrapper = styled.div`
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 34px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Label = styled.label`
  font-size: 19px;
  color: black;
  margin-bottom: 3px;
`;

const Image = styled.img`
  width: 200px;
  padding: 5px;
`;

const MessageLink = styled(Link)`
  font-size: 16px;
  color: teal;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const ContractButton = styled.button`
  padding: 8px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    background-color: #f8f4f9;
  }
`;


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
            <Wrapper>
      <Title>Rented Product</Title>
      <ProductTitle>{Uproduct.title}</ProductTitle>
      {isowner && <Label>Rented to: {sender.username}</Label>}
      {issender && <Label>Rented from: {owner.username}</Label>}
      <Label>Rented For: {product.renttype} Basis</Label>
      <Image src={Uproduct.img} />
      <li>
        {user._id === product.owner_id ? (
          <MessageLink to={`/messege?data=${product.sender_id}`}>Message</MessageLink>
        ) : (
          <MessageLink to={`/messege?data=${product.owner_id}`}>Message</MessageLink>
        )}
      </li>
      <Label>Rent: {product.Price}</Label>
      <ContractButton onClick={handleclick}>Show Contract</ContractButton>
      {selected && <Contractforexc text={product.contract} />}
    </Wrapper>

        </>
    )
}


export default AlreadyRented