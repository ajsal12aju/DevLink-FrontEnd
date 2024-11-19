// import React, { useState } from 'react'
// import UserCard from './UserCard';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constant';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';

// const ProfileEdit = ({user}) => {
//      const [firstName, setFirstName] = useState(user.firstName)
//   const [lastName, setLastName] = useState(user.lastName);
//     const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
// const [error, setError] = useState('');
// const dispatch = useDispatch()
//     const handleSave = async ()=>{
//         try {
//             const res = await axios.patch(BASE_URL + "/profile/edit",{firstName, lastName, photoUrl}, {withCredentials:true})
//              dispatch(addUser(res?.data?.data))
//         } 
//         catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <>     
// <div className="flex justify-center my-14">
//   <div className="flex justify-center mx-14">
//     <div>
//       <div className="w-[280px] h-[400px] rounded-[20px] bg-[#1b233d]  p-10 shadow-md">
//         <h2 className="text-xl font-semibold text-white mb-4 text-center">Edit Profile</h2>
//         <div>
//           <label className="block mb-4">
//             <span className="text-gray-300 text-sm">First Name</span>
//             <input
//               type="text"
//               onChange={(e) => setFirstName(e.target.value)}
//               value={firstName}
//               placeholder="Enter your first name"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//           <label className="block mb-4">
//             <span className="text-gray-300 text-sm">Last Name</span>
//             <input
//               type="text"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               placeholder="Enter your last name"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//            <label className="block mb-4">
//             <span className="text-gray-300 text-sm">Mobile</span>
//             <input
//               type="text"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               placeholder="Enter your last name"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//           <label className="block mb-4">
//             <span className="text-gray-300 text-sm">Age</span>
//             <input
//               type="text"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               placeholder="Enter your last name"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//            <label className="block mb-4">
//             <span className="text-gray-300 text-sm">About</span>
//             <input
//               type="text"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               placeholder="Enter your last name"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//              <label className="block mb-4">
//             <span className="text-gray-300 text-sm">Skills</span>
//             <input
//               type="text"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               placeholder="Enter your last name"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//           <label className="block mb-4">
//             <span className="text-gray-300 text-sm">Photo URL</span>
//             <input
//               type="text"
//               onChange={(e) => setPhotoUrl(e.target.value)}
//               value={photoUrl}
//               placeholder="Enter the photo URL"
//               className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
//             />
//           </label>
//         </div>
//         <div className="flex justify-center mt-8">
//           <button
//             className="w-full py-2 rounded-md bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition-colors duration-300"
//             onClick={handleSave}
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//       <UserCard user={{firstName, lastName, photoUrl}} />

// </div>

//     </>

//   )
// }

// export default ProfileEdit

import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const ProfileEdit = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [mobile, setMobile] = useState(user.mobile || '');
  const [age, setAge] = useState(user.age || '');
  const [about, setAbout] = useState(user.about || '');
  const [skills, setSkills] = useState(user.skills?.join(", ") || ""); 
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  // console.log(skills:[skills])

   const handleSave = async () => {
    try {
      const skillsArray = skills.split(",").map((skill) => skill.trim()).filter(Boolean);

      const payload = {
        firstName,
        lastName,
        photoUrl,
        mobile,
        age,
        about,
        skills: skillsArray,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-14">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mx-10">
          {/* Form Container */}
          <div className="w-[320px] lg:w-[400px] p-8 bg-[#1b233d] rounded-[20px] shadow-md">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">Edit Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-300 text-sm">First Name</span>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="Enter first name"
                  className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-300 text-sm">Last Name</span>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Enter last name"
                  className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-300 text-sm">Mobile</span>
                <input
                  type="text"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  placeholder="Enter mobile number"
                  className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-300 text-sm">Age</span>
                <input
                  type="text"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  placeholder="Enter age"
                  className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                />
              </label>
              <label className="block col-span-2">
                <span className="text-gray-300 text-sm">About</span>
                <input
                  type="text"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  placeholder="Enter details about yourself"
                  className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                />
              </label>
                       <label className="block col-span-2">
            <span className="text-gray-300 text-sm">Skills</span>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Enter skills (comma-separated)"
              className="w-full mt-1 px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:ring focus:ring-blue-500 focus:outline-none"
            />
          </label>

              <label className="block col-span-2">
                <span className="text-gray-300 text-sm">Photo URL</span>
                <input
                  type="text"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  value={photoUrl}
                  placeholder="Enter photo URL"
                  className="mt-1 w-full px-4 py-2 bg-[#2a324a] text-white rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
                />
              </label>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="w-full py-2 rounded-md bg-[#435996] text-white shadow-lg hover:bg-[#5b668b] focus:ring focus:ring-blue-500 transition-colors duration-300"
                onClick={handleSave}
              >
                Update
              </button>
            </div>
          </div>

          {/* User Card */}
          <UserCard user={{ firstName, lastName, photoUrl, mobile, age, about, skills, isProfile:true }} />
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;

