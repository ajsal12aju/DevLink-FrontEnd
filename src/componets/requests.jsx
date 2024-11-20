import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestsSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/recieved', {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + '/request/review/' + status + '/' + _id, {}, {
        withCredentials: true,
      });
      dispatch(removeRequests(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests?.length) return <h1 className="text-center text-white mt-10">No requests</h1>;

  return (
    <div className="bg-[#1b233d] min-h-screen p-10">
      <h1 className="text-center text-white text-3xl font-bold mb-10">Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-[#2a324b] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={req?.fromUserId?.photoUrl || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{req?.fromUserId?.firstName} {req?.fromUserId?.lastName}</h2>
                <p className="text-sm text-gray-400">{req?.fromUserId?.email}</p>
              </div>
            </div>
            <p className="text-sm mb-6">{req?.fromUserId?.about || 'No additional information provided.'}</p>
            <div className="flex justify-center gap-4">
              <button
              className="w-32 py-2 rounded-md bg-[#3a4b7a] text-white shadow-lg hover:bg-[#4c5d94] transition duration-300"
                onClick={() => reviewRequest('rejected', req._id)}
              >
                Reject
              </button>
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition-colors"
                onClick={() => reviewRequest('accepted', req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
