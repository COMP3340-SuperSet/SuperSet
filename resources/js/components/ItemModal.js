
import React, { useEffect, useState } from 'react';
import { Modal, Button, Grid, Icon, Popup} from "semantic-ui-react";

import Carousel from './Carousel';
import Confirmation from './Confirmation';

import { makeReport } from '../utils/makeReport';

import "../../css/ItemModal.css";

const ItemModal = ({ item, modalTrigger = <Button>Modal</Button>, images = [], showReport = false }) => {
    /*
    * Input: --itemImages, itemName, itemDescription--
    * Description: The purpose of this functional component is to house the 
    *               all other functional components that are related to items
    * Usage: ItemModal.js --> /views
    */

    // Use to determine when the modal is open or closed  
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState(images);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1);
    }, [images]);

    useEffect(() => {
        if (count === 2) setModalImages(images);
    }, [count]);

    return (
        <Modal
            onClose={() => setModalOpen(false)}
            onOpen={() => setModalOpen(true)}
            open={modalOpen}
            trigger={modalTrigger}
            size="small" >

            <Modal.Header style={{ textAlign: "center", fontSize: "26px" }}>
                {item.name}
                {showReport &&
                    <Confirmation style={{ position: "absolute", top: "12px", right: "8px" }}
                        trigger={<Button icon color="red"><Icon name="flag" /> Report</Button>}
                        onConfirm={() => { makeReport('item', item.itemid) }}
                        text="Are you sure you would like to report this item?" />}
            </Modal.Header>
            <Modal.Content>
                <Grid.Row style={{ paddingBottom: "12px", textAlign: "center", fontSize: "20px" }}>
                    <p className="ss-text-secondary">{item.description}</p>
                </Grid.Row>

                {modalImages.length ? <Grid.Row>
                    <Grid.Column>
                        <Carousel images={modalImages} />
                    </Grid.Column>
                </Grid.Row> : <p className="ss-text-light" style={{ textAlign: "center" }}>No images</p>}
            </Modal.Content>

            <Modal.Actions style={{ textAlign: "center" }}>
            <Popup 
                    content='Go Back' 
                    position='top center'
                    trigger={<Button color='blue' onClick={() => setModalOpen(false)}> Back </Button>}
                />
            </Modal.Actions>
        </Modal>
    );

};

export default ItemModal;