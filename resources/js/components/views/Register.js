import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import RegisterForm from '../RegisterForm';

function Register() {
    return (
        <div>
            <Header currentUser = {null} />
            <RegisterForm />
        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
