import React, { useState, useEffect } from "react";
import SetCard from "./SetCard.js";
import SetCell from "./SetCell.js";
import { Grid, Segment, Header, Image, Icon, Button, Table, TextArea, Form, Input, Modal } from "semantic-ui-react";

import "../../css/Profile.css";

import tmp_pic from "../../images/pfp_placeholder.png";
import { update } from "lodash";
import { redirect } from "../utils/redirect.js";
import axios from "axios";
import { uploadFile } from "../services/fileUpload.js";
import { toast } from "./Toast.js";

const GRID_MODE = true;
const LIST_MODE = false;

const CreateNewSet = (name) => {
    //console.log("New set name: " + name);


    //send new set to database and get id
    //redirect("/set", [{key: "id", value: newsetid}]);
}

const SetsDisplay = ({displayMode, setInfo}) => {
    console.log("Sets:", JSON.stringify(setInfo));
    if (displayMode === GRID_MODE){
        let allCards = setInfo.map( (obj) => 
            <Grid.Column key = {obj.setid}>
                <SetCard id = {obj.setid} name = {obj.name} count = {4} description = {obj.description}/>
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

const Profile = ({userInfo, userSets, currentUser}) => {
    const [editing, setEditing] = useState(false);
    const [displayType, setDisplayType] = useState(GRID_MODE);

    const [modalOpen, setModalOpen] = useState(false);
    const [newSetName, setNewSetName] = useState("");

    const [image, setImage] = useState(null);

    const [imageid, setImageid] = useState((userInfo && userInfo.imageid) ? userInfo.imageid : tmp_pic);
    const [name, setName] = useState((userInfo && userInfo.username) ? userInfo.username : "");
    const [bio, setBio] = useState((userInfo && userInfo.bio) ? userInfo.bio : "");

    useEffect(() => {
        if (!userInfo) return;
        setName(userInfo.username);
        setImageid(userInfo.imageid);
        setBio(userInfo.bio);
    }, [userInfo]);

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

    const onImageInput = (e) => {
        //change image locally
        setImage(e.target.files[0]);
        console.log("Image input event: ", e.target.files[0]);
        let pfp_file = document.getElementById("pfp-upload").files;
        let imgObj;
        if (pfp_file && pfp_file[0]) imgObj = URL.createObjectURL(pfp_file[0]);

        setImageid(imgObj);
    }

    const onSubmit = async () => {
        let updatedName = document.getElementById("username-input").value;
        updatedName = updatedName === "" ? userInfo.username : updatedName;
        let updatedBio = document.getElementById("description-textarea").value;
        await axios.put(`/api/user/${currentUser.userid}`, {
            name: updatedName, 
            bio: updatedBio
        });

        //create form data for image change in database
        if (image){
            var formData = new FormData();
            formData.append("image", image);  
            uploadFile(`/api/user/${currentUser.userid}/image`, formData);
        }

        setEditing(false);

        redirect(window.location.href);
    }

    const onCancel = () => {
        setImageid(userInfo.imageid);
        setEditing(false);
    }

    const onCreateNewSet = () => {

    }

    const ProfileDisplay = ({editingMode}) => {
        if (!editingMode){
            return (
                <div>
                    <Image size = "small" src = {imageid} circular centered/>
                    <Header as = "h1" textAlign = "center" >{name}</Header>
                    <Segment>
                        <Header as = "h3" textAlign = "center" >{bio}</Header>
                    </Segment>
                    { currentUser && userInfo && currentUser.userid === userInfo.userid &&
                    <div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                        <Button icon onClick = {() => {
                            setEditing(true);
                            setName(userInfo.username);
                            setImageid(userInfo.imageid);
                            setBio(userInfo.bio);
                        }}><Icon name = "pencil"/></Button>
                        <Button icon onClick = {() => copyLinkToProfile()}><Icon name = "linkify"/></Button>
                    </div> }
                </div>
            );
        }
        else{
            return(
                <div>
                    <Image size = "small" src = {imageid} circular centered/>
                    
                    <Form role = "form" encType = "multipart/form-data">
                        <div style = {{width: "100%", textAlign: "center", marginTop: "30px"}}>
                            <Button className = "pfp-upload-button" id = "pfp-upload-button"><label htmlFor = "pfp-upload" className = "pfp-upload-label">Upload</label></Button>
                            <input id = "pfp-upload" onChange = {onImageInput} hidden type = "file" accept = ".jpg, .jpeg, .png"/>
                        </div>
    
                        <Input fluid className = "username-input" id = "username-input" size = "large" defaultValue = {name} />

                        <Segment>
                            <TextArea id = "description-textarea" style = {{resize: "vertical"}} defaultValue = {bio}></TextArea>
                        </Segment>

                        <div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                            <Button className = "profile-save-button" color = "green" onClick = {onSubmit}>Save</Button>
                            <Button color = "red" onClick = {onCancel}>Cancel</Button>
                        </div>
                    </Form>
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
                    <Header as = "h1" className = "inline ss-grey" >{(currentUser && userInfo && currentUser.userid === userInfo.userid) ? "My" : name + "'s"} Sets</Header>

                    {currentUser && userInfo && currentUser.userid === userInfo.userid && 
                    <Modal  dimmer = "inverted"
                            size = "mini"
                            centered = {false}
                            onClose = {() => setModalOpen(false)}
                            onOpen = {() => setModalOpen(true)}
                            open = {modalOpen}
                            trigger = {<Button floated = "left" icon onClick = {() => onCreateNewSet()} ><Icon name = "plus"/></Button>}>

                                <Modal.Header>Enter your set's name</Modal.Header>
                                <Modal.Content>
                                    <Form><Form.Field required>
                                        <Form.Input fluid
                                                    value = {newSetName}
                                                    onChange = {(e) => setNewSetName(e.target.value)} />
                                    </Form.Field></Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick = {() => { CreateNewSet(newSetName); setModalOpen(false); }} positive>Create</Button>
                                    <Button onClick = {() => setModalOpen(false)} negative >Cancel</Button>
                                </Modal.Actions>
                    </Modal>}
                    
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