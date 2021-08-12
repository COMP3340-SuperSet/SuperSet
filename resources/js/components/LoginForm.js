import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import axios from 'axios';

import { storeToken } from '../utils/localStorage';
import { fetchReferer } from '../utils/sessionStorage';
import { redirect } from '../utils/redirect';
import { toast } from './Toast';

import ErrorMessage from './ErrorMessage';

const LoginForm = () => {

    //username can also be entered as password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const onLoginSubmit = (event) => {
        event.preventDefault();

        /**
         * post request for a user to login 
         */
        axios.get('/sanctum/csrf-cookie', {
            withCredentials: true
        }).then(response => {
            axios.post('/api/login',
                {
                    username,
                    password
                }, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    withCredentials: true
                }
            }).then(response => {
                storeToken(response.data.token);
                redirect(fetchReferer() ? fetchReferer() : '/');
            }).catch(error => {
                setErrors(error.response.data.errors);
            });
        }).catch((err) => {
            toast("Error fetching sanctum cookie", "error");
        });
    }

    return (
        <Grid container centered style={{ marginTop: "50px" }} >
            <Grid.Row>
                <Grid.Column width={12}>
                    <Form onSubmit={(e) => onLoginSubmit(e)} size="large">
                        <Form.Field>
                            <label className = "ss-text-primary"> Username / Email </label>
                            <input autoFocus="autoFocus" id='username' placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label className = "ss-text-primary"> Password </label>
                            <input id='password' placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Field>
                        <ErrorMessage errors={errors} type='login'></ErrorMessage>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}


export default LoginForm;