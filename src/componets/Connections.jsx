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

  if (connections?.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold mb-5">Connections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {connections.map((connection) => (
          <div
            key={connection.email}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
          >
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName} ${connection.lastName}`}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold">{`${connection.firstName} ${connection.lastName}`}</h2>
            <p className="text-gray-600 text-sm italic">{connection.about || "This user has no about section."}</p>
            <p className="text-gray-700 text-sm mt-2">
              <strong>Age:</strong> {connection.age}
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Email:</strong> {connection.email}
            </p>
            {connection.skills?.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-gray-800 font-medium">Skills:</h3>
                <ul className="text-gray-600 text-sm">
                  {connection.skills.map((skill, index) => (
                    <li key={index} className="inline-block px-2 py-1 bg-gray-100 rounded-full m-1">
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
  );
};

export default Connections;
