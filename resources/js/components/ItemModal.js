
import React, {useState} from 'react';
import {Modal, Button, Grid} from "semantic-ui-react";
import "../../css/ItemModal.css";
import ItemCarousel from './ItemCarousel';

const ItemModal = ({itemImages, itemName, itemDescription, trigger}) => {
    /*
    * Input: --itemImages, itemName, itemDescription--
    * Description: The purpose of this functional component is to house the 
    *               all other functional components that are related to items
    * Usage: ItemModal.js --> /views
    */

    // Use to determine when the modal is open or closed  
    const [open, setOpen] = useState(false);
    
    return(
        <Modal  
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
        >
            <Modal.Header className="ss-itemmodal-modalheader">Item View: {itemName}</Modal.Header>
            <Grid centered stackable columns={3}>
                <Modal.Content image>
                    <Grid.Row>
                        <Grid.Column className="ss-itemmodal-images">
                            <ItemCarousel itemImages={itemImages}/>
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
                <Button color='blue' onClick={() => setOpen(false)}> Back </Button>
            </Modal.Actions>
        </Modal>
    );

};

export default ItemModal;