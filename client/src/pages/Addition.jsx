import { useState } from "react"
import Addexchangeproduct from "../components/Addexchangeproduct";
import Addsell from "../components/Addsell";
import Addrent from "../components/Addrent";
import Navbar from "../components/Navbar";


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
    <container>
    {/* <Navbar/> */}
        
        <div>
        <select  value={selected} onChange={handleselect}>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Exchange">Exchange</option>      {/*value={exchange} onSelect={setexchange(true)}*/}
            <option>others</option>
        </select>
        </div>
        {exchange && <Addexchangeproduct/>}
        {sell && <Addsell/>}
        {rent && <Addrent/>}
        
    </container>
        
    )
}
export default Addition