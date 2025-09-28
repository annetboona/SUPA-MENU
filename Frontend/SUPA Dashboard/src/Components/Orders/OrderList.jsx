import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const OrderList = ({ orders, onOrderClick, onStatusUpdate, onDeleteOrder }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "New":
        return <Clock className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const ActionMenu = ({ order, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
        <div className="p-2">
          <button
            onClick={() => {
              onOrderClick(order);
              onClose();
            }}
            className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>

          {order.status === "New" && (
            <>
              <button
                onClick={() => {
                  onStatusUpdate(order.id, "Delivered");
                  onClose();
                }}
                className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded text-green-600"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark as Delivered</span>
              </button>
              <button
                onClick={() => {
                  onStatusUpdate(order.id, "Rejected");
                  onClose();
                }}
                className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject Order</span>
              </button>
            </>
          )}

          <hr className="my-1" />
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this order?")
              ) {
                onDeleteOrder(order.id);
              }
              onClose();
            }}
            className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Order</span>
          </button>
        </div>
      </div>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Clock className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders found
        </h3>
        <p className="text-gray-500">
          Orders will appear here when customers place them.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500">
          <span>Order Info</span>
          <span>Items</span>
          <span>Price</span>
          <span>Status</span>
          <span>Quantity</span>
          <span>Actions</span>
        </div>
      </div>

      {/* Order Rows */}
      <div className="divide-y divide-gray-100">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onOrderClick(order)}
          >
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* Order Info */}
              <div>
                <p className="font-medium text-orange-600">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{order.table}</p>
                <p className="text-xs text-gray-400">{order.time}</p>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm line-clamp-2">{order.items}</p>
              </div>

              {/* Price */}
              <div>
                <p className="font-medium text-orange-600">
                  Frw {order.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  {order.customer || "Guest"}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </span>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {order.quantity}
                </p>
              </div>

              {/* Actions */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActionMenuOpen(
                      actionMenuOpen === order.id ? null : order.id
                    );
                  }}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                <ActionMenu
                  order={order}
                  isOpen={actionMenuOpen === order.id}
                  onClose={() => setActionMenuOpen(null)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
