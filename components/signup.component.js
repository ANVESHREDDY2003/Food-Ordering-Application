import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

export const UserMailContext = React.createContext(); // Create the UserMailContext

const SignUp = ({ onSignUp }) => {
    const navigate = useNavigate();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fname, lname, email, password);

        axios
            .post('http://localhost:5000/register', {
                fname,
                lname,
                email,
                password,
            })
            .then((response) => {
                console.log(response.data);
                // Call the onSignUp callback if provided
                if (onSignUp) {
                    onSignUp();
                }
                // Navigate to the root path ("/")
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <UserMailContext.Provider value={email}> {/* Provide the email value to the context */}
            <form onSubmit={handleSubmit} className="form-container">
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>First name</label>
                    <input type="text" placeholder="First name" onChange={(e) => setFname(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Last name</label>
                    <input type="text" placeholder="Last name" onChange={(e) => setLname(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password">
                    <div>
                        Already registered <Link to="/login">Sign In?</Link>
                    </div>
                </p>
            </form>
        </UserMailContext.Provider>
    );
};

export default SignUp;
