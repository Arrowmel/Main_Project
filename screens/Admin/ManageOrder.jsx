import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);

    // Function to fetch order data
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to handle order deletion
    const deleteOrderDetails = async (orderId, orderDataIndex) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/${orderDataIndex}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete order details');
            }
            // Update the frontend state after successful deletion
            const updatedOrders = [...orders];
            updatedOrders.forEach(order => {
                if (order._id === orderId) {
                    order.order_data.splice(orderDataIndex, 1);
                }
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error deleting order details:', error);
        }
    };

    // CSS styles as JavaScript objects
    const styles = {
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#fff',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        row: {
            borderBottom: '1px solid #ddd',
        },
        cell: {
            padding: '12px',
            textAlign: 'left',
            borderRight: '1px solid #ddd',
        },
        list: {
            listStyleType: 'none',
            padding: 0,
        },
        item: {
            marginBottom: '10px',
        },
        deleteBtn: {
            backgroundColor: '#ff6347',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
        },
        deleteBtnHover: {
            backgroundColor: '#cc4635',
        },
    };
    const goBack = () => {
      window.history.back();
  };

    return (
        <div>
          <AdminNavbar/>
            <h1 style={styles.heading}>Manage Orders</h1>
            <button style={styles.backButton} onClick={goBack}>Back</button> 
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.cell}>Email</th>
                        <th style={styles.cell}>Order Date</th>
                        <th style={styles.cell}>Order Details</th>
                        <th style={styles.cell}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <React.Fragment key={order._id}>
                            {order.order_data.map((orderData, index) => (
                                <tr key={`${order._id}-${index}`} style={styles.row}>
                                    {index === 0 && (
                                        <td rowSpan={order.order_data.length} style={{...styles.cell, paddingBottom: '8px'}}>{order.email}</td>
                                    )}
                                    {orderData[0] && (
                                        <td style={styles.cell}>{new Date(orderData[0].Order_date).toLocaleDateString()}</td>
                                    )}
                                    <td style={styles.cell}>
                                        <ul style={styles.list}>
                                            {orderData.slice(1).map((item, itemIndex) => (
                                                <li key={itemIndex} style={styles.item}>
                                                    <strong>Name:</strong> {item.name}<br />
                                                    <strong>Quantity:</strong> {item.qty}<br />
                                                    <strong>Size:</strong> {item.size}<br />
                                                    <strong>Price:</strong> ₹{item.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td style={styles.cell}>
                                        <button
                                            style={styles.deleteBtn}
                                            onClick={() => deleteOrderDetails(order._id, index)}
                                            onMouseOver={(e) => e.target.style.backgroundColor = styles.deleteBtnHover.backgroundColor}
                                            onMouseOut={(e) => e.target.style.backgroundColor = styles.deleteBtn.backgroundColor}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <Footer/>
        </div>
    );
};

export default ManageOrder;
