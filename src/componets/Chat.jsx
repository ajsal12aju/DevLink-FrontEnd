import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3003"); // Backend URL

const ChatPage = ({ selectedConnection }) => {

    console.log(selectedConnection, "==selected===")
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.user?._id); // Logged-in user ID

  useEffect(() => {
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

    fetchMessages();

    // Notify server about logged-in user
    socket.emit("joinRoom", selectedConnection?._id);

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, selectedConnection?._id]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        senderId: userId,
        receiverId: selectedConnection?._id,
        message: newMessage,
      };

      // Emit the message via socket
      socket.emit("sendMessage", message);

      // Add the message locally
      setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h2>Chat with {selectedConnection?.firstName || "User"}</h2>
      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === userId ? "sent" : "received"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
