import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Table, Header, Button, Statistic, Rating } from 'semantic-ui-react';
import "../../css/AdminFeedback.css";

let template = 
[
    {
        feedbackid: 1,
        email: "TemplateFeedback@email.ca",
        rating: 5
    }
];

function onFeedbackDelete(feedbackid)
{
    axios.post('/api/delete/feedback', {feedbackid}).then(response=>{}).catch(err=>console.log(err));
}

function getContact(userFeedback, toggleView)
{
    if(userFeedback.length != 0)
    {
        if(toggleView)
        {
            const renderedUserFeedback = userFeedback.map((feedback) => {
                if(feedback.contact && !(feedback.email ===""))
                {
                    return(
                        <Table.Row key={feedback.feedbackid} className='ss-adminfeedback-row'>
                            <Table.Cell width={14}>
                                <Header as='h2' className='ss-reporttableitem-header'>
                                    <Header.Content style={{ margin: '10px' }}>
                                        {feedback.email}
                                        <Header.Subheader>
                                            Contact: True <br/>
                                            Feedback Content: {feedback.content} <br/> 
                                            <Rating disabled={true} maxRating={feedback.rating} rating={feedback.rating}/> 
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button.Group vertical>  
                                    <Button color='red' content='Delete Feedback' onClick={()=>{onFeedbackDelete(feedback.feedbackid)}}/>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    );
                }
                else {
                    return '';
                }
            })

            return renderedUserFeedback;
        }
        else 
        {
            const renderedUserFeedback = userFeedback.map((feedback) => {
                return(
                    <Table.Row key={feedback.feedbackid} className='ss-adminfeedback-row'>
                        <Table.Cell width={14}>
                            <Header as='h2' className='ss-reporttableitem-header'>
                                <Header.Content style={{ margin: '10px' }}>
                                    {feedback.email}
                                    <Header.Subheader>
                                        Feedback Content: {feedback.content} <br/>
                                        <Rating disabled={true} maxRating={feedback.rating} rating={feedback.rating}/>
                                        </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button.Group vertical>  
                                <Button color='red' content='Delete Feedback' onClick={()=>{onFeedbackDelete(feedback.feedbackid)}}/>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                );
            })
            return renderedUserFeedback;
        }
    }
    else
    {
        const renderedUserFeedback = template.map((feedback) => {
            return(
                <Table.Row key={feedback.feedbackid} className='ss-adminfeedback-row'>
                    <Table.Cell width={14}>
                        <Header as='h2' className='ss-reporttableitem-header'>
                            <Header.Content style={{ margin: '10px' }}>
                                {feedback.email}
                                <Header.Subheader>
                                    Feedback Content: {feedback.content} <br/>
                                    <Rating disabled={true} maxRating={feedback.rating} rating={feedback.rating}/>
                                    </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button.Group vertical>  
                            <Button color='red' content='Delete Feedback' onClick={()=>{onFeedbackDelete(feedback.feedbackid)}}/>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
        });

        return renderedUserFeedback;
    }
}

const AdminFeedback = () => {
    
    const [userFeedback, setUserFeedback] = useState([]);
    const [toggleView, setToggleView] = useState(false);
    const isCurrent = useRef(true);

    
    useEffect(()=>{
        return () => {
            console.log("Unmounted Feedback Table");
            isCurrent.current = false;
        };
    }, []);

    useEffect(()=>{
        axios.get(`/api/feedback`).then(response=>{
            setTimeout(()=>{
                if(isCurrent.current)
                {
                    setUserFeedback(response.data);
                }
            }, 1000);
        }).catch(error=>{
        console.log("Error:" + error);
        });
    }, [userFeedback]);

    const renderedUserFeedback = getContact(userFeedback, toggleView);

    return (

        <div className="ss-feedback-divadmin">
            <Statistic horizontal size='mini' className="ss-feedback-stats">
                <Statistic.Value>{userFeedback.length}</Statistic.Value>
                <Statistic.Label>Feedback Reports</Statistic.Label>
            </Statistic>
            <Button className='ss-feedback-togglebutton' onClick={() => {setToggleView(!toggleView)}}>
                Filter by Contact
            </Button>
            <Table stackable basic='very' celled fixed>
                <thead>
                    {renderedUserFeedback}
                </thead>
            </Table>
        </div>
    );
}

export default AdminFeedback;