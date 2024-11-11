import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import { removeUser } from '../utils/userSlice'

function Navbar() {
      const userDetails = useSelector((state)=> state.user)
      const dispatch = useDispatch()
      const navigate = useNavigate()
   const handleLogout = async () =>{
      try {
        await axios.post(BASE_URL + "/logout", {},{withCredentials:true})
        dispatch(removeUser())
        navigate("/login")
      } catch (error) {
       //Error
      }
   }
  return (
    <div>
      <div className="navbar bg-base-400">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
  </div>
  <div className="flex-none gap-2">
  
    {userDetails && (
 <div className="dropdown dropdown-end mx-5 flex">
    <p className='px-4'>Welcome {userDetails.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={userDetails.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
         <li>
          <Link to="/connections" className="justify-between">
            Connections
            <span className="badge">New</span>
          </Link>
        </li>
          <li>
          <Link to="/requests" className="justify-between">
            Requests
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    )}
   
  </div>
</div>
    </div>
  )
}

export default Navbar
