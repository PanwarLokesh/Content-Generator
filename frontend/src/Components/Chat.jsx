
import React, { useState, useEffect, createContext, useContext } from "react";
import "./Chat.css";
import axios from "axios";
import MarkdownRenderer from "./MarkDown";


const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      const restoredChats = parsedChats.map((chat) => ({
        user: chat.user,
        bot: <MarkdownRenderer markdownText={chat.bot} />,
      }));
      setChats(restoredChats);
    }
  }, []);

  useEffect(() => {
    const serializedChats = chats.map((chat) => ({
      user: chat.user,
      bot: chat.bot ? chat.bot.props.markdownText : "",
    }));
    localStorage.setItem("chatHistory", JSON.stringify(serializedChats));
  }, [chats]);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

const Chat = () => {
  const { chats, setChats } = useContext(ChatContext);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

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

export { Chat, ChatProvider };