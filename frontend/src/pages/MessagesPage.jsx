import React, { useState, useEffect, useRef } from 'react';
import { Send, LucideCircleEllipsis, ChevronLeft, Check, CheckCheck, PencilLine } from 'lucide-react';
import './MessagesPage.css';

const MessagesPage = () => {
  // Mock data
  const conversations = [
    { id: 1, name: 'Alex Johnson', lastMessage: 'See you tomorrow!', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Marketing Team', lastMessage: 'New campaign approved', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Sarah Miller', lastMessage: 'Thanks for your help!', time: 'Wed', unread: 5 },
    { id: 4, name: 'David Wilson', lastMessage: 'Meeting notes attached', time: 'Tue', unread: 0 },
  ];

  const messages = {
    1: [
      { id: 1, text: 'Hey there! How are you doing?', sender: 'them', time: '10:15 AM', status: 'read' },
      { id: 2, text: "I'm good! Just working on the project", sender: 'me', time: '10:18 AM', status: 'read' },
      { id: 3, text: 'Want to grab lunch tomorrow?', sender: 'them', time: '10:20 AM', status: 'read' },
      { id: 4, text: 'Sure, 12:30 at the usual place?', sender: 'me', time: '10:22 AM', status: 'delivered' },
      { id: 5, text: 'Perfect! See you tomorrow!', sender: 'them', time: '10:30 AM', status: 'read' },
    ],
    2: [
      { id: 1, text: 'The new campaign has been approved', sender: 'them', time: '3:45 PM', status: 'read' },
      { id: 2, text: "Great news! I'll start implementation", sender: 'me', time: '4:20 PM', status: 'read' },
    ],
  };

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-close conversation list on mobile when screen is large
      if (window.innerWidth >= 768 && selectedConversation) {
        setSelectedConversation(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedConversation]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    // In a real app, this would send to a backend
    setMessageInput('');
    setIsTyping(true);

    // Simulate typing indicator and reply
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isMobile = windowWidth < 768;

  return (
      <div className="messages-page">
        {/* Conversation List - Always visible on desktop, conditionally on mobile */}
        <div className={`conversation-list ${isMobile && selectedConversation ? 'hidden' : ''}`}>
          <div className="list-header">
            <h2>Messages</h2>
            <button className="icon-button">
              <PencilLine size={20} />
            </button>
          </div>

          <div className="conversation-search">
            <input type="text" placeholder="Search conversations..." />
          </div>

          <div className="conversations">
            {conversations.map(conv => (
                <div
                    key={conv.id}
                    className={`conversation ${selectedConversation === conv.id ? 'active' : ''}`}
                    onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="avatar"></div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <h3>{conv.name}</h3>
                      <span className="time">{conv.time}</span>
                    </div>
                    <p className="last-message">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
                </div>
            ))}
          </div>
        </div>

        {/* Chat Area - Conditionally shown */}
        {selectedConversation ? (
            <div className="chat-area">
              <div className="chat-header">
                {isMobile && (
                    <button className="back-button" onClick={() => setSelectedConversation(null)}>
                      <ChevronLeft size={24} />
                    </button>
                )}
                <div className="chat-info">
                  <div className="avatar"></div>
                  <h2>{conversations.find(c => c.id === selectedConversation)?.name}</h2>
                </div>
                <button className="icon-button">
                  <LucideCircleEllipsis size={20} />
                </button>
              </div>

              <div className="messages-container">
                {messages[selectedConversation]?.map(msg => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-content">
                        <p>{msg.text}</p>
                        <div className="message-meta">
                          <span className="time">{msg.time}</span>
                          {msg.sender === 'me' && (
                              <span className="status-icon">
                        {msg.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />}
                      </span>
                          )}
                        </div>
                      </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="message them typing-indicator">
                      <div className="message-content">
                        <div className="typing">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              <form className="message-input" onSubmit={handleSendMessage}>
            <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
            />
                <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                  <Send size={20} />
                </button>
              </form>
            </div>
        ) : (
            <div className="no-conversation">
              <p>Select a conversation to start messaging</p>
            </div>
        )}
      </div>
  );
};


export default MessagesPage;