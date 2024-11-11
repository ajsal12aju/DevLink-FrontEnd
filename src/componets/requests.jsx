import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestsSlice'

const Requests = () => {
    
    const dispatch = useDispatch()
    const requests = useSelector((state)=> state.connection)
    console.log(requests, "=requests===")
    const fetchRequests = async ()=>{
        try {
            const res = await axios.get(BASE_URL + "/user/requests", {withCredentials:true})
           console.log(res)
           dispatch(addRequests(res?.data?.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchRequests()
    },[])
    if(requests?.length === 0 ) return <h1>no requests</h1>

  return (
    <div>
      requests
    </div>
  )
}

export default Requests
