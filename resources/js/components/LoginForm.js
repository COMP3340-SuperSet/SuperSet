import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
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
        axios.post('/api/login',
            {
                email: email,
                password: password,
            }, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            storeToken(response.data.token);
            axios.get('/auth', {
                headers: {
                    Authorization: 'Bearer ' + response.data.token
                }
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
            });
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    return (
        <Container>
            <Form onSubmit={(e) => onLoginSubmit(e)}>
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
        </Container>

    );
}


export default LoginForm;