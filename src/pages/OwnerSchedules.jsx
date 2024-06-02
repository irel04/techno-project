import React, { useState } from 'react';

const OwnerSchedules = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, title: 'Dorm A Tour', visitorName: 'John Doe', visitorContact: 'john.doe@example.com', date: '2024-06-05', time: '10:00 AM', status: 'upcoming' },
    { id: 2, title: 'Dorm B Tour', visitorName: 'Jane Smith', visitorContact: 'jane.smith@example.com', date: '2024-06-06', time: '02:00 PM', status: 'completed' },
    { id: 3, title: 'Dorm C Tour', visitorName: 'Alice Johnson', visitorContact: 'alice.johnson@example.com', date: '2024-06-07', time: '11:00 AM', status: 'upcoming' },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    title: '',
    visitorName: '',
    visitorContact: '',
    date: '',
    time: '',
    status: 'upcoming',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSchedule = () => {
    setSchedules([...schedules, { ...newSchedule, id: schedules.length + 1 }]);
    setNewSchedule({
      title: '',
      visitorName: '',
      visitorContact: '',
      date: '',
      time: '',
      status: 'upcoming',
    });
    setIsAdding(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Schedules</h2>
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Close' : 'Add Schedule'}
        </button>
        <input
          type="text"
          placeholder="Search schedules"
          value={searchQuery}
          onChange={handleSearchChange}
          className="py-2 px-4 border border-gray-300 rounded"
        />
      </div>
      {isAdding && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newSchedule.title}
              onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Visitor Name"
              value={newSchedule.visitorName}
              onChange={(e) => setNewSchedule({ ...newSchedule, visitorName: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Visitor Contact"
              value={newSchedule.visitorContact}
              onChange={(e) => setNewSchedule({ ...newSchedule, visitorContact: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <input
              type="date"
              value={newSchedule.date}
              onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <input
              type="time"
              value={newSchedule.time}
              onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddSchedule}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}
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
            {filteredSchedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="py-4 px-5 border-b border-gray-200">{schedule.title}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.visitorName}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.visitorContact}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.date}</td>
                <td className="py-4 px-5 border-b border-gray-200">{schedule.time}</td>
                <td className="py-4 px-5 border-b border-gray-200">
                  <span className={`px-2 py-1 rounded ${getStatusStyles(schedule.status)}`}>
                    {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                  </span>
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
