import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constant'
import { addFeed } from '../utils/feedSlice'

function Feed() {
   const dispatch = useDispatch()

   const fetchFeeds = async ()=> {
    try {
      const feeds = await axios.get(BASE_URL + "/feed")
      dispatch(addFeed(feeds))
    } catch (error) {
      // error
    }
   }

  return (
    <div>
      Feed
    </div>
  )
}

export default Feed
