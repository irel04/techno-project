import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const OwnerSubscriptions = () => {
  const [currentPlan, setCurrentPlan] = useState('Basic');
  const [renewalDate, setRenewalDate] = useState('June 15, 2024');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: 'Php10/month',
      features: [
        'Up to 5 listings',
        'Standard support',
        'Basic analytics',
      ],
    },
    {
      name: 'Premium',
      price: 'Php30/month',
      features: [
        'Up to 20 listings',
        'Priority support',
        'Advanced analytics',
        'Featured listing placement',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Php100/month',
      features: [
        'Unlimited listings',
        'Dedicated support',
        'Full analytics suite',
        'Featured listing placement',
        'Custom marketing strategies',
      ],
    },
  ];

  const handleUpgrade = (plan) => {
    setCurrentPlan(plan);
    const today = new Date();
    const renewal = new Date(today.setMonth(today.getMonth() + 1));
    const newRenewalDate = renewal.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setRenewalDate(newRenewalDate);
    alert(`Upgraded to ${plan} plan! Renewal Date: ${newRenewalDate}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Subscription Options</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Plan: {currentPlan}</h3>
        <p className="text-gray-600">Renewal Date: {renewalDate}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          View Billing History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2">{plan.name} Plan</h3>
            <p className="text-xl font-bold mb-4">{plan.price}</p>
            <ul className="mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  <FaCheckCircle className="text-green-500 mr-2" /> {feature}
                </li>
              ))}
            </ul>
            {currentPlan === plan.name ? (
              <button className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-not-allowed">
                Current Plan
              </button>
            ) : (
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleUpgrade(plan.name)}
              >
                Upgrade to {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Billing History</h2>
            {/* Add billing history content here */}
            <ul>
              <li>June 15, 2023 - Basic Plan - Php10</li>
              <li>May 15, 2023 - Basic Plan - Php10</li>
              <li>April 15, 2023 - Basic Plan - Php10</li>
              {/* Add more billing records as needed */}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerSubscriptions;
