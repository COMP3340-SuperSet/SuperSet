import React from "react";
import { Card, Image } from 'semantic-ui-react';
import { redirect } from "../utils/redirect";

/* handle page transfer to view set of inputted id using onClick = {} or href within Card tag*/
const SetCard = ({ id, count = 1, name, description, image = null }) => {
    return (
        <Card centered link onClick={() => { redirect("/set", [{ key: "id", value: id }]) }}>
            <Image src={image} />
            <Card.Content textAlign="center">
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
            {false && <Card.Content extra textAlign="center">{count}</Card.Content>}
        </Card>
    );
}

export default SetCard;