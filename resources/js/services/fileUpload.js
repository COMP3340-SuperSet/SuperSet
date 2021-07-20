import axios from "axios";

export function uploadFile(url, formData) {
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch(err => console.error(err));
};
