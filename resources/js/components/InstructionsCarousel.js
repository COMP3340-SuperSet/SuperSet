
import React, { useState } from 'react';
import {Grid, Button, Container, Progress} from "semantic-ui-react";
import "../../css/Instructions.css";
import SSHeader from './Header'
import Title from './Title'
import ImageSlider from "./ImageSlider";

const InstructionsCarousel = ({images}) => {
    /*
    * Input: --Array of Images--
    * Description: The purpose of this functional component is to house the 
    *               all other functional components that are related to the 
    *               webpages instructions
    * Usage: InstructionCarousel.js --> LandingPage.js
    */

    // Contains the max percent increase
    const [percent, setPercent] = useState(null);

    // Use to determine what direction the actor is going in the instructions 
    const [pageOffset, setPageOffset] = useState(0);

    return(
        <div>
            <SSHeader />
            <div className="ss-instructions-location">
                <Grid centered stackable columns={3}>
                    <Grid.Column>
                        <Title title={"SuperSet"} subtitle={"How it Works"}/>
                        <Container className="ss-instructions-container">
                            <ImageSlider setPercent={setPercent} itemImages={images} pageOffset={pageOffset} setPageOffset={setPageOffset}/>
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
        </div>
    );
};

export default InstructionsCarousel;