import axios from "axios";

export async function getUser() {
    try {
        return await axios.get("/api/check");
    } catch (error) {
        console.error(error);
    }
}

export async function getSet(setid) {
    try {
        const response = await axios.get(`/api/sets/${setid}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getItems(setid) {
    try {
        const response = await axios.get(`/api/set/${setid}/items`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getSetImages(setid) {
    try {
        const response = await axios.get(`/api/set/${setid}/images`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getItemImages(itemid) {
    try {
        const response = await axios.get(`/api/item/${itemid}/images`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

