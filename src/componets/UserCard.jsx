import React from 'react'

function UserCard({user}) {
    console.log(user, "==user==")
     
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
      <div className="card-actions justify-end">
        <button className="badge badge-outline">Ignore</button>
        <button className="badge badge-outline">Interested</button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default UserCard
