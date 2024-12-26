import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import MarkdownRenderer from "./MarkDown";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      const restoredChats = parsedChats.map((chat) => ({
        user: chat.user,
        bot: <MarkdownRenderer markdownText={chat.bot} />, 
      }));
      console.log("restored chat",restoredChats);
      console.log("rendering.............");
      setChats(restoredChats);
    }
  }, []);

  // Save chat history to localStorage whenever chats change
  useEffect(() => {
    const serializedChats = chats.map((chat) => ({
      user: chat.user,
      bot: chat.bot ? chat.bot.props.markdownText : "", 
    }));
    console.log("Saved chats:", serializedChats);
    localStorage.setItem("chatHistory", JSON.stringify(serializedChats));
  }, [chats]);
  async function getText() {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() === "") {
        return;
      }
      setChats([...chats, { user: prompt, bot: null }]);
      getText();
      setPrompt("");
    }
  }

  return (
    <div className="container">
      <div className="chatbox">
        <div className="chat">
          {chats.length > 0 ? null : (
            <h1 className="Starter">What can I help with?</h1>
          )}
          {chats.map((chat, index) => (
            <div className="box" key={index}>
              {chat.user && (
                <span className="chat-message-user">{chat.user}</span>
              )}
              {chat.bot && <div className="chat-message-bot">{chat.bot}</div>}
            </div>
          ))}
        </div>
        <div className="message">
          <textarea
            value={prompt}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            placeholder={loading ? "Generating..." : "Ask me anything..."}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
