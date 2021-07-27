import React, { useState } from "react";
import { Grid, Button, Icon, Segment, Header, Input, Table, Image, Container } from 'semantic-ui-react';

import ItemCard from './ItemCard.js';
import ItemModal from "./ItemModal.js";

import { redirect } from "../utils/redirect.js";
import { toast } from './Toast';

const GRID_MODE = true;
const LIST_MODE = false;

const ItemViewDisplay = ({ view, itemInfo }) => {
    if (itemInfo === null) return null;
    if (view === GRID_MODE) {
        let AllCards = itemInfo.map((obj) =>
            <Grid.Column key={obj.itemid}>
                <ItemModal item={obj} modalTrigger={
                    <Container fluid className="basic-button">
                        <ItemCard name={obj.name} count={5} description={obj.description} image={null} />
                    </Container>} />
            </Grid.Column>);

        return (
            <Grid stackable container columns={5}>
                {AllCards}
            </Grid>
        );
    }
    else {
        let AllCells = itemInfo.map((obj) =>
            <Table.Row className = "hoverable" key={obj.itemid}>
                <ItemModal item={obj} modalTrigger={ <Table.Cell textAlign="center">{obj.name}</Table.Cell>} />
                <ItemModal item={obj} modalTrigger={ <Table.Cell textAlign="center">{obj.description}</Table.Cell>} />
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
        <Segment className = "ss-segment-primary">
            {!allSetImages ? <p className = "ss-text-light">No set images</p> :
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
        if (set) redirect('/edit', [{key: 'setid', value: set.setid}]);
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
                    <Header as="h1" className = "ss-text-primary">{set.name ? set.name : <p className = "ss-text-light">Nameless set</p>}</Header>
                    
                    <Button style={{ position: "absolute", top: "0px", left: "0px" }} icon labelPosition="left" onClick={() => redirect('/user', [{ key: "id", value: set.userid }])}>
                        <Icon name="left arrow" /> Back to profile
                    </Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Header className = "ss-text-secondary">{set.description ? set.description : <span className = "ss-text-light">No description</span>}</Header>
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
                <Segment textAlign="center" className = "ss-segment-primary">
                    <ItemViewDisplay view={viewType} itemInfo={items} />
                </Segment>
            </Grid.Row>
        </Grid>
    );
}

export default SetView;