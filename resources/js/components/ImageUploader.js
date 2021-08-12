import React from 'react';
import { toast } from './Toast';
import { Button, Segment, Popup } from "semantic-ui-react";



const ImageUploader = ({ onUploadImages, imageCount = null, formID = "image-uploader" }) => {

    const onFileChange = (event) => {
        if (!event.target.files[0]) return;

        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].size > 2000000) {
                toast("One or more of the inputted files exceeds 2MB. Please select images less than 2MB!", "warning");
                return;
            }
        }

        onUploadImages([...event.target.files]);
    }

    const onClickAddFiles = () => {
        document.getElementById(formID).click();
    }

    let count;

    if (imageCount === null || imageCount === undefined) count = null;
    else {
        count = imageCount > 0
            ? <p>{imageCount} Images Selected</p>
            : <p>No Images Selected</p>
    }
    return (
        <div>
            <Segment style={{ boxShadow: 'none', display: 'flex', alignItems: 'center', margin: 'none', padding: 'none' }}>
            <Popup 
                    content='Ban the account' 
                    position='left center'
                    trigger={<Button basic onClick={() => onClickAddFiles()}>Add</Button>}
                />
                {count}
            </Segment>
            <input multiple hidden
                type="file"
                id={formID}
                name="file"
                accept="image/*"
                onChange={(e) => onFileChange(e)} />
        </div>
    );
}

export default ImageUploader;

