import React from "react";
import { Card, Image } from 'semantic-ui-react';
import { redirect } from "../utils/redirect";

/* handle page transfer to view set of inputted id using onClick = {} or href within Card tag*/
const SetCard = ({ id, count = 1, name, description, image = null }) => {
    return (
        <Card centered link onClick={() => { redirect("/set", [{ key: "id", value: id }]) }} className = "ss-card">
            <Image src={image} />
            <Card.Content textAlign="center">
                <Card.Header className = "ss-text-primary" >{name}</Card.Header>
                { description ?
                    <Card.Description className = "ss-text-secondary">{description}</Card.Description> :
                    <p className = "ss-text-light">No description</p>}
            </Card.Content>
            {false && <Card.Content extra textAlign="center">{count}</Card.Content>}
        </Card>
    );
}

export default SetCard;