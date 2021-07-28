import React, { useState, useEffect, useRef } from 'react';
import { Table, Header, Button, Statistic, Rating, Divider, Segment, Grid, Container } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';

let template =
    [
        {
            feedbackid: 1,
            email: "TemplateFeedback@email.ca",
            rating: 4
        }
    ];



function getContact(userFeedback, toggleView) {
    const [deleted, setDeleted] = useState([]);

    const onFeedbackDelete = (feedbackid) => {
        axios.post('/api/delete/feedback', { feedbackid }).then(response => { 
            toast("Successfully deleted feedback", "success");
            setDeleted([...deleted, feedbackid]);
        }).catch(err => console.error(err));
    }

    if (userFeedback.length != 0) {
        if (toggleView) {
            const renderedUserFeedback = userFeedback.map((feedback) => {
                if (feedback.contact && !(feedback.email === "" && !(deleted.find(elem => elem === feedback.feedbackid)))) {
                    return (
                        <Table.Row key={feedback.feedbackid} >
                            <Table.Cell width={14}>
                                <Header as='h2' className='ss-reporttableitem-header'>
                                    <Header.Content style={{ margin: '10px' }} className="ss-text-primary">
                                        {feedback.email}
                                        <Header.Subheader className="ss-text-secondary">
                                            Contact: {feedback.email} <br />
                                            Feedback Content: {feedback.content} <br />
                                            <Rating disabled={true} maxRating={feedback.rating} rating={feedback.rating} />
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button.Group vertical>
                                    <Button color='red' content='Delete Feedback' onClick={() => { onFeedbackDelete(feedback.feedbackid) }} />
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    );
                }
            })

            return renderedUserFeedback;
        }
        else {
            const renderedUserFeedback = userFeedback.map((feedback) => {
                return (
                    <Table.Row key={feedback.feedbackid} >
                        <Table.Cell width={14}>
                            <Header as='h2'>
                                <Header.Content style={{ margin: '10px' }} className="ss-text-primary">
                                    {feedback.email}
                                    <Header.Subheader className="ss-text-secondary">
                                        Feedback Content: {feedback.content} <br />
                                        <Rating disabled={true} maxRating={feedback.rating} rating={feedback.rating} />
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button.Group vertical>
                                <Button color='red' content='Delete Feedback' onClick={() => { onFeedbackDelete(feedback.feedbackid) }} />
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                );
            })
            return renderedUserFeedback;
        }
    }
    return null;
    
}

const AdminFeedback = () => {

    const [userFeedback, setUserFeedback] = useState([]);
    const [toggleView, setToggleView] = useState(false);
    const isCurrent = useRef(true);


    useEffect(() => {
        return () => {
            //console.log("Unmounted Feedback Table");
            isCurrent.current = false;
        };
    }, []);
    useEffect(() => {
        axios.get(`/api/feedback`).then(response => {
            setTimeout(() => {
                if (isCurrent.current) {
                    setUserFeedback(response.data);
                }
            }, 1000);
        }).catch(error => {
            console.log("Error:" + error);
        });
    }, [userFeedback]);

    const renderedUserFeedback = getContact(userFeedback, toggleView);

    return (
        <Container fluid style={{ padding: "12px 12px 0 12px" }}>
            <Grid style={{ padding: "0 12px" }}>
                <Grid.Column floated='left' verticalAlign="middle" width={4}>
                    <Statistic horizontal size='mini' label="Feedback Reports" value={userFeedback.length} />
                </Grid.Column>
                <Grid.Column floated='right' verticalAlign="middle" width={4} textAlign="right">
                    <Button onClick={() => { setToggleView(!toggleView) }}>Filter by Contact</Button>
                </Grid.Column>
            </Grid>

            <Divider style={{ marginTop: "24px" }} />

            <Segment padded basic>
                <Table stackable basic='very' fixed>
                    <Table.Body>
                        {renderedUserFeedback}
                    </Table.Body>
                </Table>
            </Segment>
        </Container>
    );
}

export default AdminFeedback;