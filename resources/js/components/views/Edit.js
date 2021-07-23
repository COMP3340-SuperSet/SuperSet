import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Button, Divider, Accordion, Icon } from 'semantic-ui-react';
import axios from 'axios';

import Header from "../Header";
import EditItemForm from '../EditItemForm';
import SetDetails from '../SetDetails';
import ItemList from '../ItemList';

const ent = {
    elements: [],
    count: 0,
    hash: []
};

function Edit() {
    const [currentUser, setCurrentUser] = useState(null);
    const [set, setSet] = useState(null);

    const [selectedItem, setSelectedItem] = useState(null);

    const [itemEnt, setItemEnt] = useState(ent);
    const [setImagesEnt, setSetImagesEnt] = useState(ent);
    const [itemImagesEnt, setItemImagesEnt] = useState(ent);

    const [openForm, setOpenForm] = useState(true);

    useEffect(() => {
        //get session user
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });


        let setid = new URL(window.location.href).searchParams.get("setid");

        //set information
        axios.get(`/api/sets/${setid}`).then((response) => {
            setSet(response.data);
        }).catch((error) => {
            console.error("Error: " + error);
        });

        //item information
        axios.get(`/api/set/${setid}/items`).then((response) => {
            let tmp = response.data;

            const elems = [];
            const hashes = [];

            tmp.forEach(item => {
                elems.push(item);
                hashes.push(item.itemid);
            });

            elems.forEach((elem, index) => {
                elem.id = index;
            });

            encode(itemEnt, setItemEnt, elems, hashes);

        }).catch((error) => {
            console.error("Items Error: " + error);
        });

        //set images

        axios.get(`/api/set/${setid}/images`).then((response) => {
            let tmp = response.data;

            const elems = [];
            const hashes = [];

            tmp.forEach(elem => {
                elems.push(elem);
                hashes.push(elem.setid);
            });

            elems.forEach((elem, index) => {
                elem.id = index;
            });

            encode(setImagesEnt, setSetImagesEnt, elems, hashes);

            console.log("set images:", temp);
        }).catch(error => {
            console.error(error);
        });

        //item images

    }, []);

    useEffect(() => { }, [currentUser]);

    useEffect(() => {
        console.log('current set', set);
    }, [set]);

    useEffect(() => {
        console.log('current items', itemEnt);
    }, [itemEnt]);

    function encode(ent, setEnt, elems, hashes) {
        const tempEnt = { ...ent };
        tempEnt.elements = elems;
        tempEnt.hash = hashes;
        tempEnt.count = elems.length;

        setEnt(tempEnt);
        return tempEnt.count;
    }

    function insert(ent, setEnt, payload) {
        const tempEnt = { ...ent };
        tempEnt.elements[tempEnt.count] = {
            id: tempEnt.count,
            ...payload
        };

        const tempCount = tempEnt.count;
        tempEnt.count = tempCount + 1;

        setEnt(tempEnt);
        return tempCount;
    }

    function edit(ent, setEnt, hashid, payload) {
        const tempEnt = { ...ent };
        tempEnt.elements[hashid] = payload;
        setEnt(tempEnt);
    }

    function count(ent) {
        let count = 0;
        for (let i = 0; i < ent.elements.length; i++) {
            if (ent.elements[i]) count++;
        }
        return count;
    }

    function deleteEnt(ent, setEnt, hashid) {
        const tempEnt = { ...ent };
        tempEnt.elements[hashid] = null;
        tempEnt.hash[hashid] = null;
        setEnt(tempEnt);
    }

    function split(ent) {
        const len = ent.hash.length;

        const db = [];
        const ne = [];

        for (let i = 0; i < ent.elements.length; i++) {
            if (!ent.elements[i]) continue;
            if (i < len) {
                db.push({
                    id: i,
                    payload: ent.elements[i]
                });
            } else {
                ne.push({
                    id: i,
                    payload: ent.elements[i]
                });
            }
        }
        return [db, ne];
    }

    function decode(ent) {
        const len = ent.hash.length;

        const db = [];
        const ne = [];

        for (let i = 0; i < ent.elements.length; i++) {
            if (!ent.elements[i]) continue;
            if (i < len) {
                db.push({
                    id: ent.hash[i],
                    payload: ent.elements[i]
                });
            } else {
                ne.push({
                    id: i,
                    payload: ent.elements[i]
                });
            }
        }
        return [db, ne];
    }

    const onSubmitItem = (item) => {
        if ("id" in item) {
            console.log('submitting item first if', item);
            edit(itemEnt, setItemEnt, item.id, item);
        }
        else {
            console.log('submitting item else', item);
            insert(itemEnt, setItemEnt, item);
        }

        setSelectedItem(null);
    }

    const onDeleteItem = (item) => {
        deleteEnt(itemEnt, setItemEnt, item.id);
    }

    const onSubmitSet = () => {
        console.log("Submitting:", decode(itemEnt));
    }

    const onDiscardChanges = () => {
        //todo: redirect the user back to referer
    }

    return (
        <div>
            <Header currentUser={currentUser} />
            <Grid centered container>
                <Grid.Column>
                    <SetDetails set={set} updateSet={setSet}
                        setImagesEnt={setImagesEnt} setSetImagesEnt={setSetImagesEnt} />
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
                                onSubmitItem={onSubmitItem}
                                itemImages={itemImagesEnt}
                                setItemImagesEnt={setItemImagesEnt} />
                        </Accordion.Content>
                    </Accordion>
                    <ItemList
                        items={itemEnt.elements}
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
