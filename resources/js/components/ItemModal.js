import React, { useState } from 'react';
import { Modal, Button, Grid } from "semantic-ui-react";
import "../../css/ItemModal.css";
import ItemCarousel from './ItemCarousel';

const ItemModal = ({ item, modalTrigger = <Button>Modal</Button>, images = [] }) => {
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
            size="small" >

            <Modal.Header style={{ textAlign: "center", fontSize: "26px" }}>{item.name}</Modal.Header>
            <Modal.Content>
                <Grid.Row style={{ paddingBottom: "12px", textAlign: "center", fontSize: "20px" }}>
                    <p className="ss-text-secondary">{item.description}</p>
                </Grid.Row>

                {images.length ? <Grid.Row>
                    <Grid.Column>
                        <ItemCarousel itemImages={images} />
                    </Grid.Column>
                </Grid.Row> : <p className = "ss-text-light" style = {{textAlign: "center"}}>No images</p>}
            </Modal.Content>

            <Modal.Actions style={{ textAlign: "center" }}>
                <Button color='blue' onClick={() => setModalOpen(false)}> Back </Button>
            </Modal.Actions>
        </Modal>
    );

};

export default ItemModal;