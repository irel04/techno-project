import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { MdInfoOutline, MdAdd, MdRemove } from "react-icons/md";

const PostaRental = () => {
  const [formData, setFormData] = useState({
    pictures: [],
    price: "",
    description: "",
    features: [""],
    amenities: [""],
    paymentTerms: "",
    advancePayments: "",
    securityDeposit: "",
    minimumStay: "",
    electricityBills: "",
    waterBills: "",
    associationDues: "",
    nearLandmarks: [""],
    gmapsLink: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDynamicInputChange = (index, e, field) => {
    const { value } = e.target;
    const updatedField = formData[field].slice();
    updatedField[index] = value;
    setFormData({ ...formData, [field]: updatedField });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (index, field) => {
    const updatedField = formData[field].slice();
    updatedField.splice(index, 1);
    setFormData({ ...formData, [field]: updatedField });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pictures: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      price,
      description,
      paymentTerms,
      advancePayments,
      securityDeposit,
      minimumStay,
      electricityBills,
      waterBills,
      associationDues,
    } = formData;
    if (
      !price ||
      !description ||
      !paymentTerms ||
      !advancePayments ||
      !securityDeposit ||
      !minimumStay ||
      !electricityBills ||
      !waterBills ||
      !associationDues
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Form submitted", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Post a Dormitory
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Pictures (minimum of 3)
            <MdInfoOutline
              data-tip="Upload at least 3 pictures of the rental"
              className="inline ml-2 text-gray-400"
            />
          </label>
          <input
            type="file"
            name="pictures"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
          />
          <div className="flex mt-4 gap-4">
            {Array.from(formData.pictures).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price
              <MdInfoOutline
                data-tip="Enter the price of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="e.g., 10000 PHP"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
              <MdInfoOutline
                data-tip="Provide a detailed description of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="e.g., Spacious dorm with air conditioning..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Features
              <MdInfoOutline
                data-tip="List the features of the rental"
                className="inline ml-2 text-gray-400"
              />
            </label>
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center mb-2"
              >
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleDynamicInputChange(index, e, "features")
                  }
                  placeholder="e.g., Wi-Fi, Air Conditioning..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeField(index, "features")}
                  className="ml-2 text-red-500"
                >
                  <MdRemove />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("features")}
              className="mt-2 text-blue-500"
            >
              <MdAdd /> Add Feature
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Amenities
              <MdInfoOutline
                data-tip="List the amenities available"
                className="inline ml-2 text-gray-400"
              />
            </label>
            {formData.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center mb-2"
              >
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) =>
                    handleDynamicInputChange(index, e, "amenities")
                  }
                  placeholder="e.g., Gym, Pool..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeField(index, "amenities")}
                  className="ml-2 text-red-500"
                >
                  <MdRemove />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("amenities")}
              className="mt-2 text-blue-500"
            >
              <MdAdd /> Add Amenity
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Payment Terms
              <MdInfoOutline
                data-tip="Specify the payment terms"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleInputChange}
              required
              placeholder="e.g., Monthly, Quarterly..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Advance Payments
              <MdInfoOutline
                data-tip="Specify the advance payment terms"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="advancePayments"
              value={formData.advancePayments}
              onChange={handleInputChange}
              placeholder="e.g., 2 months advance..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Security Deposit
              <MdInfoOutline
                data-tip="Specify the security deposit amount"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleInputChange}
              placeholder="e.g., 1 month rent..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Minimum Stay
              <MdInfoOutline
                data-tip="Specify the minimum stay duration"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="minimumStay"
              value={formData.minimumStay}
              onChange={handleInputChange}
              placeholder="e.g., 6 months..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Electricity Bills
              <MdInfoOutline
                data-tip="Provide information about electricity bills"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="electricityBills"
              value={formData.electricityBills}
              onChange={handleInputChange}
              placeholder="e.g., Included/Separate..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Water Bills
              <MdInfoOutline
                data-tip="Provide information about water bills"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="waterBills"
              value={formData.waterBills}
              onChange={handleInputChange}
              placeholder="e.g., Included/Separate..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Association Dues
              <MdInfoOutline
                data-tip="Specify if association dues are applicable"
                className="inline ml-2 text-gray-400"
              />
            </label>
            <input
              type="text"
              name="associationDues"
              value={formData.associationDues}
              onChange={handleInputChange}
              placeholder="e.g., Included/Excluded..."
              className="w-full py-2 px-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Near Landmarks
              <MdInfoOutline
                data-tip="List any nearby landmarks"
                className="inline ml-2 text-gray-400"
              />
            </label>
            {formData.nearLandmarks.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center mb-2"
              >
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) =>
                    handleDynamicInputChange(index, e, "nearLandmarks")
                  }
                  placeholder="e.g., Schools, Malls..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeField(index, "nearLandmarks")}
                  className="ml-2 text-red-500"
                >
                  <MdRemove />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("nearLandmarks")}
              className="mt-2 text-blue-500"
            >
              <MdAdd /> Add Landmark
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Google Maps Embed Link
            <MdInfoOutline
              data-tip="Provide a link to the Google Maps embed"
              className="inline ml-2 text-gray-400"
            />
          </label>
          <input
            type="text"
            name="gmapsLink"
            value={formData.gmapsLink}
            onChange={handleInputChange}
            placeholder="e.g., https://www.google.com/maps/embed?pb=..."
            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
        >
          Submit Rental
        </button>
      </form>
      <Tooltip />
    </div>
  );
};

export default PostaRental;
