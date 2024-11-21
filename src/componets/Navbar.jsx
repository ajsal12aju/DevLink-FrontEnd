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
<nav className="bg-slate-900 border-gray-200 py-2.5 dark:bg-gray-800 text-white">
  <div className="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
    {/* Logo Section */}
    <Link to="/" className="flex items-center">
      <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">DevLink</span>
    </Link>

    {/* Right Section */}
    <div className="flex items-center lg:order-2">
      {userDetails && (
        <div className="hidden mr-2 sm:inline-block">
          <span className="text-lg text-white dark:text-gray-400">Welcome, {userDetails.firstName}</span>
        </div>
      )}

      {/* Profile Dropdown */}
      {userDetails && (
        <div className="dropdown dropdown-end mx-5 bg-slate-900 border-gray-200 py-2.5 dark:bg-gray-800 text-white">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={userDetails.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-900 border-gray-200 py-2.5 dark:bg-gray-800 text-white text-lg rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            <li className='hover:bg-gray-700 rounded-box'>
              <Link to="/profile" className="justify-between text-lg">
                Profile
              </Link>
            </li>
            <li className='hover:bg-gray-700 rounded-box'>
              <a className='text-lg' onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <button
        data-collapse-toggle="mobile-menu-2"
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu-2"
        aria-expanded="true"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        <svg
          className="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>

    {/* Navigation Links */}
    {userDetails && (
  <div
      className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
      id="mobile-menu-2"
    >
      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <li>
          <Link
            to="/"
            className="block py-2 pl-4 pr-4 text-lg text-white rounded lg:bg-transparent lg:text-white-700 dark:text-white"
            aria-current="page"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/connections"
            className="block py-2 pl-4 pr-4 text-lg text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
          >
            Connections
          </Link>
        </li>
        <li>
          <Link
            to="/requests"
            className="block py-2 pl-4 pr-4 text-lg text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
          >
            Requests
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 pl-4 pr-4 text-lg text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white  dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
    )}
      
  </div>
</nav>

    </div>
  )
}

export default Navbar
