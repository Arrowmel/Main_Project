import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/adminlogin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/adminhome">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
              <li className='nav-item'>
                <Link className="nav-link active fs-5" aria-current="page" to="/adminhome">Home</Link>
              </li>
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/adminlogin">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createadmin">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
