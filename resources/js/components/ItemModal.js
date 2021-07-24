import React, { useState } from 'react';
import { Modal, Button, Grid } from "semantic-ui-react";
import "../../css/ItemModal.css";
import ItemCarousel from './ItemCarousel';

const ItemModal = ({ item, modalTrigger = <Button>Modal</Button> }) => {
    /*
    * Input: --itemImages, itemName, itemDescription--
    * Description: The purpose of this functional component is to house the 
    *               all other functional components that are related to items
    * Usage: ItemModal.js --> /views
    */

    // Use to determine when the modal is open or closed  
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Modal
            onClose={() => setModalOpen(false)}
            onOpen={() => setModalOpen(true)}
            open={modalOpen}
            trigger={modalTrigger}
            size = "small"
        >

            <Modal.Header style = {{textAlign: "center", fontSize: "26px"}}>{item.name}</Modal.Header>
            <Modal.Content>
                <Grid.Row style ={{paddingBottom: "12px", textAlign: "center", fontSize: "20px"}}>
                    <p>{item.description}</p>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ItemCarousel itemImages={[]} />
                    </Grid.Column>
                </Grid.Row>
            </Modal.Content>

            <Modal.Actions style={{ textAlign: "center" }}>
                <Button color='blue' onClick={() => setModalOpen(false)}> Back </Button>
            </Modal.Actions>
        </Modal>
    );

};

export default ItemModal;