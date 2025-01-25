import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3003"); // Backend URL

const ChatPage = () => {
  const location = useLocation();
  const selectedConnection = location.state?.selectedConnection;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.user?._id); // Logged-in user ID

  useEffect(() => {
    if (!userId || !selectedConnection?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3003/chat/${userId}/${selectedConnection?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const roomId = [userId, selectedConnection?._id].sort().join("-");

    fetchMessages();

    // Join the chat room
    socket.emit("joinRoom", roomId);

    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    // Listen for incoming messages
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup: Remove the listener and leave the room
    return () => {
      socket.off("receiveMessage", handleReceiveMessage); // Remove specific listener
      socket.emit("leaveRoom", roomId); // Leave the chat room
    };
  }, [userId, selectedConnection?._id]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const roomId = [userId, selectedConnection?._id].sort().join("-");
      const message = {
        senderId: userId,
        receiverId: selectedConnection?._id,
        message: newMessage,
        roomId,
      };

      // Emit the message to the server
      socket.emit("sendMessage", message);

      // Update local state for immediate feedback
    //   setMessages((prev) => [
    //     ...prev,
    //     { ...message, timestamp: new Date().toISOString() },
    //   ]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h2 className="text-lg font-semibold">
          Chat with {selectedConnection?.firstName || "User"}
        </h2>
      </header>
      <main className="flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm max-w-xs ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-900 self-start"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="p-4 bg-white shadow-lg flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
