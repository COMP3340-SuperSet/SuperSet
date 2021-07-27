import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../Header";
import AdminPages from '../AdminPages';
import Toast from '../Toast';

function Admin() {
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
            <AdminPages />
            <Toast />
        </div>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
