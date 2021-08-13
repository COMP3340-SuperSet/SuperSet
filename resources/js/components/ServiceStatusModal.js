import React, { useState } from 'react';
import { Modal, Button, Grid, Header, Popup } from "semantic-ui-react";

const ServiceStatusModal = ({ name, description, statusDescription, trigger }) => {

    // Use to determine when the modal is open or closed  
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
        >
            <Modal.Header><Header as='h1' content={name} textAlign='center'/></Modal.Header>
            <br />
            <br />
            <Grid centered stackable columns={3}>
                <Modal.Content style={{ margin: "20px" }} >
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h3' content={'Service Description'} textAlign='center' className='ss-text-primary' />
                            <Header.Subheader as='h5' content={description}/>
                            <hr />
                            <Header as='h3' content={'Status Description'} textAlign='center' className='ss-text-primary' />
                            <Header.Subheader as='h5' content={statusDescription}/>
                            <br />
                            <Popup 
                                content='Go Back to Page' 
                                position='top center'
                                trigger={<Button color='blue' onClick={() => setOpen(false)}> Cancel </Button>}
                                />
                            
                        </Grid.Column>
                    </Grid.Row>
                </Modal.Content>
            </Grid>
        </Modal>
    );

};

export default ServiceStatusModal;