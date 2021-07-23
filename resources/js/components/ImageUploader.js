import React, { useState, useEffect } from 'react';
import { List, Button, Icon, Form, Segment, Grid, Image } from "semantic-ui-react";
import ImageOverlay from './ImageOverlay';

import { getImagePath } from '../utils/imagePath';

const ImageUploader = ({ inputid = "file", images, updateImages, onDeleteImage }) => {
    const [overlayImage, setOverlayImage] = useState(null);

    const onFileChange = (event) => {
        updateImages([...event.target.files]);
    }
    
    const onClickAddFiles = () => {
        document.getElementById(inputid).click();
    }
    
    console.log("Images :", images);
    let renderedImages = images.map((image, index) => {
        if (!image) return;
        let url;
        if ("imageid" in image) url = getImagePath('set', image.imageid);
        else url = URL.createObjectURL(image.payload);
        return (
            <Grid.Column className="image-wrapper" key={index} style={{ padding: '0.25rem' }}>
                <Image bordered
                    className="grid-image"
                    src={url}
                    onClick={() => setOverlayImage(url)} />
                <Button icon onClick = {() => {onDeleteImage(image.id)}} attached = "bottom" color = "red"><Icon name = "trash"/></Button>
            </Grid.Column>
        );
    });

    let imageCount = 0;
    for (let i = 0; i < images.length; i++){
        if (images[i]) imageCount++;
    }

    return (
        <div>
            <Segment style={{ boxShadow: 'none', display: 'flex', alignItems: 'center', margin: 'none', padding: 'none' }}>
                <Button basic onClick={() => onClickAddFiles()}>Add</Button>
                {
                    images && imageCount > 0
                        ? <p>{imageCount} Images Selected</p>
                        : <p>No Images Selected</p>
                }
            </Segment>
            <input multiple hidden
                type="file"
                id={inputid}
                name="file"
                accept="image/*"
                onChange={(e) => onFileChange(e)} />
            {
                images && images.length > 0 &&
                <Grid centered stackable doubling
                    columns="6"
                    style={{ margin: '0.25rem' }}>
                    {renderedImages}
                </Grid>
            }
            <ImageOverlay imageURL={overlayImage} setImageURL={setOverlayImage} />
        </div>
    );
}

export default ImageUploader;

