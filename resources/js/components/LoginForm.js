import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
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
         * 
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
                console.error(error.response.data);
                setErrors(error.response.data.errors);
            });
        });

    }

    return (
        <Grid container centered style={{ marginTop: "50px" }} >
            <Grid.Row>
                <Grid.Column width={12}>
                    <Form onSubmit={(e) => onLoginSubmit(e)} size="large">
                        <Form.Field>
                            <label>
                                Username / Email
                            </label>
                            <input id='username' placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Password
                            </label>
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