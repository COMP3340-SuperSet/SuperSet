import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../Header";

function Admin() {
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
            I am the Admin Component
        </div>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
