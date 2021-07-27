
import React, { useState } from 'react';
import { Grid, Button, Container, Progress } from "semantic-ui-react";

import ImageSlider from "./ImageSlider";

const AdminCarousel = ({ images }) => {
    /*
    * Input: --Array of Images--
    * Description: The purpose of this functional component is to house the 
    *               all other functional components that are related to the 
    *               webpages instructions
    * Usage: AdminCarousel.js --> AdminInstructions.js
    */

    // Contains the max percent increase
    const [percent, setPercent] = useState(null);

    // Use to determine what direction the actor is going in the instructions 
    const [pageOffset, setPageOffset] = useState(0);

    return (
        <Grid centered stackable>
            <Grid.Column width = {8}>
                <Container className="ss-instructions-container">
                    <ImageSlider size = "massive" setPercent={setPercent} itemImages={images} pageOffset={pageOffset} setPageOffset={setPageOffset} />
                </Container>
                <Progress percent={percent} style={{ marginTop: '10px' }}></Progress>
                <Button.Group fluid >
                    <Button content="Back" icon="left chevron" labelPosition='left' attached="bottom" onClick={() => setPageOffset(-1)} />
                    <Button content="Forward" icon="right chevron" labelPosition='right' attached="bottom" onClick={() => setPageOffset(1)} />
                </Button.Group>
            </Grid.Column>
        </Grid>
    );
};

export default AdminCarousel;