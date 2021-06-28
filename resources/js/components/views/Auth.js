import React from 'react';
import { fetchToken } from '../../utils/localStorage';

const Auth = () => {

    const authenticated = fetchToken()

    return (
        <div>
            This is the Auth Test
        </div>
    );
}

export default Auth;


if (document.getElementById('auth')) {
    ReactDOM.render(<Auth />, document.getElementById('auth'));
}
