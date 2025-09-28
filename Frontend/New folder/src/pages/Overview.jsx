import React from 'react';
import { Line } from 'react-chartjs-2';

const Overview = () => {
  const stats = [
    { label: 'Guests', value: '20' },
    { label: 'Revenues (FRW)', value: '38234000' },
    { label: 'Orders', value: '60' }
  ];

  const sideStats = [
    { label: 'Pending orders', value: '6' },
    { label: 'Occupied tables', value: '12' },
    { label: 'Orders/hour', value: '40' },
    { label: 'Seats', value: '30' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-3xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders</h2>
          <div className="flex space-x-2">
            {['Active', 'Paid', 'Pending', 'All'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  tab === 'Active'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Orders List */}
        <div className="space-y-4">
          {/* Order items will be mapped here */}
        </div>
      </div>

      {/* Side Stats */}
      <div className="grid grid-cols-4 gap-4">
        {sideStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;