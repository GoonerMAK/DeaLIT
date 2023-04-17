import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

const Addsell= ()=>{
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [desc, setdesc] = useState('')
    const [img, setimg] = useState('')
    const[price, setprice]= useState('')
    const [categories, setcategories]=useState()
    const [error, setError] = useState(null)

    const optionList=[{value:"Electronics", label:"Electronics"},
    {value:"Daily use", label:"Daily use"}
    ]

    function handleSelect(data) {
        setcategories(data);
    }
    const handleimage= (e)=>{

      var fileObject = e.target.files[0];

      var newObject  = {
        'lastModified'     : fileObject.lastModified,
        'lastModifiedDate' : fileObject.lastModifiedDate,
        'name'             : fileObject.name,
        'size'             : fileObject.size,
        'type'             : fileObject.type
     };  

    console.log(fileObject.name)
    setimg(fileObject.name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(img)
      //const formData = new FormData()
      const user_email= user.email
      
      

      // console.log(formData)
      // console.log(formData.get(img))
       axios.post('http://localhost:3000/api/Addition/addsell', //formData
        {user_email, title, desc, img, price, categories
      }, {
        headers:{
          'Content-Type': 'application/json' //, 'Authorization': `Bearer ${user.token}`  'multipart/form-data'  
        }
      }
      ).then((response)=>{
        console.log(response)
        setTitle('')
        setdesc('')
        setimg('')
        setError(null)
        setcategories('')
        setprice('')
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
          <h3>Add a New Product for sell</h3>
    
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
export default Addsell