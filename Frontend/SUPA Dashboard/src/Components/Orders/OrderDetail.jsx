import React, { useState } from "react";
import { X, Star, Clock, CheckCircle, XCircle, Edit } from "lucide-react";

const OrderDetail = ({ order, onStatusUpdate, onClose }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "text-blue-600 bg-blue-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleStatusUpdate = (newStatus) => {
    onStatusUpdate(order.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p className="text-gray-600">Order #{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Table:</span>
                  <span className="font-medium">{order.table}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{order.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">
                    {order.customer || "Guest"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium">
                    {order.paymentMethod || "Mobile Money"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    Frw {order.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%):</span>
                  <span className="font-medium">
                    Frw {Math.round(order.price * 0.18).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base border-t pt-2">
                  <span>Total:</span>
                  <span className="text-orange-600">
                    Frw {Math.round(order.price * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-3">Order Items</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm">{order.items}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Quantity: {order.quantity}
                </span>
                <button className="text-orange-600 hover:text-orange-700 text-sm flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Items
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="font-medium mb-2">Special Instructions</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Rating Section */}
          {order.status === "Delivered" && (
            <div>
              <h3 className="font-medium mb-3">Customer Rating</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-6 h-6 ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({rating}/5)
                  </span>
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Customer feedback..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            {order.status === "New" && (
              <>
                <button
                  onClick={() => handleStatusUpdate("Delivered")}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Accept Order</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate("Rejected")}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject Order</span>
                </button>
              </>
            )}

            {order.status !== "New" && (
              <button
                onClick={() => handleStatusUpdate("New")}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Clock className="h-4 w-4" />
                <span>Reopen Order</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
