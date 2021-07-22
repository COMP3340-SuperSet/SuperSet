import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Button, Divider, Accordion, Icon } from 'semantic-ui-react';
import axios from 'axios';

import Header from "../Header";
import EditItemForm from '../EditItemForm';
import SetDetails from '../SetDetails';
import ItemList from '../ItemList';

function Edit() {
    const [currentUser, setCurrentUser] = useState(null);

    const [set, setSet] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [openForm, setOpenForm] = useState(true);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });
    }, []);

    useEffect(() => {
        console.log('current items list', items);
    }, [currentUser, set, items, selectedItem]);

    //todo: dont allow item to submit if item with same name already exists in set
    const onSubmitItem = (item) => {
        console.error('received item ', item);
        if (!item || !item.name) {
            console.error('Item does not have name');
            return;
        }
        const tempItems = [...items];
        const ind = findIndex(item.name);
        if (ind === -1) {
            tempItems.push(item);
        } else {
            tempItems[ind] = item;
        }
        setItems(tempItems);
        setSelectedItem(null);
    }

    const onDeleteItem = (item) => {
        const index = findIndex(item.name);
        const tempItems = [...items];
        tempItems.splice(index, 1);
        setItems(tempItems);
    }

    const findIndex = (itemName) => {
        return items.findIndex((item) => item && item.name && item.name === itemName);
    }

    const onSubmitSet = () => {
        //todo: send list to database and redirect user
    }

    const onDiscardChanges = () => {
        //todo: redirect the user back to referer
    }

    return (
        <div>

            <Header currentUser={currentUser} />

            <Grid centered container>
                <Grid.Column>
                    <SetDetails set={set} />
                    <Accordion fluid styled>
                        <Accordion.Title
                            active={openForm}
                            onClick={() => setOpenForm(!openForm)}>
                            <Icon name='dropdown' />
                            Create an Item
                        </Accordion.Title>
                        <Accordion.Content active={openForm}>
                            <EditItemForm
                                selectedItem={selectedItem}
                                setSelectedItem={item => setSelectedItem(item)}
                                onSubmitItem={onSubmitItem} />
                        </Accordion.Content>
                    </Accordion>
                    <ItemList
                        items={items}
                        onSelectItem={item => setSelectedItem(item)}
                        onDeleteItem={item => onDeleteItem(item)}
                    />
                    <Divider />
                    <div
                        style={{ textAlign: 'right' }}>
                        <Button secondary onClick={() => onDiscardChanges()}>Discard Changes</Button>
                        <Button primary onClick={() => onSubmitSet()}>Save Set</Button>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Edit;

if (document.getElementById('edit')) {
    ReactDOM.render(<Edit />, document.getElementById('edit'));
}
