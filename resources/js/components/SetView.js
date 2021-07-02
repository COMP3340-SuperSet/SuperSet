import React, {useState} from "react";
import { Grid, Button, Icon, Segment, Header, Dropdown, Input, Table, Image, Container } from 'semantic-ui-react';
import ItemCard from './ItemCard.js';
import ItemModal from "./ItemModal.js";

import "../../css/SetView.css";

import placeholderImage from "../../images/superset.png";

const GRID_MODE = true;
const LIST_MODE = false;

//unsure how this structure will look like later, but we can change the code that parses this accordingly
var set = {
    id: 1,
    name: "set name",
    description: "description",
    images: [placeholderImage, placeholderImage],
    itemList: [{
        itemId: 2634,
        itemName: "item name 1",
        itemDescription: "item description 1",
        itemImages: [null]
    }, {
        itemId: 2346,
        itemName: "item name 2",
        itemDescription: "item description 2",
        itemImages: [null]
    }, {
        itemId: 2214,
        itemName: "item name 3",
        itemDescription: "item description 3",
        itemImages: [null]
    }]
};

const SetViewDisplay = (props) => {
    if (props.view === GRID_MODE){
        let allCards = set.itemList.map( (obj) =>  
            <Grid.Column key = {obj.itemId}>
                <ItemModal itemName = {obj.itemName} itemDescription = {obj.itemDescription} itemImages = {obj.itemImages} modalTrigger = {
                    <Button fluid className = "basic-button">
                        <ItemCard name = {obj.itemName} count = {obj.itemQuantity} description = {obj.itemDescription} image = {obj.itemImages[0]}/>
                    </Button>} />
            </Grid.Column> );

        return (
            <Grid stackable container columns = {5}>
                {allCards}
            </Grid>
        );
    }
    else{

        let allCells = set.itemList.map( (obj) =>  
            <Table.Row key = {obj.itemId}>
                <Table.Cell style = {{padding: "0"}}>
                    <ItemModal itemName = {obj.itemName} itemDescription = {obj.itemDescription} itemImages = {obj.itemImages} modalTrigger = {
                        <Button fluid className = "basic-button padded-cell-button">{obj.itemName}</Button>} />
                </Table.Cell>
                <Table.Cell style = {{padding: "0"}}>
                    <ItemModal itemName = {obj.itemName} itemDescription = {obj.itemDescription} itemImages = {obj.itemImages} modalTrigger = {
                        <Button fluid className = "basic-button padded-cell-button">{obj.itemDescription}</Button>} />
                </Table.Cell>   
            </Table.Row> );

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width = {3}  textAlign = "center">Item Name</Table.HeaderCell>
                        <Table.HeaderCell width = {12}  textAlign = "center">Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {allCells}
                </Table.Body>
            </Table>
        );
    }
}

const SetImagesDisplay = () => {
    let allSetImages = set.images.map( (obj, index) =>  <Image key = {index} src = {obj} />);

    return (
        <Segment>
            <Image.Group size = "small">
                {allSetImages} 
            </Image.Group>
        </Segment>
    );
}

const SetView = () => {
    const [viewType, setViewType] = useState(GRID_MODE);

    return (
        <Grid centered stackable container columns = {1}>
            <Grid.Row>
                <Grid.Column textAlign = "center">
                    <Button style = {{padding: "11px"}}><Icon name = "pencil" style = {{margin: "0px"}}/></Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign = "center" verticalAlign = "middle">
                    <Header as = "h1">Set name</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign = "center">
                    <Header>Description</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Container fluid textAlign = "center">
                    <SetImagesDisplay />
                </Container>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column>
                    <Dropdown text = "Sort" button>
                        <Dropdown.Menu>
                            <Dropdown.Item text = "A-Z" icon = "angle up" />
                            <Dropdown.Item text = "A-Z" icon = "angle down" />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button onClick = {() => setViewType(GRID_MODE)} icon primary = {viewType}><Icon name = "th"/></Button>
                    <Button onClick = {() => setViewType(LIST_MODE)} icon primary = {!viewType}><Icon name = "list"/></Button>
                    <Input floated = "right" placeholder = "Search Items" />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Container fluid textAlign = "center">
                    <SetViewDisplay view = {viewType} />
                </Container>
            </Grid.Row>
        </Grid>
    );
}

export default SetView;