import React, { useState, useEffect } from 'react';
import { Grid, Form, Header, Rating, Button, Checkbox, Segment } from "semantic-ui-react";
import axios from 'axios';

import { toast } from './Toast'

const FeedbackForm = () => {

    const [textFeedback, setTextFeedback] = useState('');
    const [intFeedback, setIntFeedback] = useState(0);
    const [reachoutEmail, setReachoutEmail] = useState('');
    const [willReachout, setWillReachout] = useState(false);

    useEffect(() => { }, [textFeedback, intFeedback, reachoutEmail, willReachout]);

    const fullFeedback = () => {
        let errorCheck = false;

        if (willReachout && !reachoutEmail){ toast("You have selected the option to recieve e-mails. Please enter your e-mail!", "error"); errorCheck = true; }
        if (!textFeedback){ toast("Please enter some feedback first!", "error"); errorCheck = true; }
        if (intFeedback === 0){ toast("Please enter a rating", "error"); errorCheck = true; }

        if (errorCheck) return;

        axios.post("/api/feedback",
            {
                email: reachoutEmail,
                contact: willReachout,
                content: textFeedback,
                rating: intFeedback
            }
        ).then(response => {
            toast('Feedback Submitted', 'success');
            setTextFeedback('');
            setIntFeedback(0);
            setReachoutEmail('');
            setWillReachout(false);
        }).catch(error => {
            toast('Error Submitting Feedback: ' + error, 'error');
        });
    }

    return (
        <Grid centered stackable>
            <Grid.Column width={8}>
                <Segment textAlign = "center" className = "ss-segment-primary" style = {{marginTop: "30px"}}>
                    <Header className = "ss-text-primary" style = {{fontSize: "26px", marginTop: "12px"}}>
                        Submit Feedback
                        <Header.Subheader className = "ss-text-secondary" style = {{fontSize: "18px", marginTop: "6px"}}>
                            Let us know of any feedback you have for us!
                        </Header.Subheader>
                    </Header>
                    <Form>
                        <Form.TextArea className = "ss-text-primary no-resize" style = {{fontSize: "16px", marginTop: "6px", background: "none"}}
                            onChange={(e, { value }) => { setTextFeedback(value) }}
                            placeholder='Enter feedback'
                            value={textFeedback}
                            rows={10}
                        />
                    </Form>
                    <span className = "ss-text-primary" style = {{fontSize: "16px", marginTop: "18px"}}> How would you rate our site? </span>
                    <Rating icon='star' maxRating={5} onRate={(e, { rating }) => { setIntFeedback(rating) }} rating={intFeedback} style = {{marginTop: "18px"}}/>
                    <Form>
                        <Checkbox className = "ss-text-primary" style = {{fontSize: "16px", marginTop: "12px"}}
                            label='Get E-mails'
                            onChange={() => { setWillReachout(!willReachout) }}
                            checked={willReachout}
                        />
                        <Form.TextArea className = "ss-text-primary no-resize" style = {{fontSize: "16px", marginTop: "12px", background: "none"}}
                            onChange={(e, { value }) => { setReachoutEmail(value) }}
                            placeholder='E-mail'
                            value={reachoutEmail}
                            rows={1}
                        />
                    </Form>
                    <Button content="Submit Feedback"  onClick={() => { fullFeedback() }} style = {{marginTop: "12px"}}/>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}


export default FeedbackForm;