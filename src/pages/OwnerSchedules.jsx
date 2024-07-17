import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { toast } from 'react-toastify';
import { customToastParameter } from '../utils/helper';


const OwnerSchedules = () => {
 
  const [schedules, setSchedules] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = async (id, newValue) => {
    const loading = toast.loading("Updating...")

    const updatedSchedules = schedules.map(schedule => 
      schedule.id === id ? { ...schedule, status: newValue } : schedule
    );
   
    setSchedules(updatedSchedules);
    
    try {
      
      const { error: updatingSchedError } = await supabase.from("renter_schedule").update({isCompleted: newValue === "completed"? true : false, is_active: newValue === "upcoming" ? true : false})
      .eq("id", id)

      if(updatingSchedError){
        throw updatingSchedError.message
      }

      

      toast.update(loading, customToastParameter("Successfully updated", "success"))

    } catch (error) {
      toast.update(loading, customToastParameter(error, "error"))
      console.error(error);
    }
    
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.visitorName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const fetchSchedules = async () => {
    try {
      const { data: scheds, error: fetchingSchedError } = await supabase.from("renter_schedule").select(`id, date, time, property: properties(dorm_name), renter: renters(first_name, last_name, email), isCompleted, is_active`)

      if(fetchingSchedError){
        throw fetchingSchedError.message
      }

      console.log(scheds)

      const restructuredArray = scheds.map((item, index) => {
        return {
          id: item.id,
          title: item.property.dorm_name,
          visitorName: item.renter.first_name + item.renter.last_name,
          visitorContact: item.renter.email,
          date: item.date,
          time: item.time,
          status: item.isCompleted? "completed" : item.is_active? "upcoming" : "cancelled"
        }
      })

      console.log(restructuredArray)
      setSchedules(restructuredArray)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [])


  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Schedules</h2>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search schedules"
          value={searchQuery}
          onChange={handleSearchChange}
          className="py-2 px-4 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Title</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Visitor Name</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Visitor Contact</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Date</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Time</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="py-4 px-5 border-b border-gray-200">{schedule.title}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.visitorName}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.visitorContact}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.date}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.time}</td>
                <td className="py-4 px-5 border-b border-gray-200">
                  <select
                    value={schedule.status}
                    onChange={(e) => handleStatusChange(schedule.id, e.target.value)}
                    className={`px-2 py-1 rounded ${getStatusStyles(schedule.status)}`}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerSchedules;
