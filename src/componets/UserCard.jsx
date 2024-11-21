import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useSwipeable } from "react-swipeable";

function UserCard({ user }) {
  const dispatch = useDispatch();

  // Track the swipe state (for animating the swipe)
  const [swipe, setSwipe] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false); // Track if the card has been swiped

  // Handle feed actions for Ignore and Interested
  const handleFeedAction = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      setIsSwiped(true); // Mark that the card has been swiped
      setSwipe(0); // Reset swipe to center after the action
    } catch (error) {
      console.error("Error handling feed action", error);
    }
  };

  // Swipe handlers for left and right
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      handleFeedAction("ignored", user?._id); // Ignore on swipe left
      setSwipe(-100); // Move the card to the left
    },
    onSwipedRight: () => {
      handleFeedAction("interested", user?._id); // Interested on swipe right
      setSwipe(100); // Move the card to the right
    },
    onSwiping: (e) => {
      setSwipe(e.deltaX); // Track the drag movement to animate
    },
    trackMouse: true, // Allow mouse tracking to enable swiping on desktop as well
    preventDefaultTouchmoveEvent: true, // Prevent default touchmove behavior
  });

  // Apply smooth transition and reset to center when swipe action is completed
  const getCardStyle = () => {
    if (isSwiped) {
      return {
        transform: `translateX(${swipe}px)`,
        transition: "transform 0.3s ease-out", // Smooth transition after swipe completion
      };
    }
    return {
      transform: `translateX(${swipe}px)`,
      transition: swipe === 0 ? "transform 0.3s ease" : "none", // No transition while swiping
    };
  };

  return (
    <div
      className="flex items-center justify-center"
      {...swipeHandlers} // Spread swipe handlers here
      style={getCardStyle()}
    >
      <div className="w-[300px] h-[480px] rounded-[20px] bg-[#1b233d] p-6 shadow-md hover:scale-105 transition-transform duration-300">
        {/* User Profile Picture */}
        <div
          className="h-[250px] w-full rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${user?.photoUrl || "/placeholder.png"})` }}
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
