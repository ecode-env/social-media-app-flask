import React, { useState } from 'react';
import { Send } from 'lucide-react';
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
      time: '5 hours ago'
    }
  ];

  return (
    <div className="messages-page">
      <h1>Messages</h1>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message-item">
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
  );
};

export default MessagesPage;