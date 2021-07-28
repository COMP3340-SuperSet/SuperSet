import React, { useEffect, useState } from "react";
import { Grid, Button, Icon, Segment, Header, Input, Table, Image, Container } from 'semantic-ui-react';

import ItemCard from './ItemCard.js';
import ItemModal from "./ItemModal.js";
import Confirmation from "./Confirmation.js";

import { redirect } from "../utils/redirect.js";
import { toast } from './Toast';
import { makeReport } from '../utils/makeReport';
import { getImagePath } from "../utils/imagePath.js";

const GRID_MODE = true;
const LIST_MODE = false;

import set1 from "../../images/temp/set1.jpg";
import item1 from "../../images/temp/item1.jpg";
import item2 from "../../images/temp/item2.jpg";
import item3 from "../../images/temp/item3.jpg";
import item4 from "../../images/temp/item4.jpg";

const tempset = {
    setid: 10,
    userid: 1,
    name: "Wardrobe",
    description: "Different outfits for different seasons"
};

const tempitems = [
    {
        itemid: 34,
        setid: 10,
        name: "Fall, Casual",
        description: "White sweatshirt, grey/blue jeans, sneakers"
    }, {
        itemid: 35,
        setid: 10,
        name: "Spring and Summer, fancy",
        description: "Short sleeved white shirt, short jeans, sandals"
    }, {
        itemid: 36,
        setid: 10,
        name: "Winter, casual",
        description: "Sweater, jeans, boots"
    }, {
        itemid: 37,
        setid: 10,
        name: "Winter, casual",
        description: "Red sweater, undershirt, checkered pants, boots"
    }
];

const tempimgs = [
    {
        itemid: 34,
        imageid: item1
    }, {
        itemid: 35,
        imageid: item2
    }, {
        itemid: 36,
        imageid: item3
    }, {
        itemid: 37,
        imageid: item4
    }
];

const ItemViewDisplay = ({ view, itemInfo, itemImages, showReport = false }) => {

    if (itemInfo === null) return null;
    if (view === GRID_MODE) {
        let AllCards = itemInfo.map((obj) => {
            let imgs = [];
            (itemImages.filter(elem => elem && obj && elem.itemid === obj.itemid)).forEach((imgObj) => { imgs.push(getImagePath('item', imgObj.imageid)); });
            
            return (
                <Grid.Column key={obj.itemid}>
                    <ItemModal item={obj} showReport={showReport} images={imgs} modalTrigger={
                        <Container fluid className="basic-button">
                            <ItemCard name={obj.name} count={5} description={obj.description} image={imgs[0]} />
                        </Container>} />
                </Grid.Column>)
        });

        return (
            <Grid stackable container columns={5}>
                {AllCards}
            </Grid>
        );
    }
    else {
        let AllCells = itemInfo.map((obj) => {
            let imgs = [];
            (itemImages.filter(elem => elem.itemid === obj.itemid)).forEach((imgObj) => { imgs.push(getImagePath('item', imgObj.imageid)); });

            return (
                <Table.Row className="hoverable" key={obj.itemid}>
                    <ItemModal item={obj} images={imgs} modalTrigger={<Table.Cell style={{ paddingLeft: "18px" }}>{obj.name}</Table.Cell>} />
                    <ItemModal item={obj} images={imgs} modalTrigger={<Table.Cell style={{ paddingLeft: "18px" }}>{obj.description ? obj.description : <p className="ss-text-light">No description</p>}</Table.Cell>} />
                </Table.Row>)
        });

        return (
            <Table celled selectable fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center">Item Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Description</Table.HeaderCell>
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
    if (images) allSetImages = images.map((obj, index) => {
        let img = null;
        if (obj && obj.imageid) img = getImagePath('set', obj.imageid);
        return (<Image key={index} src={img} />);
    });

    return (
        <Segment className="ss-segment-primary">
            {!allSetImages || !images.length ? <p className="ss-text-light">No set images</p> :
                <Image.Group size="medium">
                    {allSetImages}
                </Image.Group>}
        </Segment>
    );
}

const SetView = ({ set, items, setImages = [], itemImages = [], currentUser }) => {
    
    const [viewType, setViewType] = useState(GRID_MODE);

    if (!set) { set = { name: "Set name", description: "Description" }; }

    const editSet = () => { if (set) redirect('/edit', [{ key: 'setid', value: set.setid }]); }

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

    /*
    made landing_gif3 using these, remove on deployment

    set = tempset;
    items = tempitems;
    itemImages = tempimgs;
    setImages = [set1];
    */
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
                    <Header as="h1" className="ss-text-primary">{set.name ? set.name : <p className="ss-text-light">Nameless set</p>}</Header>

                    <Button style={{ position: "absolute", top: "0px", left: "0px" }} icon labelPosition="left" onClick={() => redirect('/user', [{ key: "id", value: set.userid }])}>
                        <Icon name="left arrow" /> Back to profile
                    </Button>

                    {!(currentUser && set && currentUser.userid === set.userid) &&
                        <Confirmation style={{ position: "absolute", top: "0px", right: "0px" }}
                            trigger={<Button icon color="red"><Icon name="flag" /> Report</Button>}
                            onConfirm={() => { makeReport('set', set.setid) }}
                            text="Are you sure you would like to report this set?" />}

                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Header className="ss-text-secondary">{set.description ? set.description : <span className="ss-text-light">No description</span>}</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Container fluid textAlign="center">
                    <SetImagesDisplay images={setImages} />
                </Container>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column>
                    <Button onClick={() => setViewType(GRID_MODE)} icon primary={viewType}><Icon name="th" /></Button>
                    <Button onClick={() => setViewType(LIST_MODE)} icon primary={!viewType}><Icon name="list" /></Button>
                    {false && <Input placeholder="Search Items" />}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Segment textAlign="center" className="ss-segment-primary">
                    <ItemViewDisplay view={viewType} itemInfo={items} itemImages={itemImages} showReport={!(currentUser && set && currentUser.userid === set.userid)} />
                </Segment>
            </Grid.Row>
        </Grid>
    );
}

export default SetView;