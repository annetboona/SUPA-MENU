import React, { useState } from "react";

const MenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    price: "",
    description: "",
    image: null,
    isAvailable: true,
  });
  return (
    <>
      <div className="container">
        <h1>Add Menu Item</h1>
        <form action="">
          <label htmlFor="">Name</label>
          <input type="text" name="name" placeholder="Menu Name" id="name" />
          <label htmlFor="">Category</label>
          <select name="category" id="category">
            <option value="">choose Category</option>
            <option value="">Drinks</option>
            <option value="">Starter</option>
            <option value="">Dessert</option>
            <option value="">Main</option>
            <option value="">Apertizer</option>
          </select>
          <label htmlFor="">Price (FRw)</label>
          <input type="text" name="price" placeholder="Rwf" id="price" />
          <label htmlFor="">Illustration</label>
          <button type="button" className="upload-btn">
            Upload Image
            <input type="file" accept="image/*" className="file-input" />
          </button>
          <button type="submit" className="btn">
            AddMenu
          </button>
        </form>
      </div>
    </>
  );
};

export default MenuForm;
