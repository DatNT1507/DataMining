// src/Layout.jsx
import React from 'react';
import {
  FiArchive,
  FiBook,
  FiUsers,
  FiGlobe,
  FiDatabase,
  FiBarChart2,
  FiList
} from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import './css/global.css'; 

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <header className="navbar">
        
        <div className="logo">DATA MINING</div>
        
        
        <ul className="nav-links">
          <li><NavLink to="/" end>Trang chủ</NavLink></li>
          <li>
            <NavLink to="/dataset" className={({isActive})=>isActive?'active':''}>
              <FiBook /> Phân tích Dataset
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard" className={({isActive})=>isActive?'active':''}>
              <FiList /> Dashboard dataset
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/results" className={({isActive})=>isActive?'active':''}>
              <FiBarChart2 /> Kết quả Thực nghiệm
            </NavLink>
          </li>
          <li>
            <NavLink to="/detail" className={({isActive})=>isActive?'active':''}>
              <FiList /> Chi tiết Khóa học
            </NavLink>
          </li>
        </ul>
        
      </header>

      <main className="container">
        {/* React Router sẽ render trang con ở đây */}
        <Outlet />
      </main>
     </div>
  );
}
