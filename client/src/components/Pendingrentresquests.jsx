import { useState } from "react"
import Addexchangeproduct from "./Addexchangeproduct";
import Addsell from "./Addsell";
import Addrent from "./Addrent";
import Navbar from "./Navbar";

const pendingrentrequests=({requests})=>{
    const[product, setproduct]=useState('')

    useEffect(() => {
        var id=requests.obkectid
        const getProducts = async () => {
          try {
            const res = await axios.get(
              `http://localhost:3000/api/products/find/${id}`
              // cat
              //   ? `http://localhost:3000/api/products?categories=${cat}`        // the attribute name : categories
              //   : "http://localhost:3000/api/products"
            );
            // console.log(res);
            setproduct(res.data);
          } catch (err) {}
        };
        getProducts();
      }, [cat]);
    return (
        <p>{product.tittle}</p>
    )
}