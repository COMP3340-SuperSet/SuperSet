import React, { useState, useEffect } from 'react';
import { List, Button, Icon, Form, Segment, Grid, Image } from "semantic-ui-react";
import ImageOverlay from './ImageOverlay';


const ImageUploader = ({ images, updateImages }) => {
    const [overlayImage, setOverlayImage] = useState(null);

    const onFileChange = (event) => {
        updateImages([...images, ...event.target.files]);
    }
    
    const onClickAddFiles = () => {
        document.getElementById('file').click();
    }
    
    let renderedImages = images.map((image, index) => {
        const url = URL.createObjectURL(image);
        return (
            <Grid.Column className="image-wrapper" key={index} style={{ padding: '0.25rem' }}>
                <Image bordered
                    className="grid-image"
                    src={url}
                    onClick={() => setOverlayImage(url)} />
            </Grid.Column>
        );
    });

    return (
        <div>
            <Segment style={{ boxShadow: 'none', display: 'flex', alignItems: 'center', margin: 'none', padding: 'none' }}>
                <Button basic onClick={() => onClickAddFiles()}>Add</Button>
                {
                    images && images.length
                        ? <p>{images.length} Images Selected</p>
                        : <p>No Images Selected</p>
                }
            </Segment>
            <input multiple hidden
                type="file"
                id="file"
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

