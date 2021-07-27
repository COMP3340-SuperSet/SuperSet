import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import RegisterForm from '../RegisterForm';
import Toast from '../Toast';

function Register() {
    return (
        <div>
            <Header currentUser={null} />
            <RegisterForm />
            <Toast />
        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
