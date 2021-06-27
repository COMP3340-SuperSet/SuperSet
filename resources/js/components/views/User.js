import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import Profile from '../Profile';

function User() {
    return (
        <div>
            <Header />
            <Profile />
        </div>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
