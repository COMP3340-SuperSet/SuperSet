import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import LoginForm from '../LoginForm';

function Login() {
    return (
        <div>
            <Header currentUser = {null} />
            <LoginForm />
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
