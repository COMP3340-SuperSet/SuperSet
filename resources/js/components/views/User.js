import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import Profile from '../Profile';

function User() {
    const [user, setUser] = useState(null);
    const [userSets, setUserSets] = useState([]);

    useEffect(() =>{
        let userid = new URL(window.location.href).searchParams.get("id");
        axios.get(`/api/user/${userid}`).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.error("Error: " + error);
        });

        
        axios.get(`/api/user/sets/${userid}`).then((response) => {
            setUserSets(response.data);
        }).catch((error) => {
            console.error("Error: " + error);
        });
    }, []);

    useEffect(() =>{
    }, [user, userSets]);

    return (
        <div>
            <Header />
            <Profile userInfo = {user} userSets = {userSets} />
        </div>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
