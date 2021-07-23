import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Form, Header, Rating, Button, Checkbox } from "semantic-ui-react";
import "../../css/FeedbackPage.css";
import { toast } from './Toast'

const FeedbackForm = () => {

    const [textFeedback, setTextFeedback] = useState('');
    const [intFeedback, setIntFeedback] = useState(0);
    const [reachoutEmail, setReachoutEmail] = useState('');
    const [willReachout, setWillReachout] = useState(false);

    useEffect(() => { }, [textFeedback, intFeedback, reachoutEmail, willReachout]);

    const fullFeedback = () => {
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
            toast('Error Submitting Feedback', 'error');
        });
    }

    return (
        <div className='ss-feedback-div'>
            <Header icon='clipboard' as="h2" content='Website Feedback' />
            <div className='ss-feedback-griddiv'>
                <Grid centered stackable columns={3}>
                    <Grid.Row>
                        <Grid.Column className='ss-feedback-gridcolumn'>
                            <div className="ss-feedback-formdiv">
                                <Header content="What is on your mind?" className='ss-feedback-header' />
                                <Form className="ss-feedback-form">
                                    <Form.TextArea
                                        onChange={(e, { value }) => { setTextFeedback(value) }}
                                        className='ss-feedback-formtextarea'
                                        placeholder='Enter feedback here: '
                                        value={textFeedback}
                                        rows={10}
                                    />
                                </Form>
                                <div className='ss-feedback-starslabel'>
                                    <label> Please Enter a Rating: </label>
                                    <Rating icon='star' maxRating={5} onRate={(e, { rating }) => { setIntFeedback(rating) }} rating={intFeedback} />
                                </div>
                                <div>
                                    <Form>
                                        <Checkbox
                                            className='ss-feedback-checkbox'
                                            label='Get E-mails'
                                            onChange={() => { setWillReachout(!willReachout) }}
                                            checked={willReachout}
                                        />
                                        <Form.TextArea
                                            onChange={(e, { value }) => { setReachoutEmail(value) }}
                                            className='ss-feedback-emailtextarea'
                                            placeholder='Enter E-mail Here: '
                                            value={reachoutEmail}
                                            rows={1}
                                        />
                                    </Form>
                                </div>
                                <div className='ss-feedback-submitbutton'>
                                    <Button content="Submit Feedback" onClick={() => { fullFeedback() }} />
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
}


export default FeedbackForm;