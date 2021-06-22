import React from 'react';
import ReactDOM from 'react-dom';

function Register() {
    return (
        <div>
            I am the Register Component
        </div>
    );
}

export default Register;

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
