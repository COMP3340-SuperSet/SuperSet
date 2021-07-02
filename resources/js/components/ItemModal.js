
import React, {useState} from 'react';
import {Modal, Button, Grid} from "semantic-ui-react";
import "../../css/ItemModal.css";
import ItemCarousel from './ItemCarousel';

const ItemModal = ({itemId, itemName, itemDescription, itemImages, modalTrigger = <Button>Show Modal</Button>}) => {

    const [open, setOpen] = useState(false);
    
    return(
        <Modal  
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={modalTrigger}
        >
            <Modal.Header className="ss-itemmodal-modalheader">Item View: {itemName}</Modal.Header>
            <Grid centered stackable columns={3}>
                <Modal.Content image>
                    <Grid.Row>
                        <Grid.Column className="ss-itemmodal-images">
                            <ItemCarousel/>
                        </Grid.Column>

                        <Modal.Description>
                            <Grid.Column className="ss-itemmodal-description">
                                <hr></hr>
                                <p>{itemDescription}</p>
                            </Grid.Column>
                        </Modal.Description>
                        </Grid.Row>
            </Modal.Content>
            </Grid>

            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}> Done </Button>
            </Modal.Actions>
        </Modal>
    );

};

export default ItemModal;