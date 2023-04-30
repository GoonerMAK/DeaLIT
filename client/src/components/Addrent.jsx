import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'


const Addrent= ()=>{
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [desc, setdesc] = useState('')
    const [imgfile, setimgfile]=useState('')
    const [img, setimg] = useState('')
    const[price, setprice]= useState('')
    const[prefer, setprefer]= useState('')
    const [categories, setcategories]=useState()
    const [error, setError] = useState(null)

    const optionList=[{value:"Electronics", label:"Electronics"},
    {value:"Daily use", label:"Daily use"}
    ]

    function handleSelect(data) {
        setcategories(data);
    }

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
            console.log(response);
            setimg(response.data.secure_url);
            }).catch((error) => {
              console.log(error);
          })
    }
    

    const handleSubmit = async (e) => {
      e.preventDefault()
      //add to the backend part 
      console.log(img)
      //const formData = new FormData()
      const user_email= user.email
      
      
      handleimagesave()
      // console.log(formData)
      // console.log(formData.get(img))
       axios.post('http://localhost:3000/api/Addition/addrent', //formData
        {user_email, title, desc, img, price, prefer, categories
      }, {
        headers:{
          'Content-Type': 'application/json' //, 'Authorization': `Bearer ${user.token}`  'multipart/form-data'  
        }
      }
      ).then((response)=>{
        console.log(response)
        setTitle('')
        setdesc('')
        setprefer('')
        setimg('')
        setError(null)
        setcategories('')
        setprice('')
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
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a New Product for Rent</h3>
    
          <label>Product Title:</label>
          <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            // className={emptyFields.includes('title') ? 'error' : ''}
          />
          
          <label>price :</label>
          <input 
            type="number"
            onChange={(e) => setprice(e.target.value)}
            value={price}
            // className={emptyFields.includes('load') ? 'error' : ''}
          />
    
          <label>desc:</label>
          <input 
            type="text"
            onChange={(e) => setdesc(e.target.value)}
            value={desc}
            // className={emptyFields.includes('reps') ? 'error' : ''}
          />
        <select value={prefer} onChange={e => setprefer(e.target.value)}>
            <option value="Weekly">weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
        </select>
          <label>img:</label>
          <input 
          type="file"
          name="photos"
          onChange={handleimage}
          className="form-control-file"
           multiple
        // className={emptyFields.includes('reps') ? 'error' : ''}
      />
          <div className="dropdown-container">
            <Select
              options={optionList}
              placeholder="Select category"
              onChange={handleSelect}
              value={categories}
              isSearchable={true}
              isMulti
            />
          </div>
    
          <button>Add Product</button>
          {error && <div className="error">{error}</div>}
        </form>
      )


}
export default Addrent