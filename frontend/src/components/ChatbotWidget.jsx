import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ChatbotWidget.module.css';

const API_BASE = 'http://127.0.0.1:8000';

const ChatbotWidget = ({ analysis = {}, weather = {} }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Greeting message
      const greeting = {
        sender: 'ai',
        text: "Hello! I'm GridSense AI. I analyze your microgrid data and help optimize your energy usage. Ask me anything about your energy demand, solar potential, or cost savings.",
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const tempInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Prepare energy_context from props
      const energyContext = {
        predicted_energy: analysis.predicted_energy || 0,
        solar_potential: analysis.solar_potential || 0,
        efficiency_score: analysis.efficiency_score || 0,
        temperature: weather.temperature || analysis.temperature || 0,
        humidity: weather.humidity || analysis.humidity || 0,
        cloud_cover: weather.cloud_cover || analysis.cloud_cover || 0,
        pressure: weather.pressure || analysis.pressure || 0,
        demand_level: analysis.demand_level || 'MEDIUM',
        solar_level: analysis.solar_level || 'NONE'
      };

      const response = await axios.post(`${API_BASE}/chat`, {
        message: tempInput,
        energy_context: energyContext
      });

      const aiMessage = {
        sender: 'ai',
        text: response.data.reply,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1500); // Simulate typing delay
    } catch (error) {
      const errorMessage = {
        sender: 'ai',
        text: 'Sorry, I encountered an error processing your request. Please try again or refresh the dashboard.',
        timestamp: new Date()
      };
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className={styles.floatingButton}
          onClick={() => setIsOpen(true)}
          aria-label="Open GridSense AI Chatbot"
        >
          <div className={styles.icon}>🤖</div>
          <span className={styles.badge}>AI</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div>
              <h3 className={styles.title}>GridSense AI</h3>
              <p className={styles.subtitle}>Your Energy Intelligence Assistant</p>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
              >
                <div className={styles.bubble}>
                  <p>{message.text}</p>
                  <span className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.aiMessage}`}>
                <div className={styles.bubble}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message GridSense AI..."
              className={styles.input}
              rows="1"
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isTyping}
              className={styles.sendButton}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

