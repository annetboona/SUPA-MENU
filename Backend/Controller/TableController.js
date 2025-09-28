const Table = require("../Models/TableModel");
const Restaurant = require("../Models/CreateResturantModel");

// Table Routes
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const CreateTable = async (req, res) => {
  try {
    const { number, name, capacity, restaurantId, location } = req.body;
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      user: req.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found or unauthorized" });
    }

    const existingTable = await Table.findOne({
      restaurant: restaurantId,
      number: number,
    });

    if (existingTable) {
      return res.status(400).json({ message: "Table number already exists" });
    }

    const table = new Table({
      number,
      name,
      capacity: parseInt(capacity),
      location: location || "main-hall",
      restaurant: restaurantId,
      qrCode: `${restaurantId}-${number}-${Date.now()}`,
    });

    await table.save();

    res.status(201).json({
      message: "Table created successfully",
      table,
    });
  } catch (error) {
    console.error("Table creation error:", error);
    res.status(500).json({ message: "Server error creating table" });
  }
};

module.exports = { getAllTables, CreateTable };
