import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdminNavbar from './AdminNavbar';
// import ManageFoodItems from './ManageFoodItem';
// import ManageUsers from './ManageUser';
// import ManageOrders from './ManageOrder';

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('manage-food');
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [income, setIncome] = useState(0);
  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  useEffect(() => {
    // Fetch user count
    fetchUserCount();
    // Fetch order count
    fetchOrderCount();
    // Fetch income
    fetchIncome();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Function to fetch user count
  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/count");
      const data = await response.json();
      setUserCount(data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Function to fetch order count
  const fetchOrderCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders/count");
      const data = await response.json();
      setOrderCount(data.count);
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  };

  // Function to fetch income
  const fetchIncome = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/income");
      const data = await response.json();
      setIncome(data.income);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container" style={{ marginBottom: '50px' }}>
        {/* Tabs or Sections for managing food items, users, and orders */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className={`nav-link fs-5 ${activeTab === 'manage-food' ? 'active' : ''}`} to="/manage-food" onClick={() => handleTabChange('manage-food')}>
              Manage Food Items
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link fs-5 ${activeTab === 'manage-users' ? 'active' : ''}`} to="/manage-users" onClick={() => handleTabChange('manage-users')}>
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link fs-5 ${activeTab === 'manage-orders' ? 'active' : ''}`} to="/manage-orders" onClick={() => handleTabChange('manage-orders')}>
              Manage Orders
            </Link>
          </li>
        </ul>
        {/* Display user count, order count, and income */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={boxStyle}>
    <h3>User Count: {userCount}</h3>
  </div>
  <div style={boxStyle}>
    <h3>Order Count: {orderCount}</h3>
  </div>
  <div style={boxStyle}>
    <h3>Income: ${income}</h3>
  </div>
</div>
      </div>
      <Footer />
    </div>
  );
}
