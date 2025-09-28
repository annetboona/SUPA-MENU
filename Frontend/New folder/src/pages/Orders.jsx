import React, { useState } from 'react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('New');
  
  const orders = [
    {
      id: 'Order #1',
      items: ['Tom Yummy 1x2', 'Singapore Sling 1x2'],
      table: 'Table 5',
      total: 5000,
      status: 'New',
      guest: 'Guest #123456'
    },
    // More orders...
  ];

  return (
    <div className="space-y-6">
      {/* Order Tabs */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {['New', 'Delivered', 'Rejected', 'All'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {activeTab === 'New' ? '12 waiting' : 
             activeTab === 'Delivered' ? '6 delivered' :
             activeTab === 'Rejected' ? '1 rejected' : '30 total'}
          </span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{order.id}</h3>
                <p className="text-sm text-gray-500">{order.table}</p>
                <div className="mt-2">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm">{item}</p>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">Frw {order.total}</p>
                <p className="text-sm text-gray-500">{order.guest}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg">
                Reject
              </button>
              <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;