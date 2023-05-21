import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

const Container = styled.div`
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e9e9e9;
  padding: 50px;

  margin-top: 20px;
  margin-bottom: 50px;
`;

const Title = styled.h3`
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input= styled.input`
width: 100%;
padding: 10px;
border: 1px solid #ccc;
margin-bottom: 10px;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-bottom: 10px;
`;

const Selection= styled.select`
width: 100%;
padding: 10px;
border: 1px solid #ccc;
margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 15px;
  margin-top:10px;
  &:hover {
    background-color: rgb(1, 163, 163);
  }
`;

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
    console.log(user._id)
    //const formData = new FormData()
    const user_email= user.user._id
    
    
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
      <Container>
        <form className="create" onSubmit={handleSubmit}>
          <Title><h3>Add a New Product For Rent</h3></Title>
    
          <Label>Product Title:</Label>
          <Input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            // className={emptyFields.includes('title') ? 'error' : ''}
          />
          
          <Label>Price:</Label>
          <Input 
            type="number"
            onChange={(e) => setprice(e.target.value)}
            value={price}
            // className={emptyFields.includes('load') ? 'error' : ''}
          />
    
          <Label>Description:</Label>
          <Input 
            type="text"
            onChange={(e) => setdesc(e.target.value)}
            value={desc}
            // className={emptyFields.includes('reps') ? 'error' : ''}
          />
        <Label>Prefernce:</Label>
        <Selection value={prefer} onChange={e => setprefer(e.target.value)}>
            <option value="Weekly">weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
        </Selection>
          <Label>Image:</Label>
          <FileInput 
          type="file"
          name="photos"
          onChange={handleimage}
          className="form-control-file"
           multiple
        // className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <Label>Catagory:</Label>
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
    
          <SubmitButton>Add Product</SubmitButton>
          {error && <div className="error">{error}</div>}
        </form>
        </Container>
      )


}
export default Addrent