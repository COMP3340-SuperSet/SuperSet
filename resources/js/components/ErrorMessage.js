import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = ({ errors, type }) => {
    if (!errors || !errors[type]) {
        return null;
    }
    return errors[type].length
        ?
        <Message negative style={{ margin: "0.5em 0", padding: "0.5em" }}>
            <p>{errors[type][0]}</p>
        </Message>
        : null
}

export default ErrorMessage;