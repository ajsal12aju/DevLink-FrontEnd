import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constant";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0)
    return (
      <h1 className="text-center text-white text-xl mt-10">No connections found</h1>
    );

  return (
    <div className="min-h-screen bg-[#1b233d] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* <h1 className="text-4xl font-bold text-white text-center mb-8">
          Connections
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <div
              key={connection.email}
              className="bg-[#2a3459] rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:bg-[#3b466e] transition duration-300"
            >
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-[#596a9e]"
              />
              <h2 className="text-lg font-semibold text-white">
                {`${connection.firstName} ${connection.lastName}`}
              </h2>
              <p className="text-gray-300 text-sm italic mt-1">
                {connection.about || "This user has no about section."}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                <strong>Age:</strong> {connection.age}
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Email:</strong> {connection.email}
              </p>
              {connection.skills?.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-gray-300 font-medium">Skills:</h3>
                  <ul className="flex flex-wrap justify-center mt-2">
                    {connection.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-200 bg-[#3a4670] px-3 py-1 rounded-full m-1"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-2">No skills added yet.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
