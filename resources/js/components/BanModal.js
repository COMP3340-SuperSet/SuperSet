
import React, { useState } from 'react';
import { Modal, Button, Grid, Form, TextArea } from "semantic-ui-react";
import "../../css/BanModal.css";

const BanModal = ({ trigger }) => {

    // Use to determine when the modal is open or closed  
    const [open, setOpen] = useState(false);

    const [banReason, setBanReason] = useState('');

    const submitBanReason = () => {
        setOpen(false);
        // Logic to send to user email
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
        >
            <Modal.Header>Banning Account</Modal.Header>
            <Grid centered stackable columns={3}>
                <Modal.Content>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <Form.TextArea
                                    onChange={(e, { value }) => setBanReason(value)}
                                    className='ss-banmodal-formfield'
                                    placeholder='Reason for ban: '
                                />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Modal.Content>
            </Grid>

            <Modal.Actions>
                <Button className='ss-banmodal-modalactions' color='blue' onClick={() => setOpen(false)}> Cancel </Button>
                <Button className='ss-banmodal-modalactions' color='red' onClick={submitBanReason}> Ban Account </Button>
            </Modal.Actions>
        </Modal>
    );

};

export default BanModal;