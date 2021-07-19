import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import UserSettings from '../UserSettings';

function Settings() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() =>{
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });
    }, []);

    useEffect(() =>{}, [currentUser]);

    return (
        <div>
            <Header currentUser = {currentUser}/>
            <UserSettings currentUser = {currentUser}/>
        </div>
    );
}

export default Settings;

if (document.getElementById('settings')) {
    ReactDOM.render(<Settings />, document.getElementById('settings'));
}
