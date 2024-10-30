import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

function Body() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchUser = async ()=>{
    try {
        const res = await axios.get(BASE_URL + "/profile",{withCredentials:true})
        console.log(res.data, "==res==")
        dispatch(addUser(res.data))

    } catch (error) {
            navigate("/login")

        console.log(error)
    }
    }

    useEffect(()=>{
  fetchUser()
    },[])
  return (
    <div>
      <Navbar/>

      <Outlet/>
    </div>
  )
}

export default Body
