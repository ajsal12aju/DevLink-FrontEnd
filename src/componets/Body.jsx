import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import bgImage from "../assets/images/allbg.jpeg";

function Body() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store)=> store.user);
    console.log(userData, "==userData==")
    const fetchUser = async ()=>{
    try {
        const res = await axios.get(BASE_URL + "/profile",{withCredentials:true})
        console.log(res.data, "==res==")
        dispatch(addUser(res.data))

    } catch (error) {
      if(error.status === 401){
            navigate("/login")

      }
        console.log(error)
    }
    }

    useEffect(()=>{
      if(!userData){
  fetchUser()

      }
    },[])
  return (
    <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height:'80%'
      }}>
      <Navbar/>

      <Outlet/>
    </div>
  )
}

export default Body
