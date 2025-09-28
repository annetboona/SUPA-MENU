import React, { useState } from 'react';

const Clients = () => {
  const [showAddClient, setShowAddClient] = useState(false);

  const clients = [
    { name: 'Soy Restaurant', sales: '2345678 Frw', category: 'RESTO' },
    { name: 'Choose Kigali', sales: '987456 Frw', category: 'RESTO' },
    { name: 'Planet Burger', sales: '321456 Frw', category: 'RESTO' },
    { name: 'M Hotel', sales: '78503 Frw', category: 'HOTEL' },
    { name: 'Chez Lando', sales: '89034 Frw', category: 'PUB' },
    { name: 'Sundowner', sales: '567894 Frw', category: 'PUB' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Clients</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowAddClient(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            New Client
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg">Sort</button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg">Filter</button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Clients details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">{client.sales}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${client.category === 'RESTO' ? 'bg-blue-100 text-blue-800' :
                      client.category === 'HOTEL' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'}`}>
                    {client.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-500">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add Client</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option>RESTO</option>
                  <option>HOTEL</option>
                  <option>PUB</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddClient(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;