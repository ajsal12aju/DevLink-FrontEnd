import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


//  <div className="card bg-base-100 w-96 shadow-xl">
  //   <figure>
  //     <img
  //       src={user?.photoUrl}
  //       alt="Shoes" />
  //   </figure>
  //   <div className="card-body">
  //     <h2 className="card-title">
  //      {user?.firstName}
  //       <div className="badge badge-secondary">{user?.lastName}</div>
  //     </h2>
  //     <p>{user?.about}</p>
  //     <div className="card-actions justify-center my-4">
  //       <button className="btn btn-secondary" onClick={()=> handleFeedAction("ignored",user?._id)}>Ignore</button>
  //       <button className="btn btn-primary"  onClick={()=> handleFeedAction("interested",user?._id)}>Interested</button>
  //     </div>
  //   </div>
  // </div>