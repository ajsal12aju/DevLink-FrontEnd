import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const ProfileEdit = ({user}) => {
     const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
const [error, setError] = useState('');
const dispatch = useDispatch()
    const handleSave = async ()=>{
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",{firstName, lastName, photoUrl}, {withCredentials:true})
             dispatch(addUser(res?.data?.data))
        } 
        catch (error) {
            setError(error.message)
        }
    }

  return (
    <>   
    <div className='flex justify-center my-10'>
     <div>
       <div className='flex justify-center mx-10' >
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Edit Profile</h2>
    <div>
 
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" onChange={(e)=> setFirstName(e.target.value)} value={firstName} placeholder="Type here" className="input input-bordered w-full max-w-xs" />

</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input type="text" value={lastName}  onChange={(e)=> setLastName(e.target.value)}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Photo URL</span>
  </div>
  <input type="text" value={photoUrl}  onChange={(e)=> setPhotoUrl(e.target.value)}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</label>
    </div>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={handleSave}>Update</button>
    </div>
  </div>
</div>
    </div>
    </div>
    <UserCard user={{firstName, lastName, photoUrl}} />
    
</div>
    </>

  )
}

export default ProfileEdit
