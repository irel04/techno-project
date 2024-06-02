import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const SideBar = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10">
      {/* Hamburger Icon */}
      <button 
        className="block sm:hidden p-4 text-primary z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed sm:static top-0 left-0 w-64 bg-white shadow-md h-full transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform sm:translate-x-0 z-20`}>
        <div className="p-4 font-bold text-xl text-primary border-b border-t">Owner Dashboard</div>
        <nav className="p-4">
          <button 
            className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
            onClick={() => { setActiveTab('Overview'); setIsOpen(false); }}
          >
            Overview
          </button>
          <button 
            className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
            onClick={() => { setActiveTab('Listings'); setIsOpen(false); }}
          >
            Manage Listings
          </button>
          <button 
            className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
            onClick={() => { setActiveTab('Schedules'); setIsOpen(false); }}
          >
            Schedules
          </button>
          <button 
            className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
            onClick={() => { setActiveTab('Subscriptions'); setIsOpen(false); }}
          >
            Subscription Options
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 sm:hidden z-10" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default SideBar;
