import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const [email, setEmailId] = useState('')
  const [password, setPassword] = useState('')

  const dispatch =  useDispatch()
  const userDetails = useSelector((state)=> state.user)
console.log(userDetails, "==userDetails==")
  const handleLogin = async ()=>{
    try {
        const res = await axios.post("http://localhost:3000/login", {
            email,
            password
        },{withCredentials:true})
        console.log(res)
        dispatch(addUser(res.userData))
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='flex justify-center my-10' >
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Welcome To Login</h2>
    <div>
 
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Email</span>
  </div>
  <input type="text" onChange={(e)=> setEmailId(e.target.value)} value={email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />

</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">password</span>
  </div>
  <input type="text" value={password}  onChange={(e)=> setPassword(e.target.value)}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />

</label>
    </div>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
