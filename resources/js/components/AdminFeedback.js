import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Table, Header, Button, Rating, Statistic} from 'semantic-ui-react';
import "../../css/AdminFeedback.css";

function onDelete(feedbackid)
{
    // Logic to delete from database when button is pressed
    // axios.post().then(response=>{}).catch(error=>{});
}

function onContact(email)
{
    // Logic to send e-mail to user
}


function getContact(userFeedback, toggleView)
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
                                <Header.Content style={{margin:'10px'}}>
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
                                <Button color='blue' content='Send E-mail' onClick={()=>{onContact(feedback.email)}}/>
                                <Button color='red' content='Delete Feedback' onClick={()=>{onDelete(feedback.feedbackid)}}/>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                );
            }
            else
            {
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
                            <Header.Content style={{margin:'10px'}}>
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
                            <Button color='red' content='Delete Feedback' onClick={()=>{onDelete(feedback.feedbackid)}}/>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
        })
        return renderedUserFeedback;
    }
}


const AdminFeedback = () => {
    
    const [userFeedback, setUserFeedback] = useState([]);
    const [toggleView, setToggleView] = useState(false);

    useEffect(()=>{
        axios.get(`/api/feedback`).then(response=>{
            setUserFeedback(response.data);
        }).catch(error=>{
            console.log("Error:" + error);
        });
    }, []);

    const renderedUserFeedback = getContact(userFeedback, toggleView);

    return(
        
        <div className="ss-feedback-divadmin">
            <Statistic horizontal size='mini' className="ss-feedback-stats">
                <Statistic.Value>{userFeedback.length}</Statistic.Value>
                <Statistic.Label>Feedback Reports</Statistic.Label>
            </Statistic>
            <Button className='ss-feedback-togglebutton' onClick={() => {setToggleView(!toggleView)}}>
                Filter by Contact
            </Button>
            <Table stackable basic='very' celled fixed>
                {renderedUserFeedback}
            </Table>
        </div>
    );
}

export default AdminFeedback;