import React, { useState, useEffect } from "react";
import SetCard from "./SetCard.js";
import SetCell from "./SetCell.js";
import { Grid, Segment, Header, Image, Icon, Button, Table, TextArea, Form, Input } from "semantic-ui-react";

import "../../css/Profile.css";

import tmp_pic from "../../images/pfp_placeholder.png";
import { update } from "lodash";
import { redirect } from "../utils/redirect.js";
import axios from "axios";
import { uploadFile } from "../services/fileUpload.js";

const GRID_MODE = true;
const LIST_MODE = false;

const CreateNewSet = () => {
    //send new set to database and get id
    //redirect("/set", [{key: "id", value: newsetid}]);
}

const SendUpdatedProfileInfoToDatabase = () => {
    //save profileInfo to database
    //console.log("New profile: " + JSON.stringify());
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

const Profile = ({userInfo, userSets, currentUser}) => {
    const [editing, setEditing] = useState(false);
    const [displayType, setDisplayType] = useState(GRID_MODE);

    const [image, setImage] = useState(null);

    const [imageid, setImageid] = useState((userInfo && userInfo.imageid) ? userInfo.imageid : tmp_pic);
    const [name, setName] = useState((userInfo && userInfo.name) ? userInfo.name : "");
    const [bio, setBio] = useState((userInfo && userInfo.bio) ? userInfo.bio : "");

    useEffect(() => {
        if (!userInfo) return;
        setName(userInfo.name);
        setImageid(userInfo.imageid);
        setBio(userInfo.bio);
    }, [userInfo]);

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
        const updatedName = document.getElementById("username-input").value;
        const updatedBio = document.getElementById("description-textarea").value;
        await axios.put(`/api/user/${currentUser.userid}`, {
            name: updatedName, 
            bio: updatedBio
        });

        //create form data for image change in database
        var formData = new FormData();
        formData.append("image", image);  
        await uploadFile(`/api/user/image`, formData);
        
        setEditing(false);

        redirect(window.location.href);
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
                    <div style = {{width: "100%", textAlign: "center", marginTop: "60px"}}>
                        <Button icon onClick = {() => {
                            setEditing(true);
                            setName(userInfo.name);
                            setImageid(userInfo.imageid);
                            setBio(userInfo.bio);
                        }}><Icon name = "pencil"/></Button>
                    </div>
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
                        <Button className = "profile-save-button" onClick = {onSubmit}>Save</Button>
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