import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { storeToken } from '../utils/localStorage';
import { redirect } from '../utils/redirect';
import { referer } from '../utils/redirect';
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
            console.error(error.response.data);
            setErrors(error.response.data.errors);
        });
    }


    return (

        <Grid container centered style={{ marginTop: "50px" }}>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Form onSubmit={(e) => onRegisterSubmit(e)} size="large">
                        <Form.Field>
                            <label>
                                Username
                            </label>
                            <ErrorMessage errors={errors} type='username'></ErrorMessage>
                            <input required id='username' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Email
                            </label>
                            <ErrorMessage errors={errors} type='email'></ErrorMessage>
                            <input required id='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Password
                            </label>
                            <ErrorMessage errors={errors} type='password'></ErrorMessage>
                            <input required id='password' placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <input required id='password_confirmation' placeholder="Confirm Password" value={password_confirmation} type="password" onChange={(e) => setPassword_Confirmation(e.target.value)} />
                        </Form.Field>
                        <Button type='submit'>Register</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}

export default RegisterForm;