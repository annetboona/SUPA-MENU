import { Outlet, NavLink } from "react-router-dom";
import {
  FaHome,
  FaTable,
  FaUtensils,
  FaChartBar,
  FaCog,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";

const DashboardLayout = () => {
  const navItems = [
    { path: "/", icon: FaChartBar, label: "Overview" },
    { path: "/tables", icon: FaTable, label: "Tables" },
    { path: "/orders", icon: FaClipboardList, label: "Orders" },
    { path: "/menu", icon: FaUtensils, label: "Menu" },
    { path: "/clients", icon: FaUser, label: "Clients" },
    { path: "/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-orange-500">SupaMenu</h1>
        </div>
        <nav className="mt-8">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Restaurant Management
            </h2>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-gray-700">
                <FaCog className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="/avatar-placeholder.png"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  Admin User
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
