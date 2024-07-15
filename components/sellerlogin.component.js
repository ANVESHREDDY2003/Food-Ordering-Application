import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerLogin.css';

const SellerLogin = ({ onSellerLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you can perform any authentication logic if needed
        // For this example, we'll assume the email and password are correct
        if (email === 'anvesh@seller.com' && password === '123456') {
            onSellerLogin();
            navigate('/');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="form-container">
            <h3>Seller Login</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="d-grid">
                    <button className="submit-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default SellerLogin;
