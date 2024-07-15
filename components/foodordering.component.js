import React, { useState } from 'react';
import './foodordering.css';
import CartPage from './CartPage';

const FoodOrdering = () => {
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCart, setShowCart] = useState(false);

    const handleFoodSelect = (food) => {
        const existingFood = selectedFoods.find((item) => item.id === food.id);
        if (existingFood) {
            const updatedSelectedFoods = selectedFoods.map((item) =>
                item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setSelectedFoods(updatedSelectedFoods);
        } else {
            setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, { ...food, quantity: 1 }]);
        }
        setTotalPrice((prevTotalPrice) => prevTotalPrice + food.price);
    };

    const handleFoodDelete = (food) => {
        const existingFood = selectedFoods.find((item) => item.id === food.id);
        if (existingFood && existingFood.quantity > 1) {
            const updatedSelectedFoods = selectedFoods.map((item) =>
                item.id === food.id ? { ...item, quantity: item.quantity - 1 } : item
            );
            setSelectedFoods(updatedSelectedFoods);
        } else {
            setSelectedFoods((prevSelectedFoods) =>
                prevSelectedFoods.filter((item) => item.id !== food.id)
            );
        }
        setTotalPrice((prevTotalPrice) => prevTotalPrice - food.price);
    };

    const showFoodOrdering = () => {
        return (
            <div className="food-ordering-container">
                <div className="cart-button">
                    <button onClick={() => setShowCart(true)}>Go to Cart</button>
                </div>
                <h3>Food Ordering</h3>

                <div className="selected-foods">
                    <h4>Selected Foods:</h4>
                    {selectedFoods.length > 0 ? (
                        <ul>
                            {selectedFoods.map((food) => (
                                <li key={food.id}>
                                    <div className="food-item">
                                        <div className="food-item-image">
                                            <img src={food.image} alt={food.name} />
                                        </div>
                                        <div className="food-item-details">
                                            <h5>
                                                {food.name} {food.quantity > 1 ? `(+${food.quantity})` : ''}
                                            </h5>
                                            <p>${food.price.toFixed(2)}</p>
                                            <button onClick={() => handleFoodDelete(food)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No foods selected</p>
                    )}
                    <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>

                <div className="available-foods">
                    <h4>Available Foods:</h4>
                    <ul>
                        <li>
                            <div className="food-item">
                                <div className="food-item-image">
                                    <img src={require('./burger.jpg')} alt="Burger" />
                                </div>
                                <div className="food-item-details">
                                    <h5>Burger</h5>
                                    <p>$8.99</p>
                                    <button
                                        onClick={() =>
                                            handleFoodSelect({ id: 1, name: 'Burger', price: 8.99, image: require('./burger.jpg') })
                                        }
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="food-item">
                                <div className="food-item-image">
                                    <img src={require('./pizza.jpg')} alt="Pizza" />
                                </div>
                                <div className="food-item-details">
                                    <h5>Pizza</h5>
                                    <p>$10.99</p>
                                    <button
                                        onClick={() =>
                                            handleFoodSelect({ id: 2, name: 'Pizza', price: 10.99, image: require('./pizza.jpg') })
                                        }
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="food-item">
                                <div className="food-item-image">
                                    <img src={require('./pasta.jpg')} alt="Pasta" />
                                </div>
                                <div className="food-item-details">
                                    <h5>Pasta</h5>
                                    <p>$12.99</p>
                                    <button
                                        onClick={() =>
                                            handleFoodSelect({ id: 3, name: 'Pasta', price: 12.99, image: require('./pasta.jpg') })
                                        }
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="food-item">
                                <div className="food-item-image">
                                    <img src={require('./noodles.jpg')} alt="Noodles" />
                                </div>
                                <div className="food-item-details">
                                    <h5>Noodles</h5>
                                    <p>$9.99</p>
                                    <button
                                        onClick={() =>
                                            handleFoodSelect({ id: 4, name: 'Noodles', price: 9.99, image: require('./noodles.jpg') })
                                        }
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div>
            {showCart ? (
                <div className="cart-page-container">
                    <CartPage selectedFoods={selectedFoods} totalPrice={totalPrice} handleFoodDelete={handleFoodDelete} />
                    <div className="back-button">
                        <button onClick={() => setShowCart(false)}>Go Back</button>
                    </div>
                </div>
            ) : (
                showFoodOrdering()
            )}
        </div>
    );
};

export default FoodOrdering;
