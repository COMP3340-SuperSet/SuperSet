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

        const getSetImages = async () => {
            await axios.get(`/api/user/sets/${userid}`).then(async (response) => {
                let temp = response.data;
                for await (const set of temp) {
                    //get set images
                    await axios.get(`/api/set/${set.setid}/images`).then(response => {
                        set.images = [...response.data];
                    }).catch(err => {
                        console.error(err)
                    });
                }
                setUserSets(temp);
            }).catch((error) => {
                console.error("Sets Error: " + error);
            });
        }

        getSetImages();

    }, []);

    useEffect(() => { }, [currentUser, user]);

    useEffect(() => {
    }, [setImages]);

    useEffect(() => { 
        if (!userSets || !userSets.length) return;

        let tempImages = [];
        for (let i = 0; i < userSets.length; i++){
            if (userSets[i].images) tempImages = [...tempImages, ...userSets[i].images];
        }
        
        if (tempImages.length) setSetImages(tempImages);
    }, [userSets]);

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
