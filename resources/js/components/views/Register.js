import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from '../RegisterForm';


function Register() {
    return (
        <div>
            <RegisterForm />
        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
