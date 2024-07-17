import React, { useEffect, useState } from 'react';
import { FaListAlt, FaClock, FaCheckCircle, FaHourglassHalf, FaBan } from 'react-icons/fa';
import { supabase } from '../utils/supabase';
import { checkUpcomings } from '../utils/helper';



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

  const [totalListings, setTotalListings] = useState(0)
  const [activeListings, setActiveListings] = useState(0)
  const [inActiveListings, setInactiveListings] = useState(0)

  const [schedules, setSchedules] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  })

  const provider_id = "07d0e5d8-35b0-40bc-8331-cefa74ce16e0"


  const fetchDorms = async () => {
    try {
      
      const { data: dorms, error: dormError, count } = await supabase.from("properties").select("*", {count: "exact"}).eq("provider_id", provider_id)

      if(dormError){
        throw dormError.message
      }

      
      const { error: inactiveError, count: inactiveCount } = await supabase.from("properties").select("*", {count: "exact"}).eq("provider_id", provider_id).eq("is_active", false)

      if(inactiveError){
        throw inactiveError.message
      }


      const { error: activeError, count: activeCount } = await supabase.from("properties").select("*", {count: "exact"}).eq("provider_id", provider_id).eq("is_active", true)

      if(activeError){
        throw activeError.message
      }

      setTotalListings(count)
      setInactiveListings(inactiveCount)
      setActiveListings(activeCount)


    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllScheds = async () => {
    try {

      const { data: dateCol, error: schedError, count:totalScheds } = await supabase.from("renter_schedule").select("date", { count: "exact" }).eq("provider_id", provider_id)
      
      if(schedError){
        throw schedError.message
      }

      const { error: completedError, count: totalCompleted } = await supabase.from("renter_schedule").select("id", { count: "exact" }).eq("provider_id", provider_id).eq("isCompleted", true)
      
      if(completedError){
        throw completedError.message
      }


      const { error: cancelledError, count: totalCancelled } = await supabase.from("renter_schedule").select("id", { count: "exact" }).eq("provider_id", provider_id).eq("is_active", false)
      
      if(cancelledError){
        throw cancelledError.message
      }

      // check upcomings
      const upcomings = dateCol.filter((date) => {
        const isUpcoming = checkUpcomings(date)
        if(isUpcoming){
          return true
        }
      })
      
      setSchedules({...schedules, cancelled: totalCancelled, total: totalScheds, completed: totalCompleted, upcoming: upcomings.length})


    } catch (error) {
      console.error(first)
    }
  }
  
  useEffect(()=> {

    
    fetchDorms()
    fetchAllScheds()
  }, [])



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
            <p className="text-2xl font-bold text-gray-900">{totalListings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaCheckCircle className="text-3xl text-green-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Active Listings</h3>
            <p className="text-2xl font-bold text-green-600">{activeListings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaClock className="text-3xl text-red-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Inactive Listings</h3>
            <p className="text-2xl font-bold text-red-600">{inActiveListings}</p>
          </div>
          {/* <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaHourglassHalf className="text-3xl text-yellow-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Pending Listings</h3>
            <p className="text-2xl font-bold text-yellow-600">{listingAnalytics.pendingListings}</p>
          </div> */}
        </div>
      </div>

      {/* Analytics for Schedules */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedules Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaListAlt className="text-3xl text-gray-800 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Total Schedules</h3>
            <p className="text-2xl font-bold text-gray-900">{schedules.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaClock className="text-3xl text-blue-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Upcoming Schedules</h3>
            <p className="text-2xl font-bold text-blue-600">{schedules.upcoming}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaCheckCircle className="text-3xl text-green-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Completed Schedules</h3>
            <p className="text-2xl font-bold text-green-600">{schedules.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform">
            <FaBan className="text-3xl text-red-600 mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-2">Cancelled Schedules</h3>
            <p className="text-2xl font-bold text-red-600">{schedules.cancelled}</p>
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
