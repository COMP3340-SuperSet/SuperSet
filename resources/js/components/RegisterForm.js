import React, { useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { storeToken } from '../utils/localStorage';
import { redirect } from '../utils/redirect';
import { referer } from '../utils/redirect';

const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_Confirmation] = useState('');

    const onRegisterSubmit = (event) => {
        event.preventDefault();

        /**
         * post request for registered user
         * stores token on register success
         */
        axios.post('/api/register',
            {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,

            }, {
            headers: {
                Accept: 'application/json',
            }
        }).then(response => {
            storeToken(response.data.token);
            console.log('register: ', response);
            redirect(fetchReferer() ? fetchReferer() : '/');
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    return (

        <Container>
            <Form onSubmit={(e) => onRegisterSubmit(e)}>
                <Form.Field>
                    <label>
                        Name
                    </label>
                    <input id='name' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>
                        Email
                    </label>
                    <input id='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>
                        Password
                    </label>
                    <input id='password' placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <input id='password_confirmation' placeholder="Confirm Password" value={password_confirmation} type="password" onChange={(e) => setPassword_Confirmation(e.target.value)} />
                </Form.Field>
                <Button type='submit'>Register</Button>
            </Form>
        </Container>

    );
}


export default RegisterForm;