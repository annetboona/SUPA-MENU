import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("login");

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const switchToRegister = () => {
    setCurrentView("register");
  };

  const switchToLogin = () => {
    setCurrentView("login");
  };
  if (!isAuthenticated) {
    return (
      <>
        {currentView === "login" ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <Register
            onRegisterSuccess={() => setCurrentView("login")}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
