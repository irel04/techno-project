import React from 'react';

const SideBar = ({ setActiveTab }) => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4 font-bold text-xl text-primary border-b border-t">Owner Dashboard</div>
      <nav className="p-4">
        <button 
          className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
          onClick={() => setActiveTab('Overview')}
        >
          Overview
        </button>
        <button 
          className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
          onClick={() => setActiveTab('Listings')}
        >
          Manage Listings
        </button>
        <button 
          className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
          onClick={() => setActiveTab('Schedules')}
        >
          Schedules
        </button>
        <button 
          className="block w-full text-left p-3 my-2 rounded hover:bg-secondary"
          onClick={() => setActiveTab('Subscriptions')}
        >
          Subscription Options
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
