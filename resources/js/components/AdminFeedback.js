import React, {useState} from 'react';
import {Table, Header, Button} from 'semantic-ui-react';

const AdminFeedback = ({allFeedback}) => {
    
    const [userFeedback, setUserFeedback] = useState(allFeedback);

    const renderedUserFeedback = userFeedback.map((feedback) => {
        return(
            <Table.Row key={feedback.email} className='ss-adminfeedback-row'>
                <Table.Cell width={14}>
                    <Header as='h2' className='ss-reporttableitem-header'>
                        <Header.Content style={{margin:'10px'}}>
                            {feedback.email}
                            <Header.Subheader>{feedback.content}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button.Group vertical>  
                        <Button color='blue' content='Send E-mail'/>
                        <Button color='red' content='Delete Feedback'/>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    })

    return(
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedUserFeedback}
            </Table>
        </div>
    );
}

export default AdminFeedback;