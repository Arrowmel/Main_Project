import './App.css';
import Home from './screens/Home';
import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder.jsx';
import AdminSign from './screens/Admin/AdminSign.jsx';
import AdminLogin from './screens/Admin/AdminLogin.jsx'
import AdminHome from './screens/Admin/AdminHome.jsx';
import ManageFoodItem from './screens/Admin/ManageFoodItem.jsx';
import ManageUser from './screens/Admin/ManageUser.jsx';
import ManageOrder from './screens/Admin/ManageOrder.jsx';

function App() {
  return (
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path="/"element={<Home/>}/>
        <Route exact path="/login"element={<Login/>}/>
        <Route exact path="/createuser"element={<Signup/>}/>
        <Route exact path="/myOrder"element={<MyOrder/>}/>
        <Route exact path="/createadmin"element={<AdminSign/>}/>
        <Route exact path="/adminlogin"element={<AdminLogin/>}/>
        <Route exact path="/adminhome"element={<AdminHome/>}/>
        <Route exact path="/manage-food"element={<ManageFoodItem/>}/>
        <Route exact path="/manage-users"element={<ManageUser/>}/>
        <Route exact path="/manage-orders"element={<ManageOrder/>}/>
      </Routes>
    </div>
    </Router>
    </CartProvider>
    
    
  );
}

export default App;
