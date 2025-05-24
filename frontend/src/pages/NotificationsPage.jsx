import React from 'react';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: 'John Doe',
      content: 'liked your post',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'comment',
      user: 'Jane Smith',
      content: 'commented on your post',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">
              <strong>{notification.user}</strong> {notification.content}
            </div>
            <div className="notification-time">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;