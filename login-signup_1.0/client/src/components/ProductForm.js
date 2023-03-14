import { useState } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ProducttForm = () => {
  const { dispatch } = useProductsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [desc, setdesc] = useState('')
  const [img, setimg] = useState('')
  const[price, setprice]= useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {title, desc, img, price}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setdesc('')
      setprice('')
      setimg('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      <label>Product Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>price :</label>
      <input 
        type="number"
        onChange={(e) => setprice(e.target.value)}
        value={price}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>desc:</label>
      <input 
        type="text"
        onChange={(e) => setdesc(e.target.value)}
        value={desc}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>img:</label>
      <input 
        type="text"
        onChange={(e) => setimg(e.target.value)}
        value={img}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProducttForm