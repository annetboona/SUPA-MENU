import React, { useState } from 'react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Drink');
  const [showAddItem, setShowAddItem] = useState(false);

  const categories = ['Drink', 'Starter', 'Appetizer', 'Dessert', 'Main'];
  const menuItems = [
    {
      name: 'Tom Yummy',
      price: 5000,
      image: '/menu-item-1.jpg',
      category: 'Drink'
    },
    {
      name: 'Singapore Sling',
      price: 5000,
      image: '/menu-item-2.jpg',
      category: 'Drink'
    },
    // Add more menu items here
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary">Frw {item.price}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <button
        onClick={() => setShowAddItem(true)}
        className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg"
      >
        +
      </button>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add Menu Item</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" className="mt-1 block w-full" />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;