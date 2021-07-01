import React from 'react';
import axios from 'axios';

function FileUpload() {

    const uploadFile = () => {
        var formData = new FormData();
        const userid = 1;
        var fileInput = document.getElementById('file');
        formData.append("image", fileInput.files[0]);
        const url = '/api/user/' + userid + '/image';
        axios.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('response: ', response);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            I am the File Upload Component
            <form id="uploadForm" role="form" encType="multipart/form-data">
                <input type="file" id="file" name="file" />
                <input type="button" onClick={() => uploadFile()} value="Upload" />
            </form>
        </div>
    );
}

export default FileUpload;