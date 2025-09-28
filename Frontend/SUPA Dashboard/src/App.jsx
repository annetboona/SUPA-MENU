import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantRegister from "./pages/RestaurantRegister";
import SupaMenuLanding from "./Components/SupaMenuLanding";
import ClientForm from "./Components/Clients/ClientForm";
import ClientReport from "./Components/Clients/ClientReport";
import Clients from "./pages/Dashboard/Clients";
import MenuForm from "./Components/Menu/MenuForm";
import OrderForm from "./Components/Orders/OrderForm";
import OrderDetails from "./Components/Orders/OrderDetail";
import OrderList from "./Components/Orders/OrderList";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SupaMenuLanding />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/registerRestaurant" element={<RestaurantRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client/add" element={<ClientForm />} />
        <Route  path="/client/edit/:id" element={<ClientForm />}/>
        <Route path="/clients/:id" element={<ClientReport />} />
        <Route path="/Clients" element={<Clients />} />
        <Route path="/menuForm" element={<MenuForm />}></Route>
        <Route path="/orderForm" element={<OrderForm />}></Route>
        <Route path="/orderDetail" element={<OrderDetails />}></Route>
        <Route path="/orderList" element={<OrderList />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
