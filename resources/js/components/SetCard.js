import React from "react";
import { Card, Image } from 'semantic-ui-react';

const SetCard = ({count = 1, name, description}) => {
    return (
        <Card centered href = "#">
            <Image src = '' />
            <Card.Content textAlign = "center">
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign = "center">{count}</Card.Content>
        </Card>
    );
}

export default SetCard;