import React, { useState } from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import { getImagePath } from '../utils/imagePath';
import ImageOverlay from './ImageOverlay';

const ImageList = ({ images, onDeleteImage }) => {
    if (!images || !images.length) return null;

    const [overlayed, setOverlayed] = useState(null);

    const tempImages = images.map(image => {
        const tempImage = {};

        if ('imageid' in image) {
            if ('itemid' in image) {
                tempImage.display = getImagePath('item', image.imageid);
            } else if ('setid' in image) {
                tempImage.display = getImagePath('set', image.imageid);
            } else {
                tempImage.display = getImagePath('user', image.imageid);
            }
            tempImage.onClick = tempImage.display;
        }

        else if ('urls' in image) {
            tempImage.display = `${image.urls.full}&q=80&w=200&h=200`;
            tempImage.onClick = image.urls.full;
        }

        else {
            tempImage.display = URL.createObjectURL(image);
            tempImage.onClick = tempImage.display;
        }

        return tempImage;
    });

    let renderedImages = tempImages.map((image, index) => {
        if (!image) return;
        return (
            <Grid.Column className="image-wrapper" key={index} style={{ padding: '0.25rem' }}>
                <Image bordered
                    className="grid-image"
                    src={image.display}
                    onClick={() => setOverlayed(images[index].urls.full)} />
                <Button icon onClick={() => onDeleteImage(index)} attached="bottom" color="red"><Icon name="trash" /></Button>
            </Grid.Column>
        );
    });

    return (
        <div>
            <Grid centered stackable doubling
                columns="6"
                style={{ margin: '0.25rem' }}>
                {renderedImages}
            </Grid>
            <ImageOverlay imageURL={overlayed} setImageURL={setOverlayed} />
        </div>

    );
};

export default ImageList;