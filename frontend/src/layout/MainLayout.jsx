import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from '../components/common/Header.jsx';
import { Bell, MessageSquare, UserCircle, PlusSquare, Home, LogIn } from 'lucide-react';
import './MainLayout.css';
import Button from "../components/common/Button.jsx";
import { useAuth } from '../context/AuthContext.jsx'

const MainLayout = () => {
  return (
    <div className="layout">
      <Header />
      
      <div className="layout-container">
        <aside className="sidebar left-sidebar">
          <div className="sidebar-content">
            <h3>Navigation</h3>
            <ul className="sidebar-nav">
              <li><a href="/"><Home size={18}/></a></li>
              <li><a href="/posts">Recent Posts</a></li>
              <li><a href="/users">Users</a></li>
            </ul>
          </div>
        </aside>
        
        <main className="main-content">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default MainLayout;