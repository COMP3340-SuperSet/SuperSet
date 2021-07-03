import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { storeToken } from '../utils/localStorage';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginSubmit = (event) => {
        event.preventDefault();

        console.log('email: ', email);
        console.log('password: ', password);

        /**
         * post request for a user to login
         * 
         */
        axios.get('/sanctum/csrf-cookie', {
            withCredentials: true
        }).then(response => {
            console.log('crsf: ', response);
            axios.post('/api/login',
                {
                    email: email,
                    password: password,
                }, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    withCredentials: true
                }
            }).then(response => {
                console.log('login: ', response);
                storeToken(response.data.token);
            }).catch(error => {
                console.log(error.response.data);
            });
        });

    }

    return (
        <Grid container centered style = {{marginTop: "50px"}} >
            <Grid.Row>
                <Grid.Column width = {12}>
                    <Form onSubmit={(e) => onLoginSubmit(e)} size = "large">
                        <Form.Field>
                            <label>
                                Email
                            </label>
                            <input id='email' placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Password
                            </label>
                            <input id='password' placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Field>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}


export default LoginForm;