import axios from "axios";

export function uploadFile(url, formData){
    axios.post(url, formData, {
        headers :{
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => console.log(res)).catch(err => console.error(err));
};
