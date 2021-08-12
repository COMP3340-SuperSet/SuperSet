import React, { useState, useEffect } from 'react';
import { Grid, Button, Popup, Image, Icon } from "semantic-ui-react";

import "../../css/Carousel.css";

const generateKey = (length) => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    while (length--) { result += characters.charAt(Math.floor(Math.random() * characters.length)); }
    return result;
}

const Dot = ({ active = false, onClick = () => { } }) => {
    const dotStyle = {
        height: "15px",
        width: "15px",
        margin: "10px",
        borderRadius: "50%",
        border: "1px solid black",
        display: "inline-block"
    };
    const dotBg = active ? "ss-bg-secondary" : "ss-bg-primary hoverable";

    return (
        <div style={dotStyle} className={dotBg} onClick={onClick}>&nbsp;</div>
    );
}

const Carousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [imageKey, setImageKey] = useState(generateKey(8));

    useEffect(() => {
    }, [images]);

    const switchSlide = (index) => {
        document.getElementById(imageKey + "-" + currentImage).classList.remove("show");
        document.getElementById(imageKey + "-" + currentImage).classList.add("hide");

        document.getElementById(imageKey + "-" + index).classList.remove("hide");
        document.getElementById(imageKey + "-" + index).classList.add("show");

        setCurrentImage(index);
    }

    const goRight = () => {
        if (currentImage === (images.length - 1)) { switchSlide(0); return; }
        switchSlide(currentImage + 1);
    }

    const goLeft = () => {
        if (currentImage === 0) { switchSlide(images.length - 1); return; }
        switchSlide(currentImage - 1);
    }

    const imageContainerStyle = {
        width: "100%"
    };

    const imageStyle = {
        width: "100%",
        height: "550px",
        objectFit: "scale-down"
    };

    const dotContainerStyle = {
        display: "flex",
        justiftContent: "center",
        alignItems: "center"
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };

    const renderedImages = images.map((img, index) => {
        const imgid = imageKey + "-" + index;
        const imgclass = (index === 0) ? " show " : " hide ";
        return <Image key={index}
            src={img}
            style={imageStyle}
            className={imgclass}
            id={imgid}
            onClick={() => { goRight() }} />
    });

    const renderedDots = images.map((img, index) => {
        if (index === currentImage) return <Dot key={index} active />;
        return <Dot key={index} onClick={() => { switchSlide(index) }} />
    });

    return (
        <Grid centered stackable>
            <Grid.Row>
                <Grid.Column width={8}>
                    <div style={imageContainerStyle}>
                        {renderedImages}
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8}>
                    <div style={buttonContainerStyle}>
                        <Popup
                            content='Previous Slide'
                            position='left center'
                            trigger={<Button icon onClick={() => { goLeft() }} ><Icon name="left chevron" />&nbsp;Prev</Button>}
                        />
                        <div style={dotContainerStyle}>
                            {renderedDots}
                        </div>
                        <Popup
                            content='Next Slide'
                            position='right center'
                            trigger={<Button icon onClick={() => { goRight() }} >Next&nbsp;<Icon name="right chevron" /></Button>}
                        />
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Carousel;