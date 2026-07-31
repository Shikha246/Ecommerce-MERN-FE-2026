import { useState, useRef, useEffect } from "react";
import { useChat } from "../context/chatContext";
import ReactMarkdown from "react-markdown";
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {isOpen && (
        <div
          style={{
            width: "320px",
            height: "420px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#a87d2e",
              color: "#fff",
              padding: "12px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>BookStore Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                lineHeight: "1",
                cursor: "pointer",
                padding: "0 4px",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.role === "user" ? "right" : "left",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "14px",
                    background: m.role === "user" ? "#a87d2e" : "#f1f1f1",
                    color: m.role === "user" ? "#fff" : "#000",
                    maxWidth: "80%",
                  }}
                >
                   <ReactMarkdown>{m.text}</ReactMarkdown>
                </span>
              </div>
            ))}
            {isLoading && <div style={{ fontStyle: "italic", color: "#888" }}>Typing…</div>}
            <div ref={scrollRef} />
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about books or your order..."
              style={{ flex: 1, border: "none", padding: "10px", outline: "none" }}
            />
            <button onClick={handleSend} style={{ border: "none", background: "#a87d2e", color: "#fff", padding: "0 16px" }}>
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#a87d2e",
          color: "#fff",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        💬
      </button>
    </div>
  );
}

export default ChatWidget;