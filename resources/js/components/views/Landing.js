import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../Header";
import LandingPage from '../LandingPage';

function Landing() {
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
            <LandingPage />
        </div>
    );
}

export default Landing;

if (document.getElementById('landing')) {
    ReactDOM.render(<Landing />, document.getElementById('landing'));
}
