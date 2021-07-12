import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import LoginForm from '../LoginForm';
import Toast from '../Toast';

function Login() {
    return (
        <div>
            <Header currentUser = {null} />
            <LoginForm />
            <Toast/>
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
