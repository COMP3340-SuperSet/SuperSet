import React, { useState } from "react";
import { Grid, Button, Icon, Segment, Header, Dropdown, Input, Table, Image, Container } from 'semantic-ui-react';
import ItemCard from './ItemCard.js';
import ItemModal from "./ItemModal.js";
import { toast } from './Toast';

import "../../css/SetView.css";

import placeholderImage from "../../images/superset.png";
import { redirect } from "../utils/redirect.js";

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

const ItemViewDisplay = ({ view, itemInfo }) => {
    if (itemInfo === null) return null;
    if (view === GRID_MODE) {
        let AllCards = itemInfo.map((obj) =>
            <Grid.Column key={obj.itemid}>
                <ItemModal item={obj} modalTrigger={
                    <Button fluid className="basic-button">
                        <ItemCard name={obj.name} count={5} description={obj.description} image={null} />
                    </Button>} />
            </Grid.Column>);

        return (
            <Grid stackable container columns={5}>
                {AllCards}
            </Grid>
        );
    }
    else {
        let AllCells = itemInfo.map((obj) =>
            <Table.Row key={obj.itemid}>
                <Table.Cell style={{ padding: "0" }}>
                    <ItemModal item={obj} modalTrigger={
                        <Button fluid className="basic-button padded-cell-button">{obj.name}</Button>} />
                </Table.Cell>
                <Table.Cell style={{ padding: "0" }}>
                    <ItemModal item={obj} modalTrigger={
                        <Button fluid className="basic-button padded-cell-button">{obj.description}</Button>} />
                </Table.Cell>
            </Table.Row>);

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3} textAlign="center">Item Name</Table.HeaderCell>
                        <Table.HeaderCell width={12} textAlign="center">Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {AllCells}
                </Table.Body>
            </Table>
        );
    }
}

const SetImagesDisplay = ({ images }) => {
    let allSetImages = null;
    if (images) allSetImages = images.map((obj, index) => <Image key={index} src={obj} />);

    return (
        <Segment>
            {!allSetImages ? <p>No set images</p> :
                <Image.Group size="tiny">
                    {allSetImages}
                </Image.Group>}
        </Segment>
    );
}

const SetView = ({ set, items, currentUser }) => {
    const [viewType, setViewType] = useState(GRID_MODE);

    if (!set) { set = { name: "Set name", description: "Description" }; }

    const editSet = () => {

    }

    const copyLinkToSet = () => {
        let temp = document.createElement('input');
        let linkToSet = window.location.href;

        document.body.appendChild(temp);
        temp.value = linkToSet;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);

        toast("Copied set link to clipboard!", "success");
    }

    return (
        <Grid centered stackable container columns={1}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    {currentUser && set && currentUser.userid === set.userid &&
                        <Button onClick={() => editSet()} style={{ padding: "11px" }}><Icon name="pencil" style={{ margin: "0px" }} /></Button>}

                    {currentUser && set && currentUser.userid === set.userid &&
                        <Button onClick={() => copyLinkToSet()} style={{ padding: "11px" }}><Icon name="linkify" style={{ margin: "0px" }} /></Button>}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header as="h1">{set.name ? set.name : <span style={{ color: "grey" }}>Nameless set</span>}</Header>
                    <Button style={{ position: "absolute", top: "0px", left: "0px" }} icon labelPosition="left" onClick={() => redirect('/user', [{ key: "id", value: set.userid }])}>
                        <Icon name="left arrow" /> Back to profile
                    </Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Header>{set.description ? set.description : <span style={{ color: "grey" }}>No description</span>}</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Container fluid textAlign="center">
                    <SetImagesDisplay images={null} />
                </Container>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column>
                    <Button onClick={() => setViewType(GRID_MODE)} icon primary={viewType}><Icon name="th" /></Button>
                    <Button onClick={() => setViewType(LIST_MODE)} icon primary={!viewType}><Icon name="list" /></Button>
                    <Input placeholder="Search Items" />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Container fluid textAlign="center">
                    <ItemViewDisplay view={viewType} itemInfo={items} />
                </Container>
            </Grid.Row>
        </Grid>
    );
}

export default SetView;