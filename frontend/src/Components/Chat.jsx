import React, { useState } from "react";
import "./Chat.css";
import axios from "axios";
import MarkdownRenderer from "./MarkDown";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);

  async function getText() {
    try {
      const response = await axios.post("http://localhost:3000/chat", {
        prompt,
      });
      setChats([
        ...chats,
        {
          user: prompt,
          bot: <MarkdownRenderer markdownText={response.data.message} />,
        },
      ]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  }

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setChats([...chats, { user: prompt }]);
      getText();
      setPrompt("");
    }
  }

  return (
    <div className="container">
      <div className="chatbox">
        {/* <div className="chat">
          {chats.length > 0 &&
            chats.map((chat, index) => (
              <div  key={index}>
                {chat.user && <span className="chat-message">{chat.user}</span>}
                {chat.bot && <div>{chat.bot}</div>}
              </div>
            ))}
        </div> */}
        <div className="chat">
          {chats.map((chat, index) => (
            <div className="box" key={index}>
              {chat.user && (
                <span className="chat-message-user">{chat.user}</span>
              )}
              {chat.bot && <div className=".chat-message-bot">{chat.bot}</div>}
            </div>
          ))}
        </div>
        <div className="message">
          <textarea
            value={prompt}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
