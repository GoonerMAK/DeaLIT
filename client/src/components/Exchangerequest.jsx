import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

const Exchangerequest = (product) =>{
    const { user } = useAuthContext()
    const {Product} = product
    const [title, setTitle] = useState('')
    const [imgfile, setimgfile]=useState('')
    const [img, setimg] = useState('')
    const [returndate, setreturndate] = useState('')
    const [desc, setdesc] = useState('')
    const [error, setError] = useState(null)


    const handleimage= (e)=>{
        e.preventDefault()
        // const formData = new FormData()
  
        var fileObject = e.target.files[0];
        setimgfile(fileObject);
      }
      const handleimagesave=()=>{
        const formData = new FormData()
          formData.append("file", imgfile)
          formData.append("upload_preset", "Product_image")
  
          axios.post(
            "https://api.cloudinary.com/v1_1/dcpremwwm/image/upload",formData)
            .then((response) => {
              console.log("for image URL", response);
              setimg(response.data.secure_url);
              }).catch((error) => {
                console.log(error);
            })
      }

    const handleSubmit  = async(e) => {
        handleimagesave()
        const owner_id=Product.user_email
        const sender_id=user.user._id 
        console.log("sender",owner_id)
        const object_id=Product._id
        console.log("product",object_id)
        e.preventDefault()
        //add to the backend part 
        
        console.log(img)
        await axios.post('http://localhost:3000/api/Addition/exchangerequest', 
        {title, desc, img, sender_id, owner_id, object_id,returndate}
        ).then((response)=>{
            console.log(response)
            setTitle('')
            setdesc('')
            setreturndate('')
            setimg('')
            setError(null)
            setimgfile('')
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


    }
    return (
        <form className="exchange" onSubmit={handleSubmit} encType='multipart/form-data'> 
            <h3>Place a request for exchange</h3>
    
            <label>Product Title:</label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            // className={emptyFields.includes('title') ? 'error' : ''}
            />
          <label>desc:</label>
        
          <input 
            type="text"
            onChange={(e) => setdesc(e.target.value)}
            value={desc}
            // className={emptyFields.includes('reps') ? 'error' : ''}
          />
          <label>img:</label>
          <input 
            type="file"
            name="photos"
            onChange={handleimage}
            className="form-control-file"
            multiple
            // className={emptyFields.includes('reps') ? 'error' : ''}
          />
          <label>return Date:</label>
        <input type="date" onChange={(e) => setreturndate(e.target.value)} value={returndate}/>
          <button>place a request</button>
          {error && <div className="error">{error}</div>}
        </form>
        )

}
export default Exchangerequest