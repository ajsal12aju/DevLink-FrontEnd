import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestsSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'

const Requests = () => {
    
    const dispatch = useDispatch()
    const requests = useSelector((state)=> state.requests)
    console.log(requests, "=requests===")
    const fetchRequests = async ()=>{
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", {withCredentials:true})
           console.log(res)
           dispatch(addRequests(res?.data?.data))
        } catch (error) {
            console.log(error)
        }
    }
      const reviewRequest = async (status, _id)=>{
        try {
            const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+_id,{}, {withCredentials:true})
           console.log(res, "==res==")

           dispatch(removeRequests(_id))
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
       <div className='text-center my-10'>
      <h1>Requasts</h1>
      {requests?.map((req)=>(
        <>
        <h1>{req.fromUserId.firstName}</h1>
     
    <div className="card-actions justify-center my-4">
        <button className="btn btn-secondary" onClick={()=> reviewRequest("rejected",req._id )}>Reject</button>
        <button className="btn btn-primary" onClick={()=> reviewRequest("accepted",req._id )}>Accept</button>
      </div>
      </>
       ))}
       </div>
    </div>
  )
}

export default Requests
