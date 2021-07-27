import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import Profile from '../Profile';
import Toast from '../Toast';

function User() {
    const [currentUser, setCurrentUser] = useState(null);

    const [user, setUser] = useState(null);
    const [userSets, setUserSets] = useState([]);
    const [setImages, setSetImages] = useState([]);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });

        let userid = new URL(window.location.href).searchParams.get("id");
        axios.get(`/api/user/${userid}`).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.error("User Error: " + error);
        });

        axios.get(`/api/user/sets/${userid}`).then((response) => {
            setUserSets(response.data);

            //get set images

        }).catch((error) => {
            console.error("Sets Error: " + error);
        });
    }, []);

    useEffect(() => { }, [currentUser, user, userSets, setImages]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <Profile userInfo={user} userSets={userSets} setImages={setImages} currentUser={currentUser} />
            <Toast />
        </div>
    );
}

export default User;

if (document.getElementById('user')) {
    ReactDOM.render(<User />, document.getElementById('user'));
}
