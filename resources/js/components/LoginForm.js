import React, { useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (

        <Container>
            <Form>
                <Form.Field>
                    <label>
                        Username
                    </label>
                    <input id='username' placeholder="Username" value={username} onChange={(e) => setUsername(e.value)} />
                </Form.Field>
                <Form.Field>
                    <label>
                        Password
                    </label>
                    <input id='password' placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.value)} />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        </Container>

    );
}


export default LoginForm;