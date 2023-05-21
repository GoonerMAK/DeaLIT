import { useState } from "react"
import Addexchangeproduct from "../components/Addexchangeproduct";
import Addsell from "../components/Addsell";
import Addrent from "../components/Addrent";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Selection= styled.select`
width: 20%;
padding: 10px;
border: 1px solid #ccc;
margin-bottom: 10px;
margin-left: 10px;
`;

const Container = styled.div`
  height:115vh;
`;

const Addition = ()=>{
    const[selected, setselected]=useState('')
    const[exchange, setexchange]=useState('')
    const[sell, setsell]= useState('')
    const[rent, setrent]=useState('')
    

    const handleselect = (e)=>{
        setselected(e.target.value)
        Check()
    }
    const Check = ()=>{
        if(selected === "Exchange"){
            setexchange(true)
            setrent(false)
            setsell(false)
        }else if(selected === 'Rent'){
            setrent(true)
            setexchange(false)
            setsell(false)
        }else if(selected === "Sell"){
            setsell(true)
            setrent(false)
            setexchange(false)
        }
    }
    return(
        <>
    <Container>
        <Announcement />
    <Navbar/>
        
        <div>
        <Selection  value={selected} onChange={handleselect}>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Exchange">Exchange</option>      {/*value={exchange} onSelect={setexchange(true)}*/}
            <option>others</option>
        </Selection>
        </div>
        {exchange && <Addexchangeproduct/>}
        {sell && <Addsell/>}
        {rent && <Addrent/>}
        
    </Container>
    <Footer />
    </>
    )
}
export default Addition