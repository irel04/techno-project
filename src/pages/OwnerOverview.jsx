import React, { useState } from 'react';
import { FaListAlt, FaClock, FaCheckCircle, FaHourglassHalf, FaBan } from 'react-icons/fa';

const OwnerOverview = () => {
  // Placeholder data for analytics
  const [listingAnalytics] = useState({
    totalListings: 3,
    activeListings: 1,
    inactiveListings: 1,
    pendingListings: 1,
  });

  const [scheduleAnalytics] = useState({
    totalSchedules: 3,
    upcomingSchedules: 2,
    completedSchedules: 1,
    cancelledSchedules: 1, // Added cancelled schedules
  });

  // State for current subscription plan
  const [currentPlan, setCurrentPlan] = useState('Basic');
  const [renewalDate, setRenewalDate] = useState('June 15, 2024');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Overview</h1>

      {/* Analytics for Manage Listings */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Listings Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaListAlt className="text-3xl text-gray-800 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Total Listings</h3>
            <p className="text-2xl font-bold text-gray-900">{listingAnalytics.totalListings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaCheckCircle className="text-3xl text-green-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Active Listings</h3>
            <p className="text-2xl font-bold text-green-600">{listingAnalytics.activeListings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaClock className="text-3xl text-red-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Inactive Listings</h3>
            <p className="text-2xl font-bold text-red-600">{listingAnalytics.inactiveListings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaHourglassHalf className="text-3xl text-yellow-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Pending Listings</h3>
            <p className="text-2xl font-bold text-yellow-600">{listingAnalytics.pendingListings}</p>
          </div>
        </div>
      </div>

      {/* Analytics for Schedules */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedules Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaListAlt className="text-3xl text-gray-800 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Total Schedules</h3>
            <p className="text-2xl font-bold text-gray-900">{scheduleAnalytics.totalSchedules}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaClock className="text-3xl text-blue-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Upcoming Schedules</h3>
            <p className="text-2xl font-bold text-blue-600">{scheduleAnalytics.upcomingSchedules}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaCheckCircle className="text-3xl text-green-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Completed Schedules</h3>
            <p className="text-2xl font-bold text-green-600">{scheduleAnalytics.completedSchedules}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaBan className="text-3xl text-red-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Cancelled Schedules</h3>
            <p className="text-2xl font-bold text-red-600">{scheduleAnalytics.cancelledSchedules}</p>
          </div>
        </div>
      </div>

      {/* Current Subscription Plan */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Subscription</h2>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Plan: {currentPlan}</h3>
          <p className="text-lg text-gray-600">Renewal Date: {renewalDate}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerOverview;
