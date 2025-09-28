import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { restaurants, menu } from "../services/api";

const RestaurantRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Restaurant Information
    restaurantName: "",
    restaurantCompleteName: "",
    contactNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",

    // Step 2: Restaurant Type & Timings
    restaurantType: "",
    cuisineType: "",
    openingTime: "",
    closingTime: "",
    images: [],
  });

  const [menuItems, setMenuItems] = useState([]);
  const [currentMenuItem, setCurrentMenuItem] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "Drink",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First create the restaurant
      const restaurantResponse = await restaurants.create(formData);
      const restaurantId = restaurantResponse.data._id;

      // Then create menu items for this restaurant
      if (menuItems.length > 0) {
        for (const item of menuItems) {
          await menu.create({
            ...item,
            restaurantId,
          });
        }
      }

      // Handle successful registration
      alert("Restaurant registered successfully!");
      // Redirect to dashboard or another page
    } catch (error) {
      // Handle error
      console.error("Error registering restaurant:", error);
      alert("Failed to register restaurant. Please try again.");
    }
  };

  const renderStep1 = () => (
    <div className="restaurant-info">
      <h2>Restaurant Information</h2>
      <div className="form-group">
        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          value={formData.restaurantName}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="restaurantCompleteName"
          placeholder="Restaurant Complete Name"
          value={formData.restaurantCompleteName}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Contacts number @ Restaurant</label>
        <div className="phone-input">
          <span className="country-code">+250</span>
          <input
            type="tel"
            name="contactNumber"
            placeholder="Mobile number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Restaurant owner details</label>
        <div className="phone-input">
          <span className="country-code">+250</span>
          <input
            type="tel"
            name="ownerPhone"
            placeholder="Mobile number"
            value={formData.ownerPhone}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="owner-details">
        <div className="form-group">
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="ownerEmail"
            placeholder="Restaurant Owner Email"
            value={formData.ownerEmail}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="restaurant-type">
      <h2>Restaurant Type & Timings</h2>

      <div className="form-group">
        <label>
          Restaurant Type (restaurant, pub, hotel, coffeeshop, other)
        </label>
        <div className="select-wrapper">
          <select
            name="restaurantType"
            value={formData.restaurantType}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="restaurant">Restaurant</option>
            <option value="pub">Pub</option>
            <option value="hotel">Hotel</option>
            <option value="coffeeshop">Coffee Shop</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <div className="select-wrapper">
          <select
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="african">African</option>
            <option value="european">European</option>
            <option value="asian">Asian</option>
            <option value="american">American</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Opening Hours</label>
        <div className="timing-inputs">
          <div className="time-input">
            <label>From</label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="time-input">
            <label>To</label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Upload Images (pictures or logo)</label>
        <button type="button" className="upload-btn">
          Choose Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </button>
      </div>
    </div>
  );

  // Add new functions for menu item handling
  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuImageUpload = (e) => {
    setCurrentMenuItem((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const addMenuItem = () => {
    if (!currentMenuItem.name || !currentMenuItem.price) {
      alert("Please fill in at least the name and price");
      return;
    }

    setMenuItems((prev) => [...prev, currentMenuItem]);
    setCurrentMenuItem({
      name: "",
      price: "",
      description: "",
      image: null,
      category: currentMenuItem.category, // Keep the same category for convenience
    });
  };

  const renderStep3 = () => (
    <div className="menu-creation">
      <h2>Create your menu</h2>

      <div className="menu-categories">
        {["Drink", "Starter", "Appetizer", "Dessert", "Main"].map(
          (category) => (
            <button
              key={category}
              type="button"
              className={`category-btn ${
                currentMenuItem.category === category ? "active" : ""
              }`}
              onClick={() =>
                setCurrentMenuItem((prev) => ({ ...prev, category }))
              }
            >
              {category}
            </button>
          )
        )}
      </div>

      <div className="menu-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Menu Name"
            value={currentMenuItem.name}
            onChange={handleMenuItemChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="0.00"
            value={currentMenuItem.price}
            onChange={handleMenuItemChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Menu description</label>
          <textarea
            name="description"
            placeholder="Ingredients"
            value={currentMenuItem.description}
            onChange={handleMenuItemChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image</label>
          <button type="button" className="upload-btn">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleMenuImageUpload}
              className="file-input"
            />
          </button>
        </div>

        <button type="button" onClick={addMenuItem} className="add-more-btn">
          Add more
          <span className="plus-icon">+</span>
        </button>
      </div>

      {menuItems.length > 0 && (
        <div className="menu-items-list">
          <h3>Added Menu Items</h3>
          <div className="items-grid">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item-card">
                <div className="item-header">
                  <h4>{item.name}</h4>
                  <span className="price">{item.price}</span>
                </div>
                <p className="category">{item.category}</p>
                {item.description && (
                  <p className="description">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="restaurant-registration">
      <div className="registration-sidebar">
        <div className="step-title">
          <h3>1. Create your restaurant profile</h3>
        </div>

        <div className="steps-list">
          <div className={`step-item ${step === 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Restaurant Information</h4>
              <p>Restaurant name, address, details, owner details</p>
            </div>
          </div>

          <div className={`step-item ${step === 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Restaurant Type & Timings</h4>
              <p>Establishment & cuisine type, opening hours</p>
            </div>
          </div>

          <div className={`step-item ${step === 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Create your menu</h4>
              <p>Menu, restaurant, food images</p>
            </div>
          </div>
        </div>
      </div>

      <div className="registration-content">
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="navigation-buttons">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="back-button"
              >
                <span className="arrow">◀</span> Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="next-button"
              >
                Next <span className="arrow">▶</span>
              </button>
            ) : (
              <button type="submit" className="next-button">
                Next <span className="arrow">▶</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantRegistration;
