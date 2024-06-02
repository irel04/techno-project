import React, { useState } from 'react';

const OwnerManageListings = () => {
  const [listings, setListings] = useState([
    { id: 1, title: 'Dorm A', status: 'active', views: 120, inquiries: 10 },
    { id: 2, title: 'Dorm B', status: 'inactive', views: 90, inquiries: 5 },
    { id: 3, title: 'Dorm C', status: 'pending', views: 100, inquiries: 1 },
  ]);

  const [newListing, setNewListing] = useState({
    title: '',
    status: 'active',
    views: 0,
    inquiries: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddListing = () => {
    setListings([...listings, { ...newListing, id: listings.length + 1 }]);
    setNewListing({
      title: '',
      status: 'active',
      views: 0,
      inquiries: 0,
    });
    setIsAdding(false);
  };

  const handleEditListing = (id) => {
    // Logic to edit listing by id
  };

  const handleDeleteListing = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      default:
        return 'bg-red-100 text-red-800 border border-red-300';
    }
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Listings</h2>
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Close' : 'Add New Listing'}
        </button>
        <input
          type="text"
          placeholder="Search listings"
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
              value={newListing.title}
              onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <select
              value={newListing.status}
              onChange={(e) => setNewListing({ ...newListing, status: e.target.value })}
              className="py-2 px-4 border border-gray-300 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <input
              type="number"
              placeholder="Views"
              value={newListing.views}
              onChange={(e) => setNewListing({ ...newListing, views: Number(e.target.value) })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Inquiries"
              value={newListing.inquiries}
              onChange={(e) => setNewListing({ ...newListing, inquiries: Number(e.target.value) })}
              className="py-2 px-4 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddListing}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
            >
              Save Listing
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Title</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Status</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Views</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Inquiries</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">{listing.title}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <span
                    className={`px-2 py-1 rounded ${getStatusStyles(listing.status)}`}
                  >
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">{listing.views}</td>
                <td className="py-3 px-4 border-b border-gray-200">{listing.inquiries}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleEditListing(listing.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerManageListings;
