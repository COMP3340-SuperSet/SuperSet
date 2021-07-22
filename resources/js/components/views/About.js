import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import InfoPage from '../InfoPage';

function About() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });
    }, []);

    useEffect(() => { }, [currentUser]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <InfoPage />
        </div>
    );
}

export default About;

if (document.getElementById('about')) {
    ReactDOM.render(<About />, document.getElementById('about'));
}
