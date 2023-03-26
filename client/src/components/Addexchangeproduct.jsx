import { useState } from "react"
import Select from "react-select";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'

const Addexchangeproduct = ()=>{
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [desc, setdesc] = useState('')
    const [img, setimg] = useState('')
    const[preference, setprefer]= useState('')
    const [categories, setcategories]=useState()
    const [error, setError] = useState(null)
    const [exchangetype, setexchangetype] = useState('')

    const optionList=[{value:"Electronics", label:"Electronics"},
  {value:"Daily use", label:"Daily use"}
  ]

    function handleSelect(data) {
        setcategories(data);
    }

    const handleSubmit=  (e)=>{
        e.preventDefault()
        //add to the backend part 
        const user_email= user.email
         axios.post('http://localhost:3000/api/Addition/addexchange', {
          user_email, title, desc, img, preference, categories, exchangetype
        }, {
          headers:{
            'Content-Type': 'application/json'  //, 'Authorization': `Bearer ${user.token}`
          }
        }).then((response)=>{
          console.log(response)
          setTitle('')
          setdesc('')
          setprefer('')
          setimg('')
          setError(null)
          setcategories('')
          setexchangetype('')
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
    <form className="exchange" onSubmit={handleSubmit}> 
        <h3>Add a New Product For exchange</h3>

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
      <label>Preference :</label>
      <input 
        type="text"
        onChange={(e) => setprefer(e.target.value)}
        value={preference}
        // className={emptyFields.includes('load') ? 'error' : ''}
      />
      <select value={exchangetype} onChange={e => setexchangetype(e.target.value)}>
        <option>Temporary</option>
        <option>Parmanent</option>
      </select>


      
      <label>img:</label>
      <input 
        type="text"
        onChange={(e) => setimg(e.target.value)}
        value={img}
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