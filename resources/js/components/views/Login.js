import React from 'react';
import ReactDOM from 'react-dom';

function Login() {
    return (
        <div>
            I am the Login Component
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
