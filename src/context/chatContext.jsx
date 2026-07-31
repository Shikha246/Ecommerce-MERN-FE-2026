import { createContext, useContext, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your BookStore assistant. Ask me about our books or your orders." },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://ecommerce-mern-be-2026.vercel.app/api/chat/message",
        {
          message: text,
          // send prior turns (excluding the greeting) so the bot has context
          history: messages.slice(1).map((m) => ({ role: m.role, text: m.text })),
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      setMessages((prev) => [...prev, { role: "assistant", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};