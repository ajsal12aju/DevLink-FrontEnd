import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

function UserCard({user}) {
    console.log(user, "==user==")
const dispatch = useDispatch()
    const handleFeedAction = async (status, userId) =>{
        try {
            const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
        } catch (error) {
            
        }
    }
     
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
  <div className="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src={user?.photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
       {user?.firstName}
        <div className="badge badge-secondary">{user?.lastName}</div>
      </h2>
      <p>{user?.about}</p>
      <div className="card-actions justify-center my-4">
        <button className="btn btn-secondary" onClick={()=> handleFeedAction("ignored",user?._id)}>Ignore</button>
        <button className="btn btn-primary"  onClick={()=> handleFeedAction("interested",user?._id)}>Interested</button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default UserCard
