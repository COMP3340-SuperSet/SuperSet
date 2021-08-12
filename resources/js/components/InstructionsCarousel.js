
import React, { useState } from 'react';
import { Grid, Button, Container, Progress, Image, Popup} from "semantic-ui-react";

import ImageSlider from "./ImageSlider";
import { redirect } from '../utils/redirect';

import logoFull from "../../images/supersetfull.png";

const InstructionsCarousel = ({ images }) => {
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

    return (
        <div>
            <div className="ss-instructions-location">
                <Grid centered stackable>
                    <Grid.Column width={8} style={{ textAlign: "center" }}>
                        <Image src={logoFull} style={{ margin: "30px auto 6px auto" }} size="large" />
                        <Container textAlign="center">
                            <p className="ss-title-subtitle" style={{ paddingBottom: "0" }}>How it works</p>
                            <p className="ss-text-primary" style={{ marginBottom: "14px", fontSize: "16px" }}>Create and manage organized sets of items</p>
                        </Container>
                        <Container className="ss-instructions-container">
                            <ImageSlider setPercent={setPercent} itemImages={images} pageOffset={pageOffset} setPageOffset={setPageOffset} />
                        </Container>
                        <Progress percent={percent} style={{ marginBottom: "6px" }}></Progress>
                        <Button.Group fluid>
                            <Popup 
                                    content='Move Backward' 
                                    position='left center'
                                    trigger={<Button content="Back" icon="left chevron" labelPosition='left' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(-1)} />}
                                />
                            <Popup 
                                    content='Move forward' 
                                    position='left center'
                                    trigger={<Button content="Forward" icon="right chevron" labelPosition='right' className="ss-instructions-button" attached="bottom" onClick={() => setPageOffset(1)} />}
                                />
                            </Button.Group>
                            <Popup 
                                    content='Go to registration page' 
                                    position='left center'
                                    trigger={<Button content="Get Started" className="ss-instructions-button"  onClick={() => redirect('/register')} />}
                                />
                        </Grid.Column>
                </Grid>
            </div>
        </div>
    );
};

export default InstructionsCarousel;