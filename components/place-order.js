import React from 'react';
import axios from 'axios';

class PlaceOrder extends React.Component {
    placeOrder = () => {
        const { orderItems, totalPrice } = this.props;

        axios
            .post('http://localhost:5000/api/orders', {
                orderItems,
                totalPrice,
                status: 'Pending', // Added status property with initial value
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                // Handle error
            });
    };

    render() {
        return (
            <button onClick={this.placeOrder}>
                Place Order
            </button>
        );
    }
}

export default PlaceOrder;
