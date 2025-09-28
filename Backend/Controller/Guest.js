const Guest = require("../Models/GuestModel");

const getAllGuest = async (req, res) => {
  try {
    const { status, date } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.reservationDate = { $gte: startDate, $lt: endDate };
    }

    const guests = await Guest.find(query)
      .populate("tableId")
      .sort({ reservationDate: -1 });

    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const CreateGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const UpdateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { getAllGuest, CreateGuest, UpdateGuest };
