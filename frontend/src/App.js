import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Reg";
import BNavbar from "./components/templates/BNavbar";
import Login from "./components/common/Login"
import ViewFood from "./components/Vendor/ViewFood"
import EditFood from "./components/Vendor/EditFood";
import AddFood from "./components/Vendor/AddFood"
import BViewFood from "./components/users/ViewFood"
import Wallet from "./components/users/Wallet"
import BViewProfile from "./components/users/ViewProfile"
import VViewProfile from "./components/Vendor/ViewProfile"
import ViewOrder from "./components/users/ViewOrder"
import VViewOrder from "./components/Vendor/ViewOrder"
import Stats from "./components/Vendor/Statistics"
import Rating from "./components/users/Rating"
import BuyerDashBoard from "./components/users/DashBoard";
import BEditProfile from "./components/users/editBuyerProfile"
import VEditProfile from "./components/Vendor/editprofile"
import VNavBar from "./components/templates/VNavbar"
import Navbar from "./components/templates/Navbar"
import VDashboard from "./components/Vendor/DashBoard"
import Makeorder from "./components/users/makeOrder"
function App() {
  const [store, setStore] = useState({
    token: undefined,
    user: undefined,
  });
  var user_find = JSON.parse(window.sessionStorage.getItem("user"));
  var type=window.sessionStorage.getItem("type");
  
  const Layout = () => {
  if(user_find!==null)
  {
if(type=="Buyer")
{
  return (
    <div>
      {
        
      <BNavbar />}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
else
{
  return (
    <div>
      {
        
      <VNavBar />}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
  }
  else{
    return (
      <div>
        {
          
        <Navbar />}
        <div className="container">
          <Outlet />
        </div>
      </div>
    );}
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="viewfood" element={<ViewFood />} />
          <Route path="editfood" element={<EditFood />} />
          <Route path="addfood" element={<AddFood />} />
          <Route path="bviewfood" element={<BViewFood />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="bviewprofile" element={<BViewProfile />} />
          <Route path="vviewprofile" element={<VViewProfile />} />
          <Route path="bvieworder" element={<ViewOrder />} />
          <Route path="vieworder" element={<VViewOrder />} />
          <Route path="stats" element={<Stats />} />
          <Route path="rating" element={<Rating />} />
          <Route path="bdashboard" element={<BuyerDashBoard />} />
          <Route path="beditprofile" element={<BEditProfile />} />
          <Route path="vdashboard" element={<VDashboard />} />
          <Route path="makeorder" element={<Makeorder />} />
          <Route path="veditprofile" element={<VEditProfile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
