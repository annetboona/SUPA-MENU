import React, { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";

const OrderForm = ({ menuItems, onSubmit, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [selectedTable, setSelectedTable] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  const [notes, setNotes] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Main",
    "Dessert",
    "Drink",
    "Appetizer",
    "Starter",
  ];
  const tables = Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);

  useEffect(() => {
    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setOrderTotal(total);
  }, [selectedItems]);

  const filteredMenuItems = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const addItem = (item) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);
    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setSelectedItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
      );
    }
  };

  const handleSubmitOrder = () => {
    if (selectedItems.length === 0 || !selectedTable) {
      alert("Please select items and a table");
      return;
    }

    const orderData = {
      items: selectedItems,
      total: orderTotal,
      status: "New",
      table: selectedTable,
      customer: customerName || "Guest",
      paymentMethod,
      notes,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onSubmit(orderData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Menu Items Section */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Category Tabs */}
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-orange-600 font-semibold mb-2">
                    Frw {item.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {item.description}
                  </p>
                  <button
                    onClick={() => addItem(item)}
                    disabled={!item.available}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {item.available ? "Add to Order" : "Unavailable"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-80 border-l bg-gray-50 p-6 overflow-y-auto">
            <h3 className="font-semibold mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Summary
            </h3>

            {/* Order Details Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  required
                >
                  <option value="">Select Table</option>
                  {tables.map((table) => (
                    <option key={table} value={table}>
                      {table}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name (Optional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Guest"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                >
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special instructions..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Selected Items */}
            <div className="space-y-2 mb-6">
              <h4 className="font-medium">
                Selected Items ({selectedItems.length})
              </h4>
              {selectedItems.length === 0 ? (
                <p className="text-gray-500 text-sm">No items selected</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 bg-white rounded border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-orange-600">
                          Frw {item.price.toLocaleString()} each
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm">
                  Frw {orderTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Tax (18%)</span>
                <span className="text-sm">
                  Frw {Math.round(orderTotal * 0.18).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span className="text-orange-600">
                  Frw {Math.round(orderTotal * 1.18).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={selectedItems.length === 0 || !selectedTable}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
