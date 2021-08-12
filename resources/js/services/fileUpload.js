import axios from "axios";
import {toast} from "../components/Toast";

export function uploadFile(url, formData) {
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch(err => {
        console.error(err);
        toast("Error uploading file", "error");
    });
};
