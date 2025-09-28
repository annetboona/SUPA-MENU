import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Overview' },
    { path: '/dashboard/tables', icon: '🪑', label: 'Tables' },
    { path: '/dashboard/orders', icon: '📝', label: 'Orders' },
    { path: '/dashboard/menus', icon: '🍽️', label: 'Menus' },
    { path: '/dashboard/settings', icon: '⚙️', label: 'Settings' },
    { path: '/dashboard/account', icon: '👤', label: 'My Account' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-secondary text-white">
        <div className="p-4">
          <Link to="/dashboard" className="text-2xl font-bold">
            <span className="text-white">Supa</span>
            <span className="text-primary">Menu</span>
          </Link>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 ${
                location.pathname === item.path ? 'bg-gray-800 text-white' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2">🔍</button>
              <button className="p-2">🔔</button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Jacques Kagabo</span>
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;