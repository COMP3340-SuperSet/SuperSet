import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../Header';
import SetView from '../SetView';

function Set() {
    const [set, setSet] = useState(null);
    const [setItems, setSetItems] = useState([]);

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
    }, []);

    useEffect(() =>{}, [set, setItems]);

    return (
        <div>
            <Header />
            <SetView set = {set} items = {setItems} />
        </div>
    );
}

export default Set;

if (document.getElementById('set')) {
    ReactDOM.render(<Set />, document.getElementById('set'));
}
