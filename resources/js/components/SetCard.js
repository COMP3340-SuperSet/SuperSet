import React from "react";
import { Card, Image } from 'semantic-ui-react';

const SetCard = (props) => {
    return (
        <Card centered>
            <Image src = '' />
            <Card.Content textAlign = "center">
                <Card.Header>{props.name}</Card.Header>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign = "center">{props.count}</Card.Content>
        </Card>
    );
}

export default SetCard;