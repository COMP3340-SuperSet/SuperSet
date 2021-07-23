import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import SetEditPage from '../SetEditPage';
import Toast from '../Toast';

const Item = () => {
    const [set, setSet] = useState(null);
    const [items, setItems] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });
        
        /*
        let setid = new URL(window.location.href).searchParams.get("id");
        
        axios.get(`/api/sets/${setid}`).then((response) => {
            setSet(response.data);
        }).catch((error) => {
            console.error("Error: " + error);
        });

        axios.get(`/api/set/${setid}/items`).then((response) => {
            setItems(response.data);
        }).catch((error) => {
            console.error("Items Error: " + error);
        });

        */
    }, []);

    useEffect(() => {
        console.log("Set: ", JSON.stringify(set));
     }, [set]);
    useEffect(() => {
        console.log("Items: ", JSON.stringify(items));
     }, [items]);
    useEffect(() => { }, [currentUser]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <SetEditPage currentUser={currentUser} set={set} items={items}  />
            <Toast />
        </div>
    );
}

export default Item;

if (document.getElementById('item')) {
    ReactDOM.render(<Item />, document.getElementById('item'));
}
