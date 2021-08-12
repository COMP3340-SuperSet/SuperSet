import React from "react";
import { Card } from 'semantic-ui-react';

const StatusCard = ({ name, description, operational }) => {

    return (
        <Card centered link style = {{width: "200px"}} className = "ss-card" role = "a">
            {operational ?
                <div style = {{backgroundColor: 'green', height: "50px", width: "200px", objectFit: "cover"}}> </div> :
                <div style = {{backgroundColor: 'red', height: "50px", width: "200px", objectFit: "cover"}}> </div>}
            <Card.Content textAlign="center">
                <Card.Header className = "ss-text-primary">{name}</Card.Header>
                { description ?
                    <Card.Description className = "ss-text-secondary">{description}</Card.Description> :
                    <p className = "ss-text-light">Checking Status...</p>}
            </Card.Content>
        </Card>
    );
}

export default StatusCard;