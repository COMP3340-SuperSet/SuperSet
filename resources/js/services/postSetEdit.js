import axios from 'axios';
import { getSetImages, getItems, getItemImages } from './fetchSet';
import { redirect } from '../utils/redirect';
import { toast } from '../components/Toast';

export async function onSubmitSetUpdate(set, setImages, items) {
    await updateSet(set);
    await uploadSetImages(set.setid, setImages);
    await uploadItems(set.setid, items);
    toast("Redirecting you...");
    setTimeout(() => {
        redirect("/set", [{
            key: "id",
            value: set.setid
        }]);
    }, 3000);

}

async function updateSet(set) {
    try {
        axios.put(`/api/set`, {
            setid: set.setid,
            name: set.name,
            description: set.description
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function uploadSetImages(setid, images) {
    try {
        const [images_db, images_new] = [images[0], images[1]];

        //elems in put are setImage objects - update setImage in database
        //elems in del were deleted by the user and need to be deleted from the database
        const del = await differenceOfSetImages(setid, images_db);

        //delete setImage by imageid
        for await (const imageid of del) {
            axios.post('/api/set/image/delete', { setid, imageid });
        }

        // for await (const image of put) {
        //     //update in db with new information
        // }

        for await (const image of images_new) {
            if ('urls' in image) {//download from unsplash (on backend?)
                axios.post('/api/set/unsplash', {
                    setid,
                    download: image.urls.download
                }).then(response => {
                });
            }

            else {//upload file to database
                var formData = new FormData();
                formData.append("image", image);
                formData.append("setid", setid);

                axios.post('/api/set/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
}


//TODO: replace with 'deleted' state in Edit.js
async function differenceOfSetImages(setid, images_db) {
    const del = [];
    const images_og = [...await getSetImages(setid)];

    images_og.forEach(image => {
        if (!keyValueInListObject('imageid', image.imageid, images_db)) del.push(image.imageid);
    });

    return del;
}

function keyValueInListObject(key, value, list) {
    for (let i = 0; i < list.length; i++) {
        if ((key in list[i]) && list[i][key] === value) return true;
    }

    return false;
}

async function uploadItems(setid, items) {
    try {
        const [items_db, items_new] = [items[0], items[1]];

        const del = await differenceOfItems(setid, items_db);

        //del item by itemid
        for await (const itemid of del) {
            axios.post('/api/item/delete', { itemid });
        }

        //put
        for await (const item of items_db) {
            axios.post('/api/item/update', { name: item.name, description: item.description });
            uploadItemImages(item.itemid, [item.images_db, item.images_new]);
        }

        for await (const item of items_new) {
            //post new item (await! new itemid is needed, and needs to be returned)
            axios.post('/api/item', {
                ...item, setid
            }).then(response => {
                const itemid = response.data.itemid;
                uploadItemImages(itemid, [item.images_db, item.images_new]);
            }).catch(error => {
                console.error(error);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

//TODO: replace with 'deleted' state in Edit.js
async function differenceOfItems(setid, items_db) {
    const del = [];
    const items_og = [...await getItems(setid)];

    items_og.forEach(item => {
        if (!keyValueInListObject('itemid', item.itemid, items_db)) del.push(item.itemid);
    });

    return del;
}

async function uploadItemImages(itemid, images) {
    try {
        const [images_db, images_new] = [images[0], images[1]];
        const del = await differenceOfItemImages(itemid, images_db);

        //delete setImage by imageid
        for await (const imageid of del) {
            axios.post('/api/item/image/delete', { itemid, imageid });
        }

        for await (const image of images_new) {
            if ('urls' in image) {//download from unsplash (on backend?)
                axios.post('/api/item/image/unsplash', {
                    itemid,
                    download: image.urls.download
                });
            }
            else {//upload file to database
                var formData = new FormData();
                formData.append("image", image);
                formData.append("itemid", itemid);

                axios.post('/api/item/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

//TODO: replace with 'deleted' state in Edit.js
async function differenceOfItemImages(itemid, images_db) {
    const del = [];
    const images_og = [...await getItemImages(itemid)];

    images_og.forEach(image => {
        if (!keyValueInListObject('imageid', image.imageid, images_db)) del.push(image.imageid);
    });

    return del;
}