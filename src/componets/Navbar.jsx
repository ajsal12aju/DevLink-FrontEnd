import React from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
      const userDetails = useSelector((state)=> state.user)

  return (
    <div>
      <div className="navbar bg-base-400">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
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
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
    )}
   
  </div>
</div>
    </div>
  )
}

export default Navbar
