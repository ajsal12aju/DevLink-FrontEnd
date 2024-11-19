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
      <div className="flex items-center justify-center">
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
  <div className="w-[280px] h-[400px] rounded-[20px] bg-[#1b233d] p-2.5 overflow-hidden shadow-md hover:scale-105 transition-transform duration-500 ease-in-out">
  <div
  className="h-[250px] rounded-[15px] flex flex-col relative bg-cover bg-center"
  style={{ backgroundImage: `url(${user?.photoUrl})` }}
>
    
  </div>
  <div className="bottom-section mt-5 text-center">
    <span className="text-white text-lg font-semibold">{user?.firstName + " " + user?.lastName}</span>
          <p className='text-white'>{user?.about}</p>

   <div className="flex justify-center mt-7 space-x-4">
  <button
    className="w-32 py-2 rounded-md bg-[#3a4b7a] text-white shadow-lg hover:bg-[#4c5d94] focus:ring focus:ring-blue-500"
    onClick={() => handleFeedAction("ignored", user?._id)}
  >
    Ignore
  </button>
  <button
    className="w-32 py-2 rounded-md bg-[#5a9375] text-white shadow-lg hover:bg-[#6ba88b] focus:ring focus:ring-green-500"
    onClick={() => handleFeedAction("interested", user?._id)}
  >
    Interested
  </button>
</div>
  </div>
</div>

</div>

    </>
  )
}

export default UserCard
