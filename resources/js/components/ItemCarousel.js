
import React, { useState } from 'react';
import {Grid, Button, Container, Progress} from "semantic-ui-react";
import "../../css/InstructionsCarousel.css";
import ImageSlider from "./ImageSlider";
import setInstructions from "../public/images/testIMG1.jpg";
import adminInstructions from "../public/images/testIMG2.jpg";
import reportInstructions from "../public/images/testIMG3.jpg";

const SliderData = [
    {
        url: setInstructions
    },
    {
        url: adminInstructions
    },
    {
        url: reportInstructions
    }
];

const ItemCarousel = () =>
{
    const [percent, setPercent] = useState(null);

    const [pageOffset, setPageOffset] = useState(0);

    return(
        <div className="ss-instructions-location">
            <Grid centered stackable columns={3}>
                <Grid.Column>
                    <Container className="ss-instructions-container">
                        <ImageSlider setPercent={setPercent} images={SliderData} pageOffset={pageOffset} setPageOffset={setPageOffset}/>
                    </Container>
                    <Progress percent={percent} style={{marginTop: '10px'}}></Progress>
                    <Button.Group fluid>
                        <Button content="Back" icon="left chevron" labelPosition='left' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(-1)}/>
                        <Button content="Forward" icon="right chevron" labelPosition='right' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(1)}/>    
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default ItemCarousel;