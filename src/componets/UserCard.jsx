// import axios from "axios";
// import React from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";

// function UserCard({ user }) {
//   console.log(user, "==user==");
//   const dispatch = useDispatch();
//   const handleFeedAction = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed(userId));
//     } catch (error) {}
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center">
//         <div className="w-[280px] h-[400px] rounded-[20px] bg-[#1b233d] p-2.5 overflow-hidden shadow-md hover:scale-105 transition-transform duration-500 ease-in-out">
//           <div
//             className="h-[250px] rounded-[15px] flex flex-col relative bg-cover bg-center"
//             style={{ backgroundImage: `url(${user?.photoUrl})` }}
//           ></div>
//           <div className="bottom-section mt-5 text-center">
//             <span className="text-white text-lg font-semibold">
//               {user?.firstName + " " + user?.lastName}
//             </span>
//             <p className="text-white">{user?.about}</p>
//             {!user.isProfile && (
//               <div className="flex justify-center mt-7 space-x-4">
//                 <button
//                   className="w-32 py-2 rounded-md bg-[#3a4b7a] text-white shadow-lg hover:bg-[#4c5d94] focus:ring focus:ring-blue-500"
//                   onClick={() => handleFeedAction("ignored", user?._id)}
//                 >
//                   Ignore
//                 </button> 
//                 <button
//                   className="w-32 py-2 rounded-md bg-[#5a9375] text-white shadow-lg hover:bg-[#6ba88b] focus:ring focus:ring-green-500"
//                   onClick={() => handleFeedAction("interested", user?._id)}
//                 >
//                   Interested
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserCard;

import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const dispatch = useDispatch();

  const handleFeedAction = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error handling feed action", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[300px] h-[440px] rounded-[20px] bg-[#1b233d] p-6 shadow-md hover:scale-105 transition-transform duration-300">
        {/* User Profile Picture */}
        <div
          className="h-[250px] w-full rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${user?.photoUrl || '/placeholder.png'})` }}
        ></div>

        {/* User Details Section */}
        <div className="mt-5 text-center text-white">
          <h3 className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h3>
          {user?.about && <p className="text-gray-400 mt-2">{user.about}</p>}

          {/* Additional User Info */}
          <div className="mt-4 text-sm space-y-2">
            {user?.mobile && (
              <div>
                <span className="text-gray-500">Mobile:</span> {user.mobile}
              </div>
            )}
            {user?.age && (
              <div>
                <span className="text-gray-500">Age:</span> {user.age}
              </div>
            )}
            {user?.skills && (
              <div>
                <span className="text-gray-500">Skills:</span>{" "}
                <span className="text-blue-400">{user.skills}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {!user?.isProfile && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              className="w-32 py-2 rounded-md bg-[#3a4b7a] text-white shadow-lg hover:bg-[#4c5d94] transition duration-300"
              onClick={() => handleFeedAction("ignored", user?._id)}
            >
              Ignore
            </button>
            <button
              className="w-32 py-2 rounded-md bg-[#5a9375] text-white shadow-lg hover:bg-[#6ba88b] transition duration-300"
              onClick={() => handleFeedAction("interested", user?._id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;

