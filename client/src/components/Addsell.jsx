import { useState } from "react"
import Select from "react-select";

const Addsell= ()=>{
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

    const handleSubmit = async (e) => {
        e.preventDefault()
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
export default Addsell