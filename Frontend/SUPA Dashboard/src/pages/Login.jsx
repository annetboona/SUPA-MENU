import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import ApiService from "../services/ApiServices";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const response = await ApiService.login(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          {/* Left Panel */}
          <div className="branding-panel">
            <h1 className="branding-title">
              Supa<span className="branding-subtitle">Menu</span>
            </h1>
          </div>

          {/* Right Panel */}
          <div className="form-panel">
            <div className="form-wrapper">
              <div className="form-header">
                <p className="welcome-text">Welcome</p>
                <h2 className="form-title">Login to SupaMenu</h2>
                <p className="form-subtitle">
                  Enter your email and password below
                </p>
              </div>
              <form action="" className="form-fields" onSubmit={handleSubmit}>
                {error && <div className="alert error">{error}</div>}
                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      PASSWORD
                    </label>
                    <div className="password-wrapper">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="form-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="login-button">
                    Log In
                  </button>
                </div>

                <div className="extra-links">
                  <p>
                    Don't have an account?{" "}
                    <button
                      className="link"
                      type="button"
                      onClick={() => navigate("/register")}
                    >
                      Sign up
                    </button>
                  </p>
                  <p>
                    Forgot your password?{" "}
                    <button className="link">RESET</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
