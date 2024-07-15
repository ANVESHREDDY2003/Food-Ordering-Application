import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignUp from './components/signup.component';
import Login from './components/logincomponent';
import SellerLogin from './components/sellerlogin.component';
import FoodOrdering from './components/foodordering.component';
import MyOrders from './components/MyOrders';
import PlaceOrder from './components/place-order';
import CartPage from './components/CartPage';
import ModifyOrders from './components/ModifyOrders'; // <-- Add this line
import './App.css';

function App() {
  const [signedUp, setSignedUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [price, setTotalPrice] = useState(0);
  const [email, setUserEmail] = useState('');

  const handleSignUp = () => {
    setSignedUp(true);
  };

  const handleLogin = () => {
    setSignedUp(true);
  };

  const handleSellerLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setSignedUp(false);
    setLoggedIn(false);
  };

  const handlePlaceOrder = (price, email) => {
    setTotalPrice(price);
    setUserEmail(email);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {loggedIn && (
            <>
              <li>
                <Link to="/ModifyOrders">Modify Orders</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
          {!signedUp && !loggedIn && (
            <li>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
              <Link to="/sellerlogin">Seller Login</Link>
            </li>
          )}
          {signedUp && (
            <>
              <li>
                <Link to="/foodordering">Food Ordering</Link>
              </li>
              <li>
                <Link to="/myorders">My Orders</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {loggedIn && (
          <>
            <Route path="/ModifyOrders" element={<ModifyOrders />} />
            <Route path="/" element={<Navigate to="/" />} />
          </>
        )}

        {!signedUp && !loggedIn && (
          <Route path="/">
            <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/sellerlogin" element={<SellerLogin onSellerLogin={handleSellerLogin} />} />
          </Route>
        )}

        {signedUp && (
          <Route path="/">
            <Route path="/foodordering" element={<FoodOrdering />} />
            <Route path="/cart" element={<CartPage onPlaceOrder={handlePlaceOrder} />} />
            <Route path="/placeorder" element={<PlaceOrder userEmail={email} totalPrice={price} />} />
            <Route path="/myorders" element={<MyOrders userEmail={email} />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer>
        <p>&copy; {new Date().getFullYear()} Food Delivery App. All rights reserved to Anvesh Reddy.</p>
      </footer>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1 className='textc'>Welcome to My Food Ordering App</h1>
      <div className="center-image">
        <img src={require('./deliveryboy.jpg')} alt="Your Image" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
    </div>
  );
}

export default App;
