import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../Header";
import ServiceStatus from "../ServiceStatusPage";
import Toast, {toast} from '../Toast';

function Status() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        }).catch(() => {
            toast("Error fetching current user","error");
        });
    }, []);

    useEffect(() => { }, [currentUser]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <ServiceStatus />
            <Toast />
        </div>
    );
}

export default Status;

if (document.getElementById('status')) {
    ReactDOM.render(<Status />, document.getElementById('status'));
}
