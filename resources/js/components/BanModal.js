import React, { useState } from 'react';
import { Modal, Button, Grid } from "semantic-ui-react";
import axios from 'axios';

import { toast } from './Toast';

const BanModal = ({ trigger, userid, reportid }) => {

    // Use to determine when the modal is open or closed  
    const [open, setOpen] = useState(false);

    //const [banReason, setBanReason] = useState('');

    const submitBanReason = (userid, reportid) => {
        setOpen(false);
        axios.post(`/api/delete/report`, { reportid: reportid })

        axios.post(`/api/delete/user`, { userid: userid, banUser: true }).then(() => {
            toast("Successfully banned user", "success");
        }).catch((err) => {
            toast("Server error while banning user: " + error, "error");
        });
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
                <Modal.Content style={{ margin: "20px" }} >
                    <Grid.Row>
                        <Grid.Column>
                            <h1 className = "ss-text-primary">Are you sure you would like to ban this user?</h1>
                            <br />
                            <Button color='blue' onClick={() => setOpen(false)}> Cancel </Button>
                            <Button color='red' onClick={() => submitBanReason(userid, reportid)}> Ban Account </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Modal.Content>
            </Grid>
        </Modal>
    );

};

export default BanModal;