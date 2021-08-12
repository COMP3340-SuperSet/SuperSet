import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Grid, Button, Divider, Accordion, Icon } from 'semantic-ui-react';
import Header from "../Header";
import EditItemForm from '../EditItemForm';
import SetDetails from '../SetDetails';
import ItemList from '../ItemList';
import { getUser, getSet, getItems, getSetImages, getItemImages } from '../../services/fetchSet';
import { redirect } from '../../utils/redirect';
import { onSubmitSetUpdate } from '../../services/postSetEdit';
import Confirmation from '../Confirmation';
import Toast, { toast } from '../Toast';

function Edit() {
    const [currentUser, setCurrentUser] = useState(null);
    const [set, setSet] = useState(null);
    useEffect(() => { }, [currentUser]);
    useEffect(() => { }, [set]);

    const [openForm, setOpenForm] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => { }, [selectedItem]);

    const [setImages_db, setSetImages_db] = useState([]);
    const [setImages_new, setSetImages_new] = useState([]);

    //const selectedSuggestedSetImages state
    useEffect(() => { }, [setImages_db, setImages_new]);

    const [items_db, setItems_db] = useState([]);
    const [items_new, setItems_new] = useState([]);
    useEffect(() => { }, [items_db, items_new]);

    const [errors, setErrors] = useState('');

    useEffect(() => {

        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });

        let setid = new URL(window.location.href).searchParams.get("setid");
        if (!setid || setid == 0) redirect("/");
        async function getSetInfo() {
            setCurrentUser(await getUser());
            setSet(await getSet(setid));
            setSetImages_db([...await getSetImages(setid)]);

            //getting items and assigning their item images
            const tempItems = [...await getItems(setid)];
            let ind = 0;
            for await (const item of tempItems) {
                tempItems[ind].images_db = await getItemImages(item.itemid);
                tempItems[ind].images_new = [];
                ind++;
            }
            setItems_db(tempItems);
        }
        getSetInfo();
    }, []);

    const onSubmitItem = (item) => {
        let temp;
        if ('itemid' in item) {
            temp = [...items_db];
            const ind = findIndexWithKeyValue(temp, 'itemid', item.itemid);
            temp[ind] = item;
            setItems_db(temp);
        } else {
            temp = [...items_new];
            if (selectedItem) {
                const ind = findIndexWithKeyValue(temp, 'name', selectedItem.name);
                temp[ind] = item;
            } else temp.push(item);
            setItems_new(temp);
        }
    }

    const onDeleteItem = (item) => {

        let temp;
        if ('itemid' in item) {
            temp = [...items_db];
            const ind = findIndexWithKeyValue(temp, 'itemid', item.itemid);
            temp.splice(ind, 1);
            setItems_db(temp);
        } else {
            temp = [...items_new];
            const ind = findIndexWithKeyValue(temp, 'name', item.name);
            temp.splice(ind, 1);
            setItems_new(temp);
        }
    }

    const findIndexWithKeyValue = (list, key, value) => {
        return list.findIndex(elem => elem[key] === value);
    }

    const uploadSetImages = (files) => {
        setSetImages_new([...setImages_new, ...files]);
    }

    const onSelectUnsplashImageSet = (urls) => {
        urls.download += "&w=500&fit=cover";
        setSetImages_new([...setImages_new, { urls }]);
    }

    const deleteSetImage = (index) => {
        let temp;
        if (index < setImages_db.length) {
            temp = [...setImages_db];
            temp.splice(index, 1);
            setSetImages_db(temp);
            return;
        }

        if (index < setImages_db.length + setImages_new.length) {
            index -= setImages_db.length;
            temp = [...setImages_new];
            temp.splice(index, 1);
            setSetImages_new(temp);
            return;
        }
    }

    //submit everything to db
    const onSubmitSet = async () => {

        if (!set.name) {
            setErrors("Set Name is required.");
            return;
        } else if (set.name.length < 3) {
            setErrors("Set Name must be at least 3 characters.");
            return;
        } else {
            setErrors('');
        }

        onSubmitSetUpdate(set, [setImages_db, setImages_new], [items_db, items_new]);
    }

    //todo: redirect the user back to referer
    const onCancelEdit = () => {
        redirect("/user", [{
            key: "id",
            value: set.userid
        }]);
    }

    return (
        <div>
            <Header currentUser={currentUser} />
            <Grid centered container>
                <Grid.Column>
                    <SetDetails
                        set={set}
                        updateSet={setSet}
                        images={[setImages_db, setImages_new]}
                        onUploadImages={uploadSetImages}
                        onSelectUnsplashImage={onSelectUnsplashImageSet}
                        onDeleteImage={deleteSetImage} />

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
                            />
                        </Accordion.Content>
                    </Accordion>
                    <ItemList
                        items={[items_db, items_new]}
                        onSelectItem={setSelectedItem}
                        onDeleteItem={onDeleteItem}
                    />
                    <Divider />
                    {errors ?
                        <Message negative style={{ margin: "0.5em 0", padding: "0.5em" }}>
                            <p>{errors}</p>
                        </Message>
                        : null
                    }
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Confirmation
                            trigger={<Button basic>Cancel</Button>}
                            onConfirm={onCancelEdit}
                            text="Are you sure? You will lose all of your changes." />
                        <Button primary onClick={() => onSubmitSet()}>Save Set</Button>
                    </div>
                </Grid.Column>
            </Grid>
            <Toast />
        </div>
    );
}

export default Edit;

if (document.getElementById('edit')) {
    ReactDOM.render(<Edit />, document.getElementById('edit'));
}
