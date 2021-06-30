import React from "react";
import { Card, Image, Button } from 'semantic-ui-react';

/* handle page transfer to view set of inputted id using onClick = {} or href within Card tag*/
const SetCard = ({id, count = 1, name, description, image}) => {
    return (
        <Card centered href = "#">
            <Image src = {image} />
            <Card.Content textAlign = "center">
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign = "center">{count}</Card.Content>
        </Card>
    );
}

export default SetCard;