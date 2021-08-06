import React from "react";
import { Image } from "semantic-ui-react";
import "../../css/ImageOverlay.css";

const ImageOverlay = ({ imageURL, setImageURL }) => {
    if (!imageURL) return null;

    const imageStyle = {
        objectFit: "contain"
    };

    return (
        <div className="image-overlay" onClick={() => setImageURL(null)}>
            <Image style={imageStyle} src={imageURL} />
        </div>
    );
}

export default ImageOverlay;