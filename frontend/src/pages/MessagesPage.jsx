import React, { useState, useEffect, useRef } from 'react';
import { Send, LucideCircleEllipsis, ChevronLeft, Check, CheckCheck, PencilLine } from 'lucide-react';
import './MessagesPage.css';

const MessagesPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    {
      id: 1,
      user: 'John Doe',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      lastMessage: 'Hey, how are you?',
      time: '2 hours ago',
      conversation: [
        { id: 1, text: 'Hey, how are you?', sent: false, time: '2 hours ago' },
        { id: 2, text: 'I\'m good, thanks! How about you?', sent: true, time: '2 hours ago' },
        { id: 3, text: 'Great! Did you see the new project requirements?', sent: false, time: '1 hour ago' },
        { id: 4, text: 'Yes, I\'m working on them now', sent: true, time: '1 hour ago' }
      ]
    },
    {
      id: 2,
      user: 'Jane Smith',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      lastMessage: 'The project looks great!',
      time: '5 hours ago',
      conversation: [
        { id: 1, text: 'Hi, I reviewed your latest changes', sent: false, time: '5 hours ago' },
        { id: 2, text: 'The project looks great!', sent: false, time: '5 hours ago' },
        { id: 3, text: 'Thank you! I spent a lot of time on it', sent: true, time: '4 hours ago' }
      ]
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const updatedMessages = messages.map(msg => {
      if (msg.id === selectedUser.id) {
        return {
          ...msg,
          conversation: [
            ...msg.conversation,
            {
              id: msg.conversation.length + 1,
              text: newMessage,
              sent: true,
              time: 'Just now'
            }
          ]
        };
      }
      return msg;
    });

    // Update the messages array
    messages.splice(0, messages.length, ...updatedMessages);
    setNewMessage('');
  };

  return (
      <div className="messages-page">
        <div className="messages-list-container">
          <h2>Messages</h2>
          <div className="messages-list">
            {messages.map(message => (
                <div
                    key={message.id}
                    className={`message-item ${selectedUser?.id === message.id ? 'active' : ''}`}
                    onClick={() => setSelectedUser(message)}
                >
                  <img src={message.avatar} alt={message.user} className="message-avatar" />
                  <div className="message-content">
                    <div className="message-header">
                      <strong>{message.user}</strong>
                      <span className="message-time">{message.time}</span>
                    </div>
                    <p className="message-text">{message.lastMessage}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {selectedUser ? (
            <div className="conversation">
              <div className="conversation-header">
                <img src={selectedUser.avatar} alt={selectedUser.user} className="conversation-avatar" />
                <h3 className="conversation-name">{selectedUser.user}</h3>
              </div>

              <div className="conversation-messages">
                {selectedUser.conversation.map(message => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.sent ? 'sent' : 'received'}`}
                    >
                      <p>{message.text}</p>
                      <small className="message-time">{message.time}</small>
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