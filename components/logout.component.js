import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Perform any necessary logout logic here
        // ...

        // Redirect to the beginning of the application
        history.push('/');
    };

    return (
        <div>
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
