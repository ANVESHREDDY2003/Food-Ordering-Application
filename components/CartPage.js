import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserMailContext } from './signup.component';
import { UsereMailContext } from './logincomponent';
import './CartPage.css';

const CartPage = ({ selectedFoods, totalPrice, handleFoodDelete }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const email = useContext(UsereMailContext); // Access the email from UserMailContext

    const handlePlaceOrder = (orderItems, totalPrice) => {
        console.log(orderItems, totalPrice)
        axios
            .post('http://localhost:5000/api/orders', {
                // Pass the email in the request
                orderItems,
                totalPrice,
            })
            .then((response) => {
                console.log(response.data);
                setOrderPlaced(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="cart-page">
            <h3>Cart Page</h3>
            {selectedFoods.length > 0 ? (
                <ul>
                    {selectedFoods.map((food) => (
                        <li key={food.id} className="food-item">
                            <div className="food-item-image">
                                <img src={food.image} alt={food.name} />
                            </div>
                            <div className="food-item-details">
                                <h5>{food.name}</h5>
                                <p className="food-price">${food.price.toFixed(2)}</p>
                                <button className="remove-button" onClick={() => handleFoodDelete(food)}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-cart-message">No foods in the cart</p>
            )}
            <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
            {selectedFoods.length > 0 && (
                <>
                    <button
                        className="place-order-button"
                        onClick={() => handlePlaceOrder(selectedFoods.map((food) => food.name).join(', '), totalPrice)}
                    >
                        Place Order
                    </button>
                    {orderPlaced && (
                        <p className="order-success-message">
                            Order Placed Successfully!, Your order will be arriving soon
                        </p>
                    )}
                </>
            )}
            <Link to="/" className="back-to-home-link">
                Back to Home
            </Link>
        </div>
    );
};

export default CartPage;
