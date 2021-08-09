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
            axios.get(`/api/set/${setid}/images`).then(response => {
                setSetImages(response.data);
            }).catch(err => {
                console.error(err)
            });

        }).catch((error) => {
            console.error("Sets Error: " + error);
        });

        const getItems = async () => {
            await axios.get(`/api/set/${setid}/items`).then(async (response) => {
                let temp = response.data;
                for await (const item of temp) {
                    //get item images
                    await axios.get(`/api/item/${item.itemid}/images`).then(response => {
                        item.images = [...response.data];
                    }).catch(err => {
                        console.error(err);
                    });
                }
                setSetItems(temp);
            }).catch((error) => {
                console.error("Items Error: " + error);
            });
        }

        getItems();
    }, []);

    useEffect(() => { }, [currentUser]);
    useEffect(() => { }, [set]);
    useEffect(() => {
        if (!setItems || !setItems.length) return;

        let tempImages = [];
        for (let i = 0; i < setItems.length; i++) {
            if (setItems[i].images) tempImages = [...tempImages, ...setItems[i].images];
        }

        if (tempImages.length) setItemImages(tempImages);
    }, [setItems]);
    useEffect(() => { }, [itemImages]);

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
