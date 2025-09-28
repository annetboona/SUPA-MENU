import React, { useEffect, useState } from "react";
import { Search, Bell, User, UserPen, Wine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const SupaMenuLanding = () => {
  const [user, setUser] = useState(null);
  const [notifications,setNotifications] = useState([]);
  const [showDropdown,setShowDropdown] =useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [showSearchDropdown,setShowSearchDropdown] = useState(false)
  const navigate = useNavigate();
      const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/userId");
        setUser(res.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
     const fetchNotification = async() =>{
      try {
        const res = await axios.get('http://localhost:5000/api/auth/notification')
        setNotifications(res.data)
      } catch (error) {
        console.log(error)
      }
     }
     const handleLogout = () =>{
      localStorage.removeItem('token')
      sessionStorage.clear();
      navigate("/");
     }
     const handleSearch = async(e) =>{
      const value = e.target.value;
      if(value.trim().length === 0) {
        setSearchResult([]);
        setShowSearchDropdown(false);
        return;
      }
      try {
        const res = await axios.get(
              `http://localhost:5000/api/restaurant/search?q=${value}`
        );
        setSearchResult(res.data);
        setShowSearchDropdown(true);
      } catch (error) {
        console.error("search failed:",error);
      }
      
     }
  useEffect(() => {
    fetchUserProfile();
    fetchNotification()
  }, []);

  return (
    <div className="supamenu-landing">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">
              Supa<span className="logo-orange">Menu</span>
            </span>
          </div>

  {/* Search Box */}
        <div style={{ position: "relative", width: 250 }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: "100%",
              padding: "8px 35px 8px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <Search
            size={18}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
            }}
          />

          {/* Search Results Dropdown */}
          {showSearchDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 8,
                boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                maxHeight: 200,
                overflowY: "auto",
                zIndex: 100,
              }}
            >
              {searchResults.length === 0 ? (
                <p style={{ padding: 10, fontSize: 14, color: "#555" }}>
                  No results
                </p>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={item.id || item._id}
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #eee",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("Selected:", item);
                      setShowSearchDropdown(false);
                    }}
                  >
                    <strong>{item.name}</strong>
                    <br />
                    <span style={{ fontSize: 12, color: "#777" }}>
                      {item.description}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div
          className="navbar-right"
          style={{ display: "flex", alignItems: "center", gap: 20 }}
        >

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
            <div className="user-profile">
              <span className="user-name">{user}</span>
              <div className="user-avatar">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Register your restaurant on SupaMenu</h1>
          <p className="hero-subtitle">for free and get more revenue !</p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/registerRestaurant")}
            >
              Register your Restaurant
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Restaurant already registered? Signin
            </button>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How it works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-illustration">
                <div className="step-icon step-1-icon">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="#FF8C00"
                      opacity="0.2"
                    />
                    <UserPen
                      x="15"
                      y="20"
                      width="30"
                      height="30"
                      rx="2"
                      fill="#FF8C00"
                    />
                  </svg>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Step 1</h3>
                <p className="step-description">Register your restaurant</p>
              </div>
              <div className="step-bg-illustration">
                <div className="floating-elements">
                  <div className="floating-circle circle-1"></div>
                  <div className="floating-circle circle-2"></div>
                  <div className="floating-food food-1">🍕</div>
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-illustration">
                <div className="step-icon step-2-icon">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="#FF8C00"
                      opacity="0.2"
                    />
                    <Wine
                      x="15"
                      y="20"
                      width="30"
                      height="30"
                      rx="2"
                      fill="#FF8C00"
                    />
                  </svg>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Step 2</h3>
                <p className="step-description">
                  Create your restaurant profile and
                  <br />
                  create menu Items
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-illustration">
                <div className="step-icon step-3-icon">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="#FF8C00"
                      opacity="0.2"
                    />
                    <rect
                      x="20"
                      y="15"
                      width="20"
                      height="25"
                      rx="3"
                      fill="#FF8C00"
                    />
                    <circle cx="25" cy="22" r="2" fill="white" />
                    <line
                      x1="28"
                      y1="20"
                      x2="35"
                      y2="20"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <line
                      x1="28"
                      y1="24"
                      x2="33"
                      y2="24"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <path
                      d="M22 30l3 3 8-8"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Step 3</h3>
                <p className="step-description">Start receiving orders</p>
              </div>
              <div className="step-bg-illustration">
                <div className="floating-elements">
                  <div className="floating-shape shape-1"></div>
                  <div className="floating-shape shape-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupaMenuLanding;
