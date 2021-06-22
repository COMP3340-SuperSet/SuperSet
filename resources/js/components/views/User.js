import React from 'react';
import ReactDOM from 'react-dom';

function User() {
    return (
        <div>
            I am the User Component
        </div>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
