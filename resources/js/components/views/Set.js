import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import SetView from '../SetView';
import Toast from '../Toast';
import { redirect } from '../../utils/redirect';

function Set() {

    const [currentUser, setCurrentUser] = useState(null);

    const [set, setSet] = useState(null);
    const [setItems, setSetItems] = useState([]);

    const [setImages, setSetImages] = useState([]);
    const [itemImages, setItemImages] = useState([]);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });

        let setid = new URL(window.location.href).searchParams.get("id");
        if (!setid || setid == 0) redirect('/');
        axios.get(`/api/sets/${setid}`).then((response) => {
            setSet(response.data);

            //get set images

        }).catch((error) => {
            console.error("Sets Error: " + error);
        });

        axios.get(`/api/set/${setid}/items`).then((response) => {
            setSetItems(response.data);

            //get item images

        }).catch((error) => {
            console.error("Items Error: " + error);
        });
    }, []);

    useEffect(() => { }, [currentUser]);
    useEffect(() => { /*console.log("Current set: ", set);*/ }, [set]);
    useEffect(() => { /*console.log("Current items: ", setItems);*/ }, [setItems]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <SetView set={set} items={setItems} currentUser={currentUser} setImages={setImages} itemImages={itemImages} />
            <Toast />
        </div>
    );
}

export default Set;

if (document.getElementById('set')) {
    ReactDOM.render(<Set />, document.getElementById('set'));
}
