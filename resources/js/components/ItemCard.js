import React from "react";
import { Card, Image } from 'semantic-ui-react';

const ItemCard = ({ name, description, image = null }) => {
    return (
        <Card centered link className = "ss-card" role = "a">
            <Image src={image} style = {{maxHeight: "200px"}} />
            <Card.Content textAlign="center">
                <Card.Header className = "ss-text-primary">{name}</Card.Header>
                { description ?
                    <Card.Description className = "ss-text-secondary">{description}</Card.Description> :
                    <p className = "ss-text-light">No description</p>}
            </Card.Content>
        </Card>
    );
}

export default ItemCard;