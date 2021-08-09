import axios from "axios";
import {toast} from "../components/Toast";

export async function getUser() {
    try {
        return await axios.get("/api/check").then().catch(() => {
            toast("Error fetching current user", "error");
        });
    } catch (error) {
        console.error(error);
        toast("Error fetching current user", "error");
    }
}

export async function getSet(setid) {
    try {
        const response = await axios.get(`/api/sets/${setid}`).then().catch(() => {
            toast("Error fetching set information", "error");
        });
        return response.data;
    } catch (error) {
        console.error(error);
        toast("Error fetching set information", "error");
    }
}

export async function getItems(setid) {
    try {
        const response = await axios.get(`/api/set/${setid}/items`).then().catch(() => {
            toast("Error fetching items", "error");
        });
        return response.data;
    } catch (error) {
        console.error(error);
        toast("Error fetching items", "error");
    }
}

export async function getSetImages(setid) {
    try {
        const response = await axios.get(`/api/set/${setid}/images`).then().catch(() => {
            toast("Error fetching set images", "error");
        });
        return response.data;
    } catch (error) {
        console.error(error);
        toast("Error fetching set images", "error");
    }
}

export async function getItemImages(itemid) {
    try {
        const response = await axios.get(`/api/item/${itemid}/images`).then().catch(() => {
            toast("Error fetching item images", "error");
        });
        return response.data;
    } catch (error) {
        console.error(error);
        toast("Error fetching item images", "error");
    }
}

