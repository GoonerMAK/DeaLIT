import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkpassword, setCheckPassword] = useState('')
  const[username, setUsername] = useState('')
  const[Phone, setPhone] = useState('')
  const[NID, setNID] = useState('')

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, Phone, NID,email, password, checkpassword)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>User name:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Phone No:</label>
      <input 
        type="number" 
        onChange={(e) => setPhone(e.target.value)} 
        value={Phone} 
      />
      <label>NID No:</label>
      <input 
        type="number" 
        onChange={(e) => setNID(e.target.value)} 
        value={NID} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>Check Password:</label>
      <input 
        type="password" 
        onChange={(e) => setCheckPassword(e.target.value)} 
        value={checkpassword} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup