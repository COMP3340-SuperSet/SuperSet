import React, { useState, useEffect } from "react";
import SetCard from "./SetCard.js";
import SetCell from "./SetCell.js";
import { Grid, Segment, Header, Image, Icon, Button, Table, TextArea, Form } from "semantic-ui-react";

import "../../css/Profile.css";

import tmp_pic from "../../images/pfp_placeholder.png";
import { update } from "lodash";

const GRID_MODE = true;
const LIST_MODE = false;

var profileInfo = {
    pfp: tmp_pic,
    username: "Username",
    description: "Description"
};

var editedProfileInfo = profileInfo;


const ProfileDisplay = ({editingMode, name, bio, imageid}) => {
    if (!editingMode){
        return (
            <div>
                <Image size = "small" src = {imageid} circular centered/>
                <Header as = "h1" textAlign = "center" >{profileInfo.username}</Header>
                <Segment>
                    <Header as = "h3" textAlign = "center" >{profileInfo.description}</Header>
                </Segment>
            </div>
        );
    }
    return null;
}

const ProfileEdit = ({editingMode}) => {

    const [uploadButtonChange, setUploadButtonChange] = useState(false);

    const updateDescription = () => { editedProfileInfo.description = document.getElementById('description-textarea').value; }
    const updatePfp = () => { 
        let pfp_file = document.getElementById('pfp-upload').files; 
        if (pfp_file && pfp_file[0]) editedProfileInfo.pfp = URL.createObjectURL(pfp_file[0]);
        setUploadButtonChange(!uploadButtonChange); 
    }   

    if (editingMode){
        return(
            <div>
                <Image size = "small" src = {editedProfileInfo.pfp} circular centered/>
                
                <Form>
                    <div style = {{width: "100%", textAlign: "center", marginTop: "30px"}}>
                        <Button className = "pfp-upload-button" id = "pfp-upload-button"><label htmlFor = "pfp-upload" className = "pfp-upload-label">Upload</label></Button>
                        <input id = "pfp-upload" onChange = {updatePfp} hidden type = "file" accept = ".jpg, .jpeg, .png"/>
                    </div>
                </Form>

                <Header as = "h1" textAlign = "center" >{profileInfo.username}</Header>
                
                <Segment>
                    <Form><TextArea id = "description-textarea" onChange = {updateDescription}>{editedProfileInfo.description}</TextArea></Form>
                </Segment>
            </div>
        );
    }
    return null;
}

const SendUpdatedProfileInfoToDatabase = () => {
    //save profileInfo to database
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

    if (userInfo !== null){
        profileInfo.username = userInfo.name;
        profileInfo.description = userInfo.bio;
        profileInfo.pfp = userInfo.imageid;
    }

    const [editing, setEditing] = useState(false);
    const [displayType, setDisplayType] = useState(GRID_MODE);

    const saveUpdatedProfile = () => {
        profileInfo = editedProfileInfo;
        setEditing(false);

        SendUpdatedProfileInfoToDatabase();
    }

    let editButton = !editing ? (<div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                                    <Button icon onClick = {() => setEditing(true)}><Icon name = "pencil"/></Button>
                                </div>) : null;
    let saveButton = editing ? (<div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                                    <Button className = "profile-save-button" onClick = {saveUpdatedProfile}>Save</Button>
                                </div>) : null;

    return (
        <Grid divided padded stackable columns = {2} >

            <Grid.Column width = {5}>
                <Segment padded = "very">
                    <ProfileDisplay editingMode = {editing} />
                    <ProfileEdit editingMode = {editing}/>
                    {editButton}
                    {saveButton}
                </Segment>
            </Grid.Column>

            <Grid.Column width = {11}>
                <Segment textAlign = "center">
                    <Header as = "h1" className = "inline ss-grey" >My Sets</Header>

                    <Button floated = "left" icon ><Icon name = "plus"/></Button>
                    
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