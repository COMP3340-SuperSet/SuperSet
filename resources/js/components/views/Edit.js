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

    const [itemidCounter, setItemidCounter] = useState(1);

    const [itemidHash, setItemidHash] = useState({});
    //const [setImageidHash, setSetImageidHash] = useState({});

    const [set, setSet] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [setImages, setSetImages] = useState([]);
    const [itemImages, setItemImages] = useState([]);
    const [selectedItemImages, setSelectedItemImages] = useState([]);

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
            //setItems(response.data);
            let tmpItemidCounter = itemidCounter;
            let tmpHashids = {};
            let tmpItems = [];
            response.data.forEach((item) => {
                tmpHashids["" + tmpItemidCounter] = item.itemid;
                item["hashid"] = tmpItemidCounter;
                tmpItems.push(item);
                tmpItemidCounter++;
            });

            setItemidCounter(tmpItemidCounter);
            setItemidHash(tmpHashids);
            setItems(tmpItems);
        }).catch((error) => {
            console.error("Items Error: " + error);
        });

        //set images
        /*
        axios.get(`/api/set/${setid}/images`).then((response) => {
            let temp = response.data;
            
            //loop through images and add hashids

            console.log("set images:", temp);
            //setSetImages(response.data);
        }).catch(error => {
            console.error(error);
        });
        */
        //item images
        
    }, []);

    useEffect(() => { }, [currentUser]);

    useEffect(() => { }, [selectedItem]);

    useEffect(() => {
        console.log('current set', set);
    }, [set]);

    useEffect(() => {
        console.log('current items list', items);
    }, [items]);

    useEffect(() => { 
        //console.log('hash table updated:', JSON.stringify(itemidHash));
    }, [itemidHash]);

    const onSubmitItem = (item, images) => {
        const tempItems = [...items];
        let tempImages = [];
        let hashedImages = [];
        console.log("All images before hash: ", hashedImages);

        for (let i = 0; i < images.length; i++) {
            hashedImages[i] = {
                hashid: item.hashid,
                file: images[i]
            };
        }

        //console.log("All images: ", JSON.stringify(hashedImages));

        let ind = -1;
        let newHash = null;
        ind = findIndex(item.hashid);
        if (ind === -1) {
            newHash = {};
            newHash["" + itemidCounter] = null;
            item["hashid"] = itemidCounter;
        
            tempImages = [...itemImages, ...hashedImages];

            tempItems.push(item);
            setItemidCounter(itemidCounter+1);
        } else {
            tempItems[ind] = item;
            
            tempImages = [...itemImages.filter((image) => image.hashid != hashId), ...hashedImages];
        }

        setItemImages([...tempImages]);
        setItems(tempItems);
        setSelectedItem(null);
        
        if (newHash !== null){
            setItemidHash({
                ...itemidHash,
                ...newHash
            });
        }
    }

    const onDeleteItem = (item) => {
        const index = findIndex(item.hashid);
        const tempItems = [...items];
        tempItems.splice(index, 1);
        setItems(tempItems);

        setItemImages([...itemImages.filter(image => image.hashid == item.hashid)]);
    }

    const onSubmitItemImages = (hashId, newItemImages) => {
        /*let temp = null;
        if (itemidHash[hashId]) temp = [...itemImages.filter((image) => image.itemid != itemidHash[hashId])];
        else temp = [...itemImages];*/

    }

    const onDeleteItemImages = (images) => {

    }

    const findIndex = (hashid) => {
        return items.findIndex((item) => item && item.hashid && item.hashid === hashid);
    }

    const onSubmitSet = () => {
        //todo:
        
        //send set [done, check]
        console.log("Sending set: ", JSON.stringify(set));
        /*
        axios.put(`/api/set`, {
            ...set
        }).then(response => {
            console.log("Successfully sent set: ", JSON.stringify(resposne.data));
        }).catch(error => {
            console.error(error);
        });
        
        */
        
        //send set images



        //send items [done, check] and images
        let temp = [...items];
        for (let hash in itemidHash){
            let item = temp.find(elem => elem.hashid == hash );

            //if (item) console.log("Name, Hashid, Itemid | ", item.name, item.hashid, hash);
            
            if (item && !itemidHash[hash]){
                console.log("Creating new item: ", item.name, itemidHash[hash]);
                /*
                axios.post(`/api/item`, {
                    name: item.name,
                    description: item.description
                }).then(response => {
                    console.log("Successfully created item: ", JSON.stringify(resposne.data));
                }).catch(error => {
                    console.error(error);
                });
                */
            }
            else if (!item && itemidHash[hash]){
                console.log("Deleting item from id: ", itemidHash[hash]);
                /*
                axios.delete(`/api/item`, {
                    itemid: itemidHash[hash]
                }).then(response => {
                    console.log("Successfully destroyed item: ", JSON.stringify(resposne.data));
                }).catch(error => {
                    console.error(error);
                });
                */
            }
            else{
                console.log("Updating item: ", item.name, itemidHash[hash]);
                /*
                axios.put(`/api/item`, {
                    itemid: tmpItemid,
                    name: item.name,
                    description: item.description
                }).then(response => {
                    console.log("Successfully created item: ", JSON.stringify(resposne.data));
                }).catch(error => {
                    console.error(error);
                });
                */
            }

            //send item images


        };

        //redirect [done]
        //redirect('/set', [{key: "id", value: "set.setid"}]);
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
                                imageList={setImages} updateImageList={setSetImages}/>
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
                                itemImages={itemImages}
                                setItemImages={itemImages => setSelectedItemImages(itemImages)}/>
                        </Accordion.Content>
                    </Accordion>
                    <ItemList
                        items={items}
                        onSelectItem={item => {setSelectedItem(item); setSelectedItemImages(itemImages);}}
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
