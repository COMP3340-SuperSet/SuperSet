import React, { useState } from 'react';
import { Form, Button, Grid, Popup } from 'semantic-ui-react';
import axios from 'axios';

import { storeToken } from '../utils/localStorage';
import { redirect } from '../utils/redirect';

import ErrorMessage from './ErrorMessage';

const RegisterForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_Confirmation] = useState('');
    const [errors, setErrors] = useState(null);

    const onRegisterSubmit = (event) => {
        event.preventDefault();

        /**
         * post request for registered user
         * stores token on register success
         */
        axios.post('/api/register',
            {
                username,
                email,
                password,
                password_confirmation,
            }, {
            headers: {
                Accept: 'application/json',
            }
        }).then(response => {
            storeToken(response.data.token);
            redirect(fetchReferer() ? fetchReferer() : '/');
        }).catch(error => {
            setErrors(error.response.data.errors);
        });
    }

    return (
        <Grid container centered style={{ marginTop: "50px" }}>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Form onSubmit={(e) => onRegisterSubmit(e)} size="large">
                        <Form.Field>
                            <label className="ss-text-primary"> Username </label>
                            <ErrorMessage errors={errors} type='username'></ErrorMessage>
                            <input required id='username' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength="255" />
                        </Form.Field>
                        <Form.Field>
                            <label className="ss-text-primary"> Email </label>
                            <ErrorMessage errors={errors} type='email'></ErrorMessage>
                            <input required id='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength="255" />
                        </Form.Field>
                        <Form.Field>
                            <label className="ss-text-primary"> Password </label>
                            <ErrorMessage errors={errors} type='password'></ErrorMessage>
                            <input required id='password' placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} maxLength="255" />
                        </Form.Field>
                        <Form.Field>
                            <input required id='password_confirmation' placeholder="Confirm Password" value={password_confirmation} type="password" onChange={(e) => setPassword_Confirmation(e.target.value)} maxLength="255" />
                        </Form.Field>
                        <Popup 
                                content='Register to SuperSet' 
                                position='top center'
                                trigger={<Button type='submit'>Register</Button>}
                            />
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}

export default RegisterForm;