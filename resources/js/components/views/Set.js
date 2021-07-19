import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import SetView from '../SetView';
import Toast from '../Toast';

function Set() {
    const [set, setSet] = useState(null);
    const [setItems, setSetItems] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);    

    useEffect(() =>{        
        let setid = new URL(window.location.href).searchParams.get("id");
        axios.get(`/api/sets/${setid}`).then((response) => {
            setSet(response.data);
        }).catch((error) => {
            console.error("Error: " + error);
        });

        axios.get(`/api/items/set/${setid}`).then((response) => {
            setSetItems(response.data);
        }).catch((error) => {
            console.error("Error: " + error);
        });

        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });
    }, []);

    useEffect(() =>{}, [set, setItems]);
    useEffect(() =>{}, [currentUser]);
    
    return (
        <div>
            <Header currentUser = {currentUser} />
            <SetView set = {set} items = {setItems} currentUser = {currentUser} />
            <Toast />
        </div>
    );
}

export default Set;

if (document.getElementById('set')) {
    ReactDOM.render(<Set />, document.getElementById('set'));
}
