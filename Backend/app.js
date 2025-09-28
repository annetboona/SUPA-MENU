const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/Database");
//import swagger ui
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const ClientRoutes = require("./Routes/ClientRoutes");
const UserRoutes = require("./Routes/UsersRoutes");
const MenuItemRoute = require("./Routes/MenuItemRoute");
const RestaurantRoutes = require("./Routes/RestaurantRoutes");
const GuestRoutes = require("./Routes/GuestRoutes");
const TableRoutes = require("./Routes/TableRoutes");
const OrderRoutes = require("./Routes/OrdersRoute");
// mongodb connection
connectDB();

app.use("/api/clients", ClientRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/menuitems", MenuItemRoute);
app.use("/api/restaurant", RestaurantRoutes);
app.use("/api/guests", GuestRoutes);
app.use("/api/tables", TableRoutes);
app.use("/api/orders", OrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
