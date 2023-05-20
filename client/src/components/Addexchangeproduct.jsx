import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'


const Input= styled.input`
  margin-top: 10px;
  border: none;
  background-color: #e5e2e2;
  width: 10%;
  height: 0.01em;
  border-radius: 0.25em;
  text-align: center;
  padding: 2em;
`;

const Addexchangeproduct = ()=>{
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [desc, setdesc] = useState('')
    const [imgfile, setimgfile]=useState('')
    const [img, setimg] = useState('')
    const[preference, setprefer]= useState('')
    const [categories, setcategories]=useState()
    const [error, setError] = useState(null)
    const [exchangetype, setexchangetype] = useState('')
    // const formData=new formData(); 

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
            console.log("for image URL", response);
            setimg(response.data.secure_url);
            }).catch((error) => {
              console.log(error);
          })
    }
    
    const handleSubmit=  (e)=>{
        e.preventDefault()
        //add to the backend part 
        handleimagesave()
        console.log(img)
         const user_email= user.user._id
        // formData.append("user_email",user_email)
        // formData.append("title",title)
        // formData.append("desc",desc)
        // formData.append("img",img)
        // formData.append("preference",preference)
        // formData.append("categories",categories)
        // formData.append("exchangetype", exchangetype)
        

        // console.log(formData)
        // console.log(formData.get(img))
         axios.post('http://localhost:3000/api/Addition/addexchange', //formData
          {user_email, title, desc, img, preference, categories, exchangetype
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
          setexchangetype('')
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
        <h3>Add a New Product For exchange</h3>

        <label>Product Title:</label>
        <Input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        // className={emptyFields.includes('title') ? 'error' : ''}
        />
      <label>desc:</label>
    
      <Input 
        type="text"
        onChange={(e) => setdesc(e.target.value)}
        value={desc}
        // className={emptyFields.includes('reps') ? 'error' : ''}
      />
      
      <label>Preference :</label>
      <Input 
        type="text"
        onChange={(e) => setprefer(e.target.value)}
        value={preference}
        // className={emptyFields.includes('load') ? 'error' : ''}
      />
      <select value={exchangetype} onChange={e => setexchangetype(e.target.value)}>
        <option>chose</option>
        <option value="Tempory">Temporary</option>
        <option value="Paramanent">Parmanent</option>
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
export default Addexchangeproduct