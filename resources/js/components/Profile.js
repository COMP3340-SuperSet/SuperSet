import React, { useState, useEffect } from "react";
import SetCard from "./SetCard.js";
import SetCell from "./SetCell.js";
import { Grid, Segment, Header, Image, Icon, Button, Table, TextArea, Form, Input } from "semantic-ui-react";

import "../../css/Profile.css";

import tmp_pic from "../../images/pfp_placeholder.png";
import { update } from "lodash";
import { redirect } from "../utils/redirect.js";

const GRID_MODE = true;
const LIST_MODE = false;

const CreateNewSet = () => {
    //send new set to database and get id
    //redirect("/set", [{key: "id", value: newsetid}]);
}

const SendUpdatedProfileInfoToDatabase = (updatedInfo) => {
    //save profileInfo to database
    console.log("New profile: " + JSON.stringify(updatedInfo));
}

const SetsDisplay = ({displayMode, setInfo}) => {
    if (displayMode === GRID_MODE){
        let allCards = setInfo.map( (obj) => 
            <Grid.Column key = {obj.setid}>
                <SetCard id = {obj.setid} name = {obj.name} count = {4} description = {obj.description} image = {null}/>
            </Grid.Column>);

        return(
            <Grid stackable container columns = {4}>
                {allCards}
            </Grid>
        );
    }
    else{
        let allCells = setInfo.map( (obj) => <SetCell key = {obj.setid} id = {obj.setid} name = {obj.name} count = {4} description = {obj.description}/>);

        return(
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width = {1}  textAlign = "center">Items</Table.HeaderCell>
                        <Table.HeaderCell width = {3}  textAlign = "center">Set Name</Table.HeaderCell>
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

const Profile = ({userInfo, userSets}) => {
    const [editing, setEditing] = useState(false);
    const [displayType, setDisplayType] = useState(GRID_MODE);
    const [pfpRefresh, setPfpRefresh] = useState(false);
    const [editedInfo, setEditedInfo] = useState(userInfo);
    
    if (userInfo === null){
        userInfo = {
            imageid: tmp_pic,
            name: "Username",
            bio: "Description"
        };
    }

    const refreshEditingProfile = () => {
        let pfp_file = document.getElementById("pfp-upload").files;
        let imgObj;
        if (pfp_file && pfp_file[0]) imgObj = URL.createObjectURL(pfp_file[0]);

        setEditedInfo({
            imageid: imgObj,
            name: document.getElementById("username-input").value,
            bio: document.getElementById("description-textarea").value
        });

        setPfpRefresh(!pfpRefresh);
    }

    const saveUpdatedProfile = () => {
        refreshEditingProfile();
        setEditing(false);
        SendUpdatedProfileInfoToDatabase(editedInfo);
        //redirect("/user", [{key: "id", value: userInfo.userid}]);
    }

    const ProfileDisplay = ({editingMode}) => {
        if (!editingMode){
            return (
                <div>
                    <Image size = "small" src = {userInfo.imageid} circular centered/>
                    <Header as = "h1" textAlign = "center" >{userInfo.name}</Header>
                    <Segment>
                        <Header as = "h3" textAlign = "center" >{userInfo.bio}</Header>
                    </Segment>
                    <div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                        <Button icon onClick = {() => {
                            setEditing(true);
                            setEditedInfo(userInfo);
                        }}><Icon name = "pencil"/></Button>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Image size = "small" src = {editedInfo.imageid} circular centered/>
                    
                    <Form>
                        <div style = {{width: "100%", textAlign: "center", marginTop: "30px"}}>
                            <Button className = "pfp-upload-button" id = "pfp-upload-button"><label htmlFor = "pfp-upload" className = "pfp-upload-label">Upload</label></Button>
                            <input id = "pfp-upload" onChange = {refreshEditingProfile} hidden type = "file" accept = ".jpg, .jpeg, .png"/>
                        </div>
                    </Form>
    
                    <Input fluid className = "username-input" id = "username-input" size = "large" defaultValue = {editedInfo.name} />

                    <Segment>
                        <Form><TextArea id = "description-textarea" style = {{resize: "vertical"}} defaultValue = {editedInfo.bio}></TextArea></Form>
                    </Segment>

                    <div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                        <Button className = "profile-save-button" onClick = {saveUpdatedProfile}>Save</Button>
                    </div>
                </div>
            );
        }
        
    }

    return (
        <Grid divided padded stackable columns = {2} >
            <Grid.Column width = {5}>
                <Segment padded = "very">
                    <ProfileDisplay editingMode = {editing} />
                </Segment>
            </Grid.Column>

            <Grid.Column width = {11}>
                <Segment textAlign = "center">
                    <Header as = "h1" className = "inline ss-grey" >My Sets</Header>

                    <Button floated = "left" icon onClick = {CreateNewSet} ><Icon name = "plus"/></Button>
                    
                    <Button onClick = {() => setDisplayType(LIST_MODE)} floated = "right" icon primary = {!displayType}><Icon name = "list"/></Button>
                    <Button onClick = {() => setDisplayType(GRID_MODE)} floated = "right" icon primary = {displayType}><Icon name = "th"/></Button>
                </Segment>

                <Segment padded>
                    <SetsDisplay displayMode = {displayType} setInfo = {userSets}/>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default Profile;