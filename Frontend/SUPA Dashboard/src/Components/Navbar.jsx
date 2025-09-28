import React, { useState, useEffect } from "react";
import { Search, Bell, User } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState("boona annet");
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotification = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/notification");
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  const hanhleLogout = () =>{
    
  }

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <div
      className="navibar-container"
      style={{
        margin: 0,
        padding: 0,
        maxWidth: "100%",
      }}
    >
      <header
        className="navbar"
        style={{
          margin: 0,
          padding: 20,
          display: "flex",
          marginBottom: 40,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderRadius: 20,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <div
          className="logo"
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Supa<span style={{ color: "orange" }}>Menu</span>
        </div>

        {/* Right section */}
        <div
          className="navbar-right"
          style={{ display: "flex", alignItems: "center", gap: 20 }}
        >
          {/* Search */}
          <div
            className="search-icon"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 10,
            }}
          >
            <Search size={28} />
          </div>

          {/* Notification */}
          <div style={{ position: "relative" }}>
            <button
              style={{ background: "none",color:"#ff8c00", border: "none", cursor: "pointer" }}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <Bell size={28} />
              {/* Badge */}
              {notifications.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    background: "red",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: 12,
                  }}
                >
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  width: 250,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                  zIndex: 100,
                  maxHeight: 300,
                  overflowY: "auto",
                }}
              >
                {notifications.length === 0 ? (
                  <p style={{ padding: 10, fontSize: 14, color: "#555" }}>
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: 10,
                        borderBottom: "1px solid #eee",
                        fontSize: 14,
                      }}
                    >
                      {n.message}
                      <br />
                      <span style={{ fontSize: 12, color: "#888" }}>
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div
            className="User-profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span className="user-name">{user}</span>
            <div
              className="user-avatar"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#333",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <User size={20} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
