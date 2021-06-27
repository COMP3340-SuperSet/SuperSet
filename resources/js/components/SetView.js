import React, {useState} from "react";
import { Grid, Button, Icon, Segment, Header, Dropdown, Input, Table, Image, Container } from 'semantic-ui-react';
import SetCard from './SetCard.js';
import SetCell from './SetCell.js';

const GRID_MODE = true;
const LIST_MODE = false;

const SetViewDisplay = (props) => {
    if (props.view === GRID_MODE){
        return (
            <Grid stackable container columns = {5}>
                <Grid.Column><SetCard name = "Item 1"  description = "This is an item"/></Grid.Column>
                <Grid.Column><SetCard name = "Item 2" count = "5" description = "This is an item again"/></Grid.Column>
                <Grid.Column><SetCard name = "Item 3" count = "4" description = "Test description"/></Grid.Column>
                <Grid.Column><SetCard name = "Item 4" count = "8" description = "Lorem Ipsum"/></Grid.Column>
                <Grid.Column><SetCard name = "Item 5" description = "Another item"/></Grid.Column>
                <Grid.Column><SetCard name = "Item 5" description = "Another other item"/></Grid.Column>
            </Grid>
        );
    }
    else{
        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width = {1}  textAlign = "center">Qty</Table.HeaderCell>
                        <Table.HeaderCell width = {3}  textAlign = "center">Item Name</Table.HeaderCell>
                        <Table.HeaderCell width = {12}  textAlign = "center">Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <SetCell name = "Item 1" description = "This is an item"/>
                    <SetCell name = "Item 2" count = "5" description = "This is an item again"/>
                    <SetCell name = "Item 3" count = "4" description = "Test description"/>
                    <SetCell name = "Item 4" count = "8" description = "Lorem Ipsum"/>
                    <SetCell name = "Item 5" description = "Another item"/>
                    <SetCell name = "Item 1" count = "2" description = "This is an item"/>
                    <SetCell name = "Item 2" count = "5" description = "This is an item again"/>
                    <SetCell name = "Item 3" count = "4" description = "Test description"/>
                    <SetCell name = "Item 4" count = "8" description = "Lorem Ipsum"/>
                    <SetCell name = "Item 5" description = "Another item"/>
                </Table.Body>
            </Table>
        );
    }
}

const SetImagesDisplay = () => {
    return (
        <Segment>
            <Image.Group size = "small">
                <Image src = "https://react.semantic-ui.com/images/wireframe/image.png" />
                <Image src = "https://react.semantic-ui.com/images/wireframe/image.png" />
                <Image src = "https://react.semantic-ui.com/images/wireframe/image.png" />
                <Image src = "https://react.semantic-ui.com/images/wireframe/image.png" />
                <Image src = "https://react.semantic-ui.com/images/wireframe/image.png" />    
            </Image.Group>
            <Button fluid icon><Icon name = "plus"/></Button>
        </Segment>
    );
}

const SetView = () => {
    const [viewType, setViewType] = useState(GRID_MODE);

    return (
        <Grid centered stackable container columns = {1}>
            <Grid.Row>
                <Grid.Column textAlign = "center">
                    <Button icon ><Icon name = "pencil"/></Button>
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