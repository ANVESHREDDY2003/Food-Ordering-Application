import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModifyOrders.css';

const ModifyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [updatedOrders, setUpdatedOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios
            .get('http://localhost:5000/api/orders')
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Failed to fetch orders');
            });
    };

    const handleStatusChange = (event, orderId) => {
        const updatedOrder = orders.find((order) => order._id === orderId);
        updatedOrder.status = event.target.value;

        const updatedOrdersArray = [...updatedOrders];
        const existingOrderIndex = updatedOrders.findIndex((order) => order._id === orderId);

        if (existingOrderIndex !== -1) {
            updatedOrdersArray[existingOrderIndex] = updatedOrder;
        } else {
            updatedOrdersArray.push(updatedOrder);
        }

        setUpdatedOrders(updatedOrdersArray);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put('http://localhost:5000/api/orders', updatedOrders)
            .then(() => {
                setUpdatedOrders([]);
                fetchOrders();
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Failed to update orders');
            });
    };

    return (
        <div className="modify-orders-container">
            <h3 className="modify-orders-heading">All Orders</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {orders.length > 0 ? (
                <form className="orders-form" onSubmit={handleSubmit}>
                    <ul className="orders-list">
                        {orders.map((order) => (
                            <li key={order._id} className="order-item">
                                <p className="order-details">Order Items: {order.orderItems}</p>
                                <p className="order-details">Total Price: {order.totalPrice}</p>
                                <label htmlFor={`status_${order._id}`} className="status-label">Status:</label>
                                <select
                                    id={`status_${order._id}`}
                                    value={order.status}
                                    onChange={(event) => handleStatusChange(event, order._id)}
                                    className="status-select"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="update-button">Update Orders</button>
                </form>
            ) : (
                <p className="no-orders-message">No orders found</p>
            )}
        </div>
    );
};

export default ModifyOrders;
