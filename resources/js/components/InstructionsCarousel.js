
import React, { useState } from 'react';
import {Grid, Button, Container, Progress, Image } from "semantic-ui-react";
import "../../css/Instructions.css";
import "../../css/Title.css";
import logoFull from "../../images/supersetfull.png";

import Title from './Title'
import ImageSlider from "./ImageSlider";
import { redirect } from '../utils/redirect';

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
            <div className="ss-instructions-location">
                <Grid centered stackable columns={3}>
                    <Grid.Column>
                        <Image src = {logoFull} style = {{margin: "30px 0"}}/>
                        <Container textAlign = "center"><p className = "ss-title-subtitle">How it works</p></Container>

                        { false && <Title title={"SuperSet"} subtitle={"How it Works"}/>}
                        <Container className="ss-instructions-container">
                            <ImageSlider setPercent={setPercent} itemImages={images} pageOffset={pageOffset} setPageOffset={setPageOffset}/>
                        </Container>
                        <Progress percent={percent} style={{marginTop: '10px'}}></Progress>
                        <Button.Group fluid>
                            <Button content="Back" icon="left chevron" labelPosition='left' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(-1)}/>
                            <Button content="Get Started" className="ss-instructions-button" attached="bottom" onClick={() => redirect('/register')}/>
                            <Button content="Forward" icon="right chevron" labelPosition='right' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(1)}/>    
                        </Button.Group>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    );
};

export default InstructionsCarousel;