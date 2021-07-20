import React from "react";
import { Image } from "semantic-ui-react";
import "../../css/ImageOverlay.css";

const ImageOverlay = ({ imageURL, setImageURL }) => {
    if (!imageURL) return null;

    return (
        <div
            className="image-overlay"
            onClick={() => setImageURL(null)}>
            <div className="image-container">
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{display: 'inline-block', height: 'auto', width: 'auto'}}
                    src={imageURL}
                    className="overlayed-image" />
                </div>
            </div>
        </div>
    );
}

export default ImageOverlay;