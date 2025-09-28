const Clients = require("../Models/ClientsModel")

// Create a new client
const createClient = async (req, res) => {
  try {
    const client = new Clients(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
// get all clients
const getAllClients = async (req, res) => {
    try {
      const {
        sortField,
        sortOrder,
        category,
        search,
        page = 1,
        limit = 10,
      } = req.query;
      let query = {};

      if (category) {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { clientName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ];
      }

      let sort = {};
      if (sortField) {
        sort[sortField] = sortOrder === "desc" ? -1 : 1;
      } else {
        sort.createdAt = -1; // Default sort
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const clients = await Clients.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      const totalClients = await Clients.countDocuments(query);

      res.json({
        clients,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalClients / parseInt(limit)),
        totalClients,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get a single client by ID
const getClientById = async (req, res) => {
  try {
    const client = await Clients.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a client by ID
const updateClient = async (req, res) => {
  try {
    const client = await Clients.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a client by ID

const deleteClient = async (req, res) => {
  try {
    const client = await Clients.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
