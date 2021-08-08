import axios from 'axios';
import { getSetImages, getItems, getItemImages } from './fetchSet';
import { redirect } from '../utils/redirect';
import { toast } from '../components/Toast';

export async function onSubmitSetUpdate(set, setImages, items) {
    toast("Redirecting you...");

    const p1 = updateSet(set);
    const p2 = deleteSetImages(set.setid, setImages[0]);
    const p3 = postSetImages(set.setid, setImages[1]);
    const p4 = deleteItems(set.setid, items[0]);
    const p5 = putItems(items[0]);
    const p6 = postItems(set.setid, items[1]);

    return Promise.allSettled([p1, p2, p3, p4, p5, p6]).then((result) => {
        redirect("/set", [{
            key: "id",
            value: set.setid
        }]);
    }).catch(error => {
        toast('Error updating set.');
    });
}

async function updateSet(set) {
    try {
        return axios.put(`/api/set`, {
            setid: set.setid,
            name: set.name,
            description: set.description
        }).catch(error => {
            console.error(error);
            return false;
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function deleteSetImages(setid, images_db) {
    try {
        //elems in put are setImage objects - update setImage in database
        //elems in del were deleted by the user and need to be deleted from the database
        const del = await differenceOfSetImages(setid, images_db);

        const promises = [];

        //delete setImage by imageid
        for (const imageid of del) {
            promises.push(axios.post('/api/set/image/delete', { setid, imageid }));
        }

        return Promise.allSettled(promises);
    } catch (error) {
        console.error(error);
    }
}

function postSetImages(setid, images_new) {
    try {
        const promises = [];
        for (const image of images_new) {
            if ('urls' in image) {//download from unsplash (on backend?)
                promises.push(axios.post('/api/set/unsplash', {
                    setid,
                    download: image.urls.download
                }));
            }

            else {//upload file to database
                var formData = new FormData();
                formData.append("image", image);
                formData.append("setid", setid);

                promises.push(axios.post('/api/set/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }));
            }
        }
        return Promise.allSettled(promises);
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

async function deleteItems(setid, items_db) {
    try {
        const del = await differenceOfItems(setid, items_db);
        const promises = [];
        //del item by itemid
        for (const itemid of del) {
            promises.push(axios.post('/api/item/delete', { itemid }));
        }

        return Promise.allSettled(promises);
    } catch (error) {
        console.error(error);
    }
}

function putItems(items_db) {
    try {
        const promises = [];

        for (const item of items_db) {
            promises.push(axios.post('/api/item/update', { itemid: item.itemid, name: item.name, description: item.description }));
            promises.push(deleteItemImages(item.itemid, item.images_db));
            promises.push(postItemImages(item.itemid, item.images_new));
        }
        return Promise.allSettled(promises);
    } catch (error) {
        console.error(error);
    }
}

function postItems(setid, items_new) {
    try {
        const promises = [];

        //console.log('received 2: ', items_new);

        items_new.forEach(item => {
            //post new item (await! new itemid is needed, and needs to be returned)
            promises.push(new Promise((resolve, reject) => {
                axios.post('/api/item', {
                    ...item, setid
                }).then(response => {
                    //console.log("Inner response:", response);
                    postItemImages(response.data.itemid, item.images_new).then(() => {
                        resolve(response.data);
                    }).catch(error => {
                        reject('Failed to post new item images: ', item, error);
                    });
                }).catch(error => {
                    reject('Failed to post new item: ', item, error);
                });
            }));
        })

        return Promise.allSettled(promises);
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

async function deleteItemImages(itemid, images_db) {
    try {
        const del = await differenceOfItemImages(itemid, images_db);
        const promises = [];

        //delete setImage by imageid
        for (const imageid of del) {
            promises.push(axios.post('/api/item/image/delete', { itemid, imageid }));
        }

        return Promise.allSettled(promises);
    } catch (error) {
        console.error(error);
    }
}

function postItemImages(itemid, images_new) {
    try {
        const promises = [];
        for (const image of images_new) {
            if ('urls' in image) {//download from unsplash (on backend?)
                promises.push(axios.post('/api/item/image/unsplash', {
                    itemid,
                    download: image.urls.download
                }));
            }
            else {//upload file to database
                var formData = new FormData();
                formData.append("image", image);
                formData.append("itemid", itemid);

                promises.push(axios.post('/api/item/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }));
            }
        }
        return Promise.allSettled(promises);
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