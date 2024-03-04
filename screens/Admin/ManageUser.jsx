import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdminNavbar from './AdminNavbar';

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    // Function to fetch user data
    const fetchUsers = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/users');
          if (!response.ok) {
              throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
      } catch (error) {
          console.error('Error fetching users:', error);
      }
  };

    useEffect(() => {
        fetchUsers();
    }, []); // Fetch users data when component mounts

    // Function to handle user deletion
    const deleteUser = async (userId) => {
        try {
            await fetch(`http://localhost:5000/api/users/${userId}`, { method: 'DELETE' }); // Assuming endpoint for deleting a user
            setUsers(users.filter(user => user._id !== userId)); // Update state after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to go back to previous page
    const goBack = () => {
        window.history.back();
    };

    return (
        <div>
            <AdminNavbar />
            <h1 style={styles.heading}>Manage Users</h1>
            <button style={styles.backButton} onClick={goBack}>Back</button> {/* Back button */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableCell}>Name</th>
                        <th style={styles.tableCell}>Email</th>
                        <th style={styles.tableCell}>Location</th>
                        <th style={styles.tableCell}>Date</th>
                        <th style={styles.tableCell}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={styles.tableCell}>{user.name}</td>
                            <td style={styles.tableCell}>{user.email}</td>
                            <td style={styles.tableCell}>{user.location}</td>
                            <td style={styles.tableCell}>{new Date(user.Date).toLocaleDateString()}</td>
                            <td style={styles.tableCell}>
                                {/* <button onClick={() => viewDetails(user)}>View Details</button> */}
                                <button onClick={() => deleteUser(user._id)} style={styles.button}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

// Inline styles
// Function to define styles
const styles = {
  heading: {
    textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#fff', 
  },
  table: {
      width: '100%',
      borderCollapse: 'collapse',
  },
  tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
      backgroundColor: '#000',
      textAlign: 'left',
      color: '#fff', // Set font color to black
  },
  button: {
      backgroundColor: '#ff6347',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
  },
};


export default ManageUser;
