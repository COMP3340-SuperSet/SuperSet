import React, { useState } from 'react';
import { Grid, Button, Popup, Image, Icon } from "semantic-ui-react";

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

    const goRight = () => {
        if (currentImage === (images.length - 1)) { setCurrentImage(0); return; }
        setCurrentImage(currentImage + 1);
    }

    const goLeft = () => {
        if (currentImage === 0) { setCurrentImage(images.length - 1); return; }
        setCurrentImage(currentImage - 1);
    }

    const imageContainerStyle = {
        width: "100%"
    };

    const imageStyle = {
        width: "100%",
        height: "550px",
        objectFit: "scale-down",
        display: "none"
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

    const renderedDots = images.map((img, index) => {
        if (index === currentImage) return <Dot key = {index} active />;
        return <Dot key = {index} onClick={() => { setCurrentImage(index) }} />
    });

    return (
        <Grid centered stackable>
            <Grid.Row>
                <Grid.Column width={8}>
                    <div style={imageContainerStyle}>
                        <Image src={images[currentImage]} style={{ ...imageStyle, display: "block" }} onClick = {() => {goRight()}} />
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8}>
                    <div style={buttonContainerStyle}>
                        <Popup
                            content='Previous Slide'
                            position='left center'
                            trigger={<Button icon onClick={() => { goLeft() }} ><Icon name = "left chevron"/>&nbsp;Prev</Button>}
                        />
                        <div style={dotContainerStyle}>
                            {renderedDots}
                        </div>
                        <Popup
                            content='Next Slide'
                            position='right center'
                            trigger={<Button icon onClick={() => { goRight() }} >Next&nbsp;<Icon name = "right chevron"/></Button>}
                        />
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Carousel;