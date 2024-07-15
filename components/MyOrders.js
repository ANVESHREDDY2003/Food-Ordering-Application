import React from 'react';
import axios from 'axios';
import './MyOrders.css'; // Import the CSS file

class MyOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            errorMessage: '',
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/orders')
            .then((response) => {
                console.log(response.data);
                // Update state with fetched orders
                this.setState({ orders: response.data });
            })
            .catch((error) => {
                console.log(error);
                // Handle error or update state with error message
                this.setState({ errorMessage: 'Failed to fetch orders' });
            });
    }

    render() {
        const { orders, errorMessage } = this.state;

        return (
            <div className="my-orders">
                <h3>All Orders</h3>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {orders.length > 0 ? (
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index}>
                                <p className="order-items">Order Items: {order.orderItems}</p>
                                <p className="total-price">Total Price: {order.totalPrice}</p>
                                <p className="status">Status: {order.status}</p> {/* Added status */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-orders-message">No orders found</p>
                )}
            </div>
        );
    }
}

export default MyOrders;
