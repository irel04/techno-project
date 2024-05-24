import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import OwnerOverview from './OwnerOverview';
import ManageListings from './ManageListings';
import Schedules from './Schedules';
import Subscriptions from './Subscriptions';

const OwnerPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OwnerOverview />;
      case 'Listings':
        return <ManageListings />;
      case 'Schedules':
        return <Schedules />;
      case 'Subscriptions':
        return <Subscriptions />;
      default:
        return <OwnerOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-grow p-6">{renderContent()}</div>
    </div>
  );
};

export default OwnerPage;

