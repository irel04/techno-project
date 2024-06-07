import React, { useState } from 'react';

const OwnerManageListings = () => {
  const [listings, setListings] = useState([
    { id: 1, title: 'Dorm A', status: 'active', views: 120, inquiries: 10, verified: false },
    { id: 2, title: 'Dorm B', status: 'inactive', views: 90, inquiries: 5, verified: true },
    { id: 3, title: 'Dorm C', status: 'pending', views: 100, inquiries: 1, verified: false },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [listingDetails, setListingDetails] = useState(null);

  const handleEditListing = (id) => {
    // Logic to edit listing by id
    // Also needs to connect to database first
  };

  const handleDeleteListing = () => {
    if (listingToDelete) {
      setListings(listings.filter(listing => listing.id !== listingToDelete.id));
      setIsDeleteModalOpen(false);
      setListingToDelete(null);
    }
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

  const getVerificationStyles = (verified) => {
    return verified
      ? 'bg-blue-100 text-blue-800 border border-blue-300'
      : 'bg-red-100 text-red-800 border border-red-300';
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Listings</h2>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search listings"
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
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Status</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Views</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Inquiries</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Verification</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <tr
                key={listing.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setListingDetails(listing);
                  setIsDetailsModalOpen(true);
                }}
              >
                <td className="py-3 px-4 border-b border-gray-200">{listing.title}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <span className={`px-2 py-1 rounded ${getStatusStyles(listing.status)}`}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">{listing.views}</td>
                <td className="py-3 px-4 border-b border-gray-200">{listing.inquiries}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <span className={`px-2 py-1 rounded ${getVerificationStyles(listing.verified)}`}>
                    {listing.verified ? 'Verified' : 'For Verification'}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditListing(listing.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      setListingToDelete(listing);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete the listing "{listingToDelete?.title}"?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded mr-2"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                onClick={handleDeleteListing}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Just trial, it first needs to be connected to the database before i can fetch the details of each dorm listings */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl mb-4">Details</h3>
            <p><strong>Title:</strong> {listingDetails?.title}</p>
            <p><strong>Status:</strong> {listingDetails?.status}</p>
            <p><strong>Views:</strong> {listingDetails?.views}</p>
            <p><strong>Inquiries:</strong> {listingDetails?.inquiries}</p>
            <p><strong>Verification:</strong> {listingDetails?.verified ? 'Verified' : 'For Verification'}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerManageListings;
