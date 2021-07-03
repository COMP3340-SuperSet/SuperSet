import React from 'react';
import axios from 'axios';

function FileUpload() {

    const uploadFile = () => {
        var formData = new FormData();

        var fileInput = document.getElementById('file');
        formData.append("image", fileInput.files[0]);

        axios.post('/api/user/1/image', formData, {
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