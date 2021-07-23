import React, { useState, useEffect } from "react";
import { Button, Accordion, Grid, Icon, Divider, Form, Segment, Image, List, Card, Input } from 'semantic-ui-react';

import { toast } from "./Toast";

const emptyItem = {
    hashid: -1,
    item: {
        name: "",
        description: ""
    },
    db: false,
    image: {
        imageid: null,
        file: null
    }
};

const SetEditPage = ({ currentUser, set = [], items = [] }) => {
    const [setName, setSetName] = useState("");
    const [setDescription, setSetDescription] = useState("");
    const [setImage, setSetImage] = useState(null);

    const [allItems, setAllItems] = useState([]);
    const [allItemsCount, setAllItemsCount] = useState(1);

    const [currentItem, setCurrentItem] = useState(emptyItem);

    const [openForm, setOpenForm] = useState(true);

    const [test, setTest] = useState("");

    useEffect(() => {
        if (set) {
            setSetName(set.name);
            setSetDescription(set.description);
            setSetImage({
                id: set.imageid,
                file: null
            });
        }
    }, [set]);

    useEffect(() => {
        if (items) {
            let temp = [];
            items.forEach(element => {
                temp.push({
                    hashid: allItemsCount,
                    item: element,
                    db: true,
                    image: {
                        imageid: element.imageid,
                        file: null
                    }
                });
                setAllItemsCount(allItemsCount + 1);
            });

            setAllItems(temp);
        }
    }, [items]);

    const onClear = () => {
        setCurrentItem(emptyItem);
    }

    const onEditItem = (item) => {
        setCurrentItem(item);
    }

    const onDeleteItem = (id) => {
        if (currentItem && currentItem.hashid === id) onClear();

        let temp = [...allItems];
        let ind = temp.findIndex(element => element.hashid === id);
        temp.splice(ind, 1);

        setAllItems(temp);
    }

    const onSubmitItem = () => {
        if (currentItem.item.name == "") {
            toast("Please input an item name!", "error");
            return;
        }

        if (currentItem.hashid === -1) {
            currentItem.hashid = allItemsCount;
            setAllItemsCount(allItemsCount + 1);

            setAllItems([...allItems, currentItem]);
        }
        else {
            let temp = [...allItems];
            let ind = temp.findIndex(element => element.hashid === currentItem.hashid);
            temp[ind] = currentItem;
            setAllItems(temp);
        }

        onClear();
    }


    const onChangeDescription = (event) => {
        event.preventDefault();
        setSetDescription(event.target.value);
        const desc = document.getElementById('set-description');

        // Reset field height
        desc.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(desc);

        // Calculate the height
        var height
            = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + desc.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        desc.style.height = height + 'px';
    }

    let renderedSetImage = null;
    if (setImage && setImage.imageid) renderedSetImage = setImage.imageid;
    else if (setImage && setImage.file) renderedSetImage = URL.createObjectURL(setImage.file);

    let delButtonSet = renderedSetImage ? <Button icon
        onClick={() => { setSetImage({ imageid: null, file: null }); }}
        attached="bottom" color="red"><Icon name="trash" /></Button> :
        null;


    let renderedItemImage = null;
    if (currentItem.image.imageid) renderedItemImage = currentItem.image.imageid;
    else if (currentItem.image.file) renderedItemImage = URL.createObjectURL(currentItem.image.file);

    let delButtonItem = renderedItemImage ? <Button icon
        onClick={() => { setCurrentItem({ ...currentItem, image: { imageid: null, file: null } }); }}
        attached="bottom" color="red"><Icon name="trash" /></Button> :
        null;

    return (
        <Grid centered container style={{ marginTop: "20px" }}>
            <Grid.Column>
                <Form key="setform">
                    <Form.Field style={{ fontSize: "26px" }}>
                        <input style={{ border: 'none', margin: 'none', padding: '0.25rem' }}
                            value={setName}
                            maxLength="60"
                            onChange={e => setSetName(e.target.value)}
                            placeholder="Name" ></input>
                    </Form.Field>
                    <Form.Field style={{ marginTop: "12px", fontSize: "18px" }}>
                        <textarea key="descriptioninput"
                            style={{ border: 'none', resize: 'none', overflow: 'hidden', margin: 'none', padding: '0.25rem' }}
                            spellCheck="false"
                            id="set-description"
                            maxLength="2048"
                            rows="1"
                            value={setDescription}
                            onChange={e => onChangeDescription(e)}
                            placeholder="Description (optional)"
                        ></textarea>
                    </Form.Field>
                    <Segment style={{ display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "none" }}>
                        <Button basic onClick={() => { document.getElementById("setImagesInput").click(); }}>Add</Button>
                        <div>
                            {renderedSetImage &&
                                <Image bordered size="small"
                                    className="grid-image"
                                    src={renderedSetImage}
                                    onClick={() => {/* show image overlay */ }} />}
                            {delButtonSet}
                        </div>
                    </Segment>
                    <input hidden
                        type="file"
                        id="setImagesInput"
                        name="file"
                        accept="image/*"
                        onChange={(e) => {
                            setSetImage({
                                imageid: null,
                                file: e.target.files[0]
                            });
                        }} />


                </Form>
                <Accordion fluid styled>
                    <Accordion.Title
                        active={openForm}
                        onClick={() => setOpenForm(!openForm)}>
                        <Icon name='dropdown' />
                        Create an Item
                    </Accordion.Title>
                    <Accordion.Content active={openForm}>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input
                                    value={currentItem.item.name}
                                    onChange={e => {
                                        setCurrentItem({
                                            ...currentItem, item: {
                                                ...currentItem.item,
                                                name: e.target.value
                                            }
                                        });
                                    }}
                                    placeholder="name"
                                ></input>
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <textarea
                                    rows='2'
                                    value={currentItem.item.description}
                                    onChange={e => {
                                        setCurrentItem({
                                            ...currentItem, item: {
                                                ...currentItem.item,
                                                description: e.target.value
                                            }
                                        });
                                    }}
                                    placeholder="description"
                                ></textarea>
                            </Form.Field>
                            <Form.Field>
                                <label>Image</label>
                                <Segment style={{ display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "none" }}>
                                    <Button basic onClick={() => { document.getElementById("itemImagesInput").click(); }}>Add</Button>

                                    <div>
                                        {renderedItemImage &&
                                            <Image bordered size="small"
                                                className="grid-image"
                                                src={renderedItemImage}
                                                onClick={() => {/* show image overlay */ }} />}
                                        {delButtonItem}
                                    </div>
                                </Segment>
                                <input hidden
                                    type="file"
                                    id="itemImagesInput"
                                    name="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setCurrentItem({
                                      
                                            ...currentItem, image: {
                                                imageid: null,
                                                file: e.target.files[0]
                                            }
                                        });
                                    }} />
                            </Form.Field>
                            <Button basic onClick={() => onClear()}>Clear</Button>
                            <Button floated="right" primary onClick={() => onSubmitItem()}>Save</Button>
                        </Form>
                    </Accordion.Content>
                </Accordion>

                <List divided>
                    {allItems.length > 0 ?
                        allItems.map(item => {
                            return (
                                <List.Item className="hoverable"
                                    key={item.hashid} >
                                    <List.Content floated='right'>
                                        <Button icon onClick={() => { onEditItem(item) }}><Icon name="edit"></Icon></Button>
                                        <Button icon onClick={() => { onDeleteItem(item.hashid) }}><Icon name="trash"></Icon></Button>
                                    </List.Content>
                                    <List.Content>
                                        <List.Header as='a'>{item.item.name}</List.Header>
                                        <List.Description>
                                            {item.item.description}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            );
                        }) :
                        <List.Item style={{ textAlign: 'center' }} >
                            <List.Content >
                                <List.Header>
                                    This set has no Items
                                </List.Header>
                            </List.Content>
                        </List.Item>}
                </List>

                <Divider />
                <div
                    style={{ textAlign: 'right' }}>
                    <Button secondary onClick={() => onDiscardChanges()}>Discard Changes</Button>
                    <Button primary onClick={() => onSubmitSet()}>Save Set</Button>
                </div>
            </Grid.Column>
        </Grid>
    );
}

export default SetEditPage;