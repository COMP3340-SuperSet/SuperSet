import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../Header";
import ServiceStatus from "../ServiceStatusPage";

function Status() {
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
            <ServiceStatus />
        </div>
    );
}

export default Status;

if (document.getElementById('status')) {
    ReactDOM.render(<Status />, document.getElementById('status'));
}
