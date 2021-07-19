import React, {useState} from 'react';
import {Message} from 'semantic-ui-react'

// receives error message and error body as props
const Error = ({errorMessage, errorBody}) => {
    const [message, setMessage] = useState(errorMessage)
    const [body, setBody] = useState(errorBody)

    /* Styling */
    const errorStyle = {
      textAlign: "center",
      width: "50%",
      left: "25%"
    };

return (
<Message negative style={errorStyle} size='small' >
        <Message.Header>{message}</Message.Header>
          <p>{body}</p>
    </Message>
);
}
export default Error