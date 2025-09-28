const Order = require("../Models/OrderModel");
const MenuItem = require("../Models/MenuItemModel");
const client = require("../Models/ClientsModel");
// Get all orders with pagination and filtering
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const clientId = req.query.clientrId;

    const filter = {};
    if (status && status !== "All") {
      filter.status = status;
    }
    if (clientId) {
      filter.clientId = clientId;
    }

    const orders = await Order.find(filter)
      .populate("clientId", "name email phone")
      .populate("items.menuItemId", "name image category")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalOrders: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order by ID
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("clientId", "name email phone address")
      .populate("items.menuItemId", "name image category  price description")
      .populate("tableId", "tableNumber");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new order
const createNewOrder = async (req, res) => {
  try {
    const { clientId, clientName, items, tableNumber, notes } = req.body;

    // Validate customer exists
    const client = await client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Validate and populate menu items
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res
          .status(404)
          .json({ message: `Menu item ${item.menuItemId} not found` });
      }

      if (!menuItem.isAvailable) {
        return res
          .status(400)
          .json({ message: `${menuItem.name} is not available` });
      }

      const orderItem = {
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        size: item.size || menuItem.size,
        description: menuItem.description,
        image: menuItem.image,
      };

      orderItems.push(orderItem);
      totalAmount += menuItem.price * item.quantity;
    }

    const order = new Order({
      clientId,
      clientName: clientName || client.name,
      items: orderItems,
      totalAmount,
      tableNumber,
      notes,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000),
    });

    await order.save();

    // Add to customer's order history
    client.orderHistory.push(order._id);
    await customer.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("clientId", "name email phone")
      .populate("items.menuItemId", "name image category price")
      .populate("tableId", "tableNumber");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("clientId", "name email phone")
      .populate("tableId", "tableNumber")
      .populate("item.menuItem", "name category price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order steps
const updateOrder = async (req, res) => {
  try {
    const { orderSteps } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderSteps },
      { new: true }
    )
      .populate("clientId", "name email")
      .populate("tableId", "tableNumber")
      .populate("items.menuItem", "name category price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add rating and review
const viewOrder = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { rating, review },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createNewOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  viewOrder,
};
