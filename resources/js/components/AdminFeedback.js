import React, { useState } from 'react';
import { Table, Header, Button } from 'semantic-ui-react';
import "../../css/AdminFeedback.css";


const TableInfo = [
    {
        email: "BrettShepley@gmail.com",
        contact: true,
        content: "This site sucks",
        rating: 1
    },
    {
        email: "Brett@gmail.com",
        contact: false,
        content: "This site is pretty cool",
        rating: 5
    },
    {
        email: "",
        contact: false,
        content: "This site sucks",
        rating: 4
    },
    {
        email: "gfjjrtj",
        contact: false,
        content: "This site sucks",
        rating: 4
    },
    {
        email: "gfjrwetj",
        contact: false,
        content: "This site sucks",
        rating: 4
    }
];

function getContact(userFeedback, toggleView) {
    let count = 0;
    if (toggleView) {
        const renderedUserFeedback = userFeedback.map((feedback) => {
            if (feedback.contact && !(feedback.email === "")) {
                count++;
                console.log(count);
                return (
                    <Table.Row key={count} className='ss-adminfeedback-row'>
                        <Table.Cell width={14}>
                            <Header as='h2' className='ss-reporttableitem-header'>
                                <Header.Content style={{ margin: '10px' }}>
                                    {feedback.email}
                                    <Header.Subheader>Contact: True <br />Feedback Content: {feedback.content}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button.Group vertical>
                                <Button color='blue' content='Send E-mail' />
                                <Button color='red' content='Delete Feedback' />
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
    else {

        const renderedUserFeedback = userFeedback.map((feedback) => {
            count++;
            console.log(count);
            return (
                <Table.Row key={count} className='ss-adminfeedback-row'>
                    <Table.Cell width={14}>
                        <Header as='h2' className='ss-reporttableitem-header'>
                            <Header.Content style={{ margin: '10px' }}>
                                {feedback.email}
                                <Header.Subheader>Feedback Content: {feedback.content}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button.Group vertical>
                            <Button color='red' content='Delete Feedback' />
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
        })
        return renderedUserFeedback;
    }
}


const AdminFeedback = ({ allFeedback }) => {

    const [userFeedback, setUserFeedback] = useState(TableInfo);
    const [toggleView, setToggleView] = useState(false);

    const renderedUserFeedback = getContact(userFeedback, toggleView);

    return (

        <div className="ss-feedback-divadmin">
            <Button className='ss-feedback-togglebutton' onClick={() => { setToggleView(!toggleView) }}>
                Filter by Contact
            </Button>
            <Table stackable basic='very' celled fixed>
                {renderedUserFeedback}
            </Table>
        </div>
    );
}

export default AdminFeedback;