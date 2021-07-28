
import React, { useState } from 'react';
import { Grid, Button, Container, Progress, Popup} from "semantic-ui-react";

import ImageSlider from "./ImageSlider";

const AdminCarousel = ({ images }) => {


    const [percent, setPercent] = useState(null);
    const [pageOffset, setPageOffset] = useState(0);

    return (
        <Grid centered stackable>
            <Grid.Column width = {8}>
                <Container className="ss-instructions-container">
                    <ImageSlider size = "massive" setPercent={setPercent} itemImages={images} pageOffset={pageOffset} setPageOffset={setPageOffset} />
                </Container>
                <Progress percent={percent} style={{ marginTop: '10px' }}></Progress>
                <Button.Group fluid >
                    <Popup
                        content='Previous Slide'
                        position='left center'
                        trigger={<Button content="Back" icon="left chevron" labelPosition='left' attached="bottom" onClick={() => setPageOffset(-1)} />}
                    />
                    <Popup
                        content='Next Slide'
                        position='right center'
                        trigger={<Button content="Forward" icon="right chevron" labelPosition='right' attached="bottom" onClick={() => setPageOffset(1)} />}
                    />
                </Button.Group>
            </Grid.Column>
        </Grid>
    );
};

export default AdminCarousel;