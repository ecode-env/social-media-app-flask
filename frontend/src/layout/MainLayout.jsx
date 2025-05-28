import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import { Bell, MessageSquare, UserCircle, PlusSquare,Home } from 'lucide-react';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout">
      <Header />
      
      <div className="layout-container">
        <aside className="sidebar left-sidebar">
          <div className="sidebar-content">
            <h3>Navigation</h3>
            <ul className="sidebar-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/posts">Recent Posts</a></li>
              <li><a href="/users">Users</a></li>
            </ul>
          </div>
        </aside>
        
        <main className="main-content">
          <Outlet />
        </main>
        
        <aside className="sidebar right-sidebar">
          <div className="sidebar-content">
            <h3>Popular</h3>
            <ul className="sidebar-list">
              <li>Top Post 1</li>
              <li>Top Post 2</li>
              <li>Top Post 3</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;