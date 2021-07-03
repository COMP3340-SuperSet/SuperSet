import React from 'react';
import axios from 'axios';
import { uploadFile } from '../services/fileUpload';

const FileUpload = ({ fileUploadURL }) => {

    const onSubmitFile = () => {
        var formData = new FormData();
        var fileInput = document.getElementById(fileUploadURL);
        formData.append("image", fileInput.files[0]);
        uploadFile(fileUploadURL, formData);
    }

    return (
        <div>
            <form name="file" role="form" encType="multipart/form-data">
                <input type="file" id={fileUploadURL} name="file" />
                <input type="button" onClick={() => onSubmitFile()} value="Upload" />
            </form>
        </div>
    );

}

export default FileUpload;