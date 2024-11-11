import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((state)=> state.connection)
    console.log(connections, "=connections===")
    const fetchConnections = async ()=>{
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials:true})
           console.log(res)
           dispatch(addConnections(res?.data?.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchConnections()
    })
    if(connections?.length === 0 ) return <h1>no connections</h1>
  return (
    <div className='text-center my-10'>
      <h1>Connections</h1>
      {connections?.map((connections)=>(
        <h1>{connections.firstName}</h1>
      ))}
    </div>
  )
}

export default Connections
