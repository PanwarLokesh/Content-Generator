import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  function handleInput(e){
    setMessage(e.target.value)
  }
  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      console.log("Message saved:", message);
      setMessage(""); 
    }
  }
  return (
    <div className="container">
      <div className="chatbox">
        <div className="chat">
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
          <span className="chat-message">Hello</span>
        </div>
        <div className="message">
          <textarea value={message} onChange={handleInput} 
          onKeyDown={handleKeyPress}  placeholder="Type a message..." /></div>
      </div>
      
    </div>
  );
};

export default Chat;
