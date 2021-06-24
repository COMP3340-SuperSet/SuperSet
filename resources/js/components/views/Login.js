import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from '../LoginForm';

function Login() {
    return (
        <div>
            <LoginForm/>
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
