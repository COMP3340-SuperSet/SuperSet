
import React, { useState } from 'react';
import {Grid, Button, Container, Progress} from "semantic-ui-react";
import "../../css/InstructionsCarousel.css";
import Title from './Title'
import ImageSlider from "./ImageSlider";

import setInstructions from "../../images/superset.png";
import adminInstructions from "../../images/superset.png";
import reportInstructions from "../../images/superset.png";

/*
import setInstructions from "../public/images/testIMG1.jpg";
import adminInstructions from "../public/images/testIMG2.jpg";
import reportInstructions from "../public/images/testIMG3.jpg";
*/

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

const InstructionsCarousel = () => {

    const [percent, setPercent] = useState(null);
    const [pageOffset, setPageOffset] = useState(0);

    return(
        <div className="ss-instructions-location">
            <Grid centered stackable columns={3}>
                <Grid.Column>
                    <Title title={"SuperSet"} subtitle={"How it Works"}/>
                    <Container className="ss-instructions-container">
                        <ImageSlider setPercent={setPercent} images={SliderData} pageOffset={pageOffset} setPageOffset={setPageOffset}/>
                    </Container>
                    <Progress percent={percent} style={{marginTop: '10px'}}></Progress>
                    <Button.Group fluid>
                        <Button content="Back" icon="left chevron" labelPosition='left' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(-1)}/>
                        <Button content="Get Started" className="ss-instructions-button" attached="bottom"/>
                        <Button content="Forward" icon="right chevron" labelPosition='right' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(1)}/>
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default InstructionsCarousel;
