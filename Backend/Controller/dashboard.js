const Restaurant = require("../Models/CreateResturantModel");
const Clients = require("../Models/ClientsModel");
const Order = require("../Models/OrderModel");
const MenuItem = require("../Models/MenuItemModel");

const getAnalytics = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.restaurantId,
      owner: req.user.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "Restaurant not found or unauthorized" });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - 7));
    const startOfMonth = new Date(today.setMonth(today.getMonth() - 1));

    const [
      todayOrders,
      weeklyOrders,
      monthlyOrders,
      todayRevenue,
      weeklyRevenue,
      monthlyRevenue,
      totalMenuItems,
    ] = await Promise.all([
      Order.countDocuments({
        restaurant: req.params.restaurantId,
        createdAt: { $gte: startOfDay },
      }),
      Order.countDocuments({
        restaurant: req.params.restaurantId,
        createdAt: { $gte: startOfWeek },
      }),
      Order.countDocuments({
        restaurant: req.params.restaurantId,
        createdAt: { $gte: startOfMonth },
      }),
      Order.aggregate([
        {
          $match: {
            restaurant: mongoose.Types.ObjectId(req.params.restaurantId),
            createdAt: { $gte: startOfDay },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.aggregate([
        {
          $match: {
            restaurant: mongoose.Types.ObjectId(req.params.restaurantId),
            createdAt: { $gte: startOfWeek },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.aggregate([
        {
          $match: {
            restaurant: mongoose.Types.ObjectId(req.params.restaurantId),
            createdAt: { $gte: startOfMonth },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      MenuItem.countDocuments({
        restaurant: req.params.restaurantId,
        isAvailable: true,
      }),
    ]);

    res.json({
      orders: {
        today: todayOrders,
        weekly: weeklyOrders,
        monthly: monthlyOrders,
      },
      revenue: {
        today: todayRevenue[0]?.total || 0,
        weekly: weeklyRevenue[0]?.total || 0,
        monthly: monthlyRevenue[0]?.total || 0,
      },
      menuItems: totalMenuItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get clients by category
const getClientsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const clients = await Clients.find({
      category: new RegExp(category, "i"),
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: clients,
      count: clients.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching clients by category",
      error: error.message,
    });
  }
};

// Search clients by name or representative
const searchClients = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long",
      });
    }

    const clients = await Clients.find({
      $or: [
        { name: new RegExp(query, "i") },
        { representative: new RegExp(query, "i") },
      ],
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: clients,
      count: clients.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching clients",
      error: error.message,
    });
  }
};

// Get client statistics
const getClientStats = async (req, res) => {
  try {
    const totalClients = await Clients.countDocuments();

    const categoryStats = await Clients.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const recentClients = await Clients.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category representative createdAt");

    res.status(200).json({
      success: true,
      data: {
        totalClients,
        categoryStats,
        recentClients,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching client statistics",
      error: error.message,
    });
  }
};

// Get clients created within a date range
const getClientsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Both startDate and endDate are required (YYYY-MM-DD format)",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the entire end date

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const clients = await Clients.find({
      dateOfCreation: {
        $gte: start,
        $lte: end,
      },
    }).sort({ dateOfCreation: -1 });

    res.status(200).json({
      success: true,
      data: clients,
      count: clients.length,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching clients by date range",
      error: error.message,
    });
  }
};
module.exports = {
  getClientsByCategory,
  getAnalytics,
  getClientsByDateRange,
  getClientStats,
  searchClients,
};
