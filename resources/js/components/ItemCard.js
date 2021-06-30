import React from "react";
import { Card, Image } from 'semantic-ui-react';

const ItemCard = ({name, description, images = [null]}) => {
    return (
        <Card centered href = "#">
            <Image src = {images[0]} />
            <Card.Content textAlign = "center">
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
        </Card>
    );
}

export default ItemCard;