import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

function Feed() {
   const dispatch = useDispatch()
   const feeds = useSelector((state) => state.feed)
    console.log(feeds, "==feeds==")
   const fetchFeeds = async ()=> {
    try {
      const feeds = await axios.get(BASE_URL + "/feed",{withCredentials:true})
      console.log(feeds, "==feeds==")
      dispatch(addFeed(feeds))
    } catch (error) {
      // error
    } 
   }
   useEffect(()=>{
if(feeds) return
fetchFeeds()
   },[])



  return  feeds && (
    <div>
      <UserCard user={feeds?.data[0]}/>
    </div>
  )
}

export default Feed
