import React, { useState } from 'react'

const ProfileEdit = () => {
     const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  return (
    <div>
       <div className='flex justify-center my-10' >
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
    </div>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" >Update</button>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default ProfileEdit
