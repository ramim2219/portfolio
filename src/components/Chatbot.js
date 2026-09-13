'use client';

import { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the AI assistant for this portfolio. Ask me about projects, skills, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        className={`chatbot-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <i className="fas fa-times" />
        ) : (
          <i className="fas fa-comment-dots" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="AI assistant">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="chatbot-dot" />
              AI Assistant
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <i className="fas fa-times" />
            </button>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatbot-msg ${m.role === "user" ? "is-user" : "is-bot"}`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg is-bot chatbot-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <textarea
              rows={1}
              placeholder="Ask me anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Floating action button — bottom right */
        .chatbot-fab {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: var(--text, #111);
          color: var(--bg, #fff);
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: transform 0.25s ease, background 0.25s ease,
            color 0.25s ease;
        }
        .chatbot-fab:hover {
          transform: translateY(-3px) scale(1.05);
        }
        .chatbot-fab.is-open {
          background: #ff9800;
          color: #111;
        }

        /* Chat panel anchored above the FAB */
        .chatbot-panel {
          position: fixed;
          right: 24px;
          bottom: 92px;
          z-index: 9999;
          width: 360px;
          max-width: calc(100vw - 32px);
          height: 480px;
          max-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);
          animation: chatbot-pop 0.22s ease-out;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        @keyframes chatbot-pop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: var(--text, #111);
          color: var(--bg, #fff);
          transition: background 0.25s ease, color 0.25s ease;
        }
        .chatbot-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.4px;
        }
        .chatbot-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4caf50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.25);
        }
        .chatbot-close {
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          font-size: 14px;
          opacity: 0.8;
        }
        .chatbot-close:hover {
          opacity: 1;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          background: var(--bg-soft, #f7f7f8);
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: background 0.25s ease;
        }
        .chatbot-msg {
          max-width: 85%;
          padding: 10px 12px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.45;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .chatbot-msg.is-bot {
          align-self: flex-start;
          background: var(--card-bg, #fff);
          color: var(--text, #111);
          border: 1px solid var(--border-soft, rgba(0, 0, 0, 0.08));
          border-bottom-left-radius: 4px;
          transition: background 0.25s ease, color 0.25s ease,
            border-color 0.25s ease;
        }
        .chatbot-msg.is-user {
          align-self: flex-end;
          background: var(--text, #111);
          color: var(--bg, #fff);
          border-bottom-right-radius: 4px;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .chatbot-typing {
          display: inline-flex;
          gap: 4px;
          padding: 12px 14px;
        }
        .chatbot-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted, #999);
          animation: chatbot-bounce 1.2s infinite ease-in-out;
        }
        .chatbot-typing span:nth-child(2) {
          animation-delay: 0.15s;
        }
        .chatbot-typing span:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes chatbot-bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .chatbot-input {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 10px;
          background: var(--card-bg, #fff);
          border-top: 1px solid var(--border-soft, rgba(0, 0, 0, 0.08));
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .chatbot-input textarea {
          flex: 1;
          resize: none;
          border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          max-height: 90px;
          background: var(--bg-soft, #fff);
          color: var(--text, #111);
          transition: background 0.25s ease, color 0.25s ease,
            border-color 0.25s ease;
        }
        .chatbot-input textarea::placeholder {
          color: var(--text-muted, #999);
        }
        .chatbot-input textarea:focus {
          border-color: var(--accent, #111);
        }
        .chatbot-input button {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background: var(--text, #111);
          color: var(--bg, #fff);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .chatbot-input button:hover:not(:disabled) {
          background: #ff9800;
          color: #111;
        }
        .chatbot-input button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default Chatbot;