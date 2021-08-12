import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import LoginForm from '../LoginForm';
import Toast from '../Toast';
import { redirect } from '../../utils/redirect';

function Login() {
    useEffect(() => {
        axios.get("/api/check").then((response) => {
            if (response.data.user) redirect('/user', [{ key: "id", value: response.data.user.userid }]);
        });
    }, []);

    return (
        <div>
            <Header currentUser={null} />
            <LoginForm />
            <Toast />
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
