import React, { useState } from 'react';
import SSHeader from './Header';
import {Grid, Form, Header, Rating, Button} from "semantic-ui-react";
import "../../css/FeedbackPage.css";

const FeedbackPage = () => {

    const [textFeedback, setTextFeedback] = useState('');
    const [intFeedback, setIntFeedback] = useState(0);

    const fullFeedback = () =>{
        console.log(textFeedback);
        console.log(intFeedback);
        // Logic to send to database
    }

    return(
        <div>
            <SSHeader />
            <Header icon='clipboard' as="h2" content='Website Feedback'/>
            <div className='ss-feedback-griddiv'>
                <Grid centered stackable columns={3}>
                        <Grid.Row>
                            <Grid.Column className='ss-feedback-gridcolumn'>
                                <div className="ss-feedback-formdiv">
                                    <Header content="What is on your mind?" className='ss-feedback-header'/>
                                    <Form className="ss-feedback-form">
                                        <Form.TextArea
                                        onChange={(e, {value}) => setTextFeedback(value)}
                                        className='ss-feedback-formtextarea'
                                        placeholder='Enter feedback here: '
                                        />
                                    </Form>
                                    <div className='ss-feedback-starslabel'>
                                        <label> Please Enter a Rating: </label>
                                        <Rating icon='star' defaultRating={intFeedback} maxRating={5} onRate={(e, {rating})=>{setIntFeedback(rating)}}/>
                                    </div>
                                    <div className='ss-feedback-submitbutton'>
                                        <Button content="Submit Feedback" onClick={()=>{fullFeedback()}}/>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                </Grid>
            </div>
        </div>
    );
}


export default FeedbackPage;