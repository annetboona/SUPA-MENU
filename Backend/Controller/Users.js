// controllers/userController.js
const User = require("../Models/UsersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }
    console.log("Login attempt:", req.body);

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//update user
const UpdateUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const notifications = [
  { id: 1, message: "Welcome to SupaMenu!", createdAt: new Date() },
  { id: 2, message: "New order received.", createdAt: new Date() },
];

const getAllnotifications = async (req, res) => {
  try {
    const userNotifications = notifications
      .map((n) => ({ ...n, userId: 1 })) 
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(userNotifications);
  } catch (error) {
    console.error("Error in getAllnotifications:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getNotificationsUnread =

  async (req, res) => {
    try {
      // In a real app, count unread notifications from database
      const unreadCount = notifications.filter((n) => !n.read).length;
      res.json({ count: unreadCount });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }


const UpdatenotificationsReadById =  async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    const notificationIndex = notifications.findIndex(
      (n) => n.id === notificationId
    );

    if (notificationIndex === -1) {
      return res.status(404).json({ error: "Notification not found" });
    }

    notifications[notificationIndex].read = true;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
const UpdateNotificationAllRead = async (req, res) => {
  try {
    notifications.forEach((notification) => {
      notification.read = true;
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const logout = async (req, res) => {
  res.json({ message: "logged out successfully" });
};
module.exports = {
  registerUser,
  login,
  getCurrentUser,
  getAllUsers,
  UpdateUser,
  deleteUser,
  logout,
  getAllnotifications,
  getNotificationsUnread,
  UpdateNotificationAllRead,
  UpdatenotificationsReadById

}
