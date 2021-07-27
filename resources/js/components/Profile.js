import React, { useState } from "react";
import { Grid, Segment, Header, Image, Icon, Button, Table, Form, Modal } from "semantic-ui-react";
import axios from "axios";

import SetCard from "./SetCard.js";
import SetCell from "./SetCell.js";

import { redirect } from "../utils/redirect.js";
import { getImagePath } from "../utils/imagePath.js";
import { toast } from "./Toast.js";

import tmp_pic from "../../images/pfp_placeholder.png";
import Confirmation from "./Confirmation.js";
import { makeReport } from "../utils/makeReport.js";

const GRID_MODE = true;
const LIST_MODE = false;

const CreateNewSet = (userid, name) => {
    axios.post('/api/set', { userid, name }).then(response => {
        console.log(response.data);
        redirect('/edit', [{ key: 'setid', value: '1' }]);
    }).catch(error => {
        console.error(error);
    });
}

const SetsDisplay = ({ displayMode, setInfo }) => {
    if (displayMode === GRID_MODE) {
        let allCards = setInfo.map((obj) =>
            <Grid.Column key={obj.setid}>
                <SetCard id={obj.setid} name={obj.name} count={null} description={obj.description} />
            </Grid.Column>);

        return (
            <Grid stackable container columns={4}>
                {allCards}
            </Grid>
        );
    }
    else {
        let allCells = setInfo.map((obj) => <SetCell key={obj.setid} id={obj.setid} name={obj.name} count={null} description={obj.description} />);

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        {false && <Table.HeaderCell width={1} textAlign="center">Items</Table.HeaderCell>}
                        <Table.HeaderCell width={4} textAlign="center">Set Name</Table.HeaderCell>
                        <Table.HeaderCell width={12} textAlign="center">Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {allCells}
                </Table.Body>
            </Table>
        );
    }
}

const Profile = ({ userInfo, userSets, currentUser }) => {
    const [newSetName, setNewSetName] = useState("");
    const [displayType, setDisplayType] = useState(GRID_MODE);
    const [modalOpen, setModalOpen] = useState(false);

    const copyLinkToProfile = () => {
        let temp = document.createElement('input');
        let linkToProfile = window.location.href;

        document.body.appendChild(temp);
        temp.value = linkToProfile;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);

        toast("Copied profile link to clipboard!", "success");
    }

    return (
        <Grid divided padded stackable columns={2} >
            <Grid.Column width={5}>
                <Segment padded="very" className="ss-segment-primary">
                    {userInfo && !(currentUser && currentUser.userid === userInfo.userid) &&
                        <Confirmation style={{ textAlign: "center", marginBottom: "18px" }}
                            trigger={<Button icon color="red"><Icon name="flag" /> Report</Button>}
                            onConfirm={() => { makeReport('user', userInfo.userid) }}
                            text="Are you sure you would like to report this user?" />}

                    {userInfo && <div>
                        <Image size="small" src={(userInfo.imageid) ? getImagePath('user', userInfo.imageid) : tmp_pic} circular centered />
                        <Header as="h1" textAlign="center" className="ss-text-primary">{userInfo.username}</Header>
                        <Segment textAlign="center" className="ss-segment-secondary">
                            {userInfo.bio ? <Header as="h3" className="ss-text-secondary">{userInfo.bio}</Header> :
                                <p className="ss-text-light">No description</p>}
                        </Segment>
                        {currentUser && userInfo && currentUser.userid === userInfo.userid &&
                            <div style={{ width: "100%", textAlign: "center", marginTop: "60px" }}>
                                <Button icon onClick={() => copyLinkToProfile()}><Icon name="linkify" /></Button>
                                <Button icon onClick={() => redirect("/user/settings")}><Icon name="setting" /></Button>
                            </div>} </div>}


                </Segment>
            </Grid.Column>

            <Grid.Column width={11}>
                <Segment textAlign="center" className="ss-segment-primary">
                    {userInfo &&
                        <Header as="h1" className="inline ss-text-primary">{(currentUser && userInfo && currentUser.userid === userInfo.userid) ? "My" : userInfo.username + "'s"} Sets</Header>}

                    {currentUser && userInfo && currentUser.userid === userInfo.userid &&
                        <Modal dimmer="inverted"
                            size="mini"
                            centered={false}
                            onClose={() => setModalOpen(false)}
                            onOpen={() => setModalOpen(true)}
                            open={modalOpen}
                            trigger={<Button floated="left" icon ><Icon name="plus" /></Button>}>

                            <Modal.Header>Enter your set's name</Modal.Header>
                            <Modal.Content>
                                <Form><Form.Field required>
                                    <Form.Input fluid
                                        value={newSetName}
                                        onChange={(e) => setNewSetName(e.target.value)} />
                                </Form.Field></Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => { CreateNewSet(userInfo.userid, newSetName); setModalOpen(false); }} positive>Create</Button>
                                <Button onClick={() => setModalOpen(false)} negative >Cancel</Button>
                            </Modal.Actions>
                        </Modal>}

                    <Button onClick={() => setDisplayType(LIST_MODE)} floated="right" icon primary={!displayType}><Icon name="list" /></Button>
                    <Button onClick={() => setDisplayType(GRID_MODE)} floated="right" icon primary={displayType}><Icon name="th" /></Button>
                </Segment>

                <Segment padded className="ss-segment-primary">
                    <SetsDisplay displayMode={displayType} setInfo={userSets} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default Profile;