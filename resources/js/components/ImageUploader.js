import React from 'react';
import { Button, Segment } from "semantic-ui-react";


const ImageUploader = ({ onUploadImages, imageCount = null, formID = "image-uploader" }) => {

    const onFileChange = (event) => {
        onUploadImages([...event.target.files]);
    }

    const onClickAddFiles = () => {
        document.getElementById(formID).click();
    }

    let count;

    if(imageCount === null || imageCount === undefined) count = null;
    else{
        count = imageCount > 0
        ? <p>{imageCount} Images Selected</p>
        : <p>No Images Selected</p>
    }
    return (
        <div>
            <Segment style={{ boxShadow: 'none', display: 'flex', alignItems: 'center', margin: 'none', padding: 'none' }}>
                <Button basic onClick={() => onClickAddFiles()}>Add</Button>
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

