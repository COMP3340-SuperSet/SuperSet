import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Button, Divider, Accordion, Icon } from 'semantic-ui-react';
import axios from 'axios';

import Header from "../Header";
import EditItemForm from '../EditItemForm';
import SetDetails from '../SetDetails';
import ItemList from '../ItemList';
import { getUser, getSet, getItems, getSetImages } from '../../services/user';

function Edit() {
    const [currentUser, setCurrentUser] = useState(null);
    const [set, setSet] = useState(null);

    const [openForm, setOpenForm] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const [setImages_db, setSetImages_db] = useState([]);
    const [setImages_new, setSetImages_new] = useState([]);

    const [items_db, setItems_db] = useState([]);
    const [items_new, setItems_new] = useState([]);

    const [itemImages_db, setItemImages_db] = useState([]);
    const [itemImages_new, setItemImages_new] = useState([]);

    useEffect(() => {
        let setid = new URL(window.location.href).searchParams.get("setid");

        async function getSetInfo() {
            setCurrentUser(await getUser());
            setSet(await getSet(setid));
            setItems_db([...await getItems(setid)]);
            setSetImages_db([...await getSetImages(setid)]);
        }
        getSetInfo();
    }, []);

    useEffect(() => {
        console.log('currentUser: ', currentUser);
    }, [currentUser]);

    useEffect(() => {
        console.log('set: ', set);
    }, [set]);

    useEffect(() => {
        console.log('items: ', items_db);
    }, [items_db]);

    useEffect(() => {
        console.log('setImages: ', setImages_db);
    }, [setImages_db]);

    const onSubmitItem = (item) => {
        if('itemid' in item){

        }else{
            
        }
    }

    const onDeleteItem = () => {

    }

    const onSubmitSet = () => {

    }

    const onDiscardChanges = () => {
        //todo: redirect the user back to referer
    }

    return (
        <div>
            <Header currentUser={currentUser} />
            <Grid centered container>
                <Grid.Column>
                    <SetDetails set={set} updateSet={setSet} />
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
                                setSelectedItem={setSelectedItem}
                                onSubmitItem={onSubmitItem}
                                itemImages={[]}
                            />
                        </Accordion.Content>
                    </Accordion>
                    <ItemList
                        items={[ items_db, items_new]}
                        onSelectItem={setSelectedItem}
                        onDeleteItem={onDeleteItem}
                    />
                    <Divider />
                    <div style={{ textAlign: 'right' }}>
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
