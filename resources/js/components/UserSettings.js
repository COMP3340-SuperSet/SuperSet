import React, { useState, useEffect } from "react";
import { Segment, Divider, Container, Header, Grid, Form, Image, Button, Checkbox } from 'semantic-ui-react';
import { redirect } from "../utils/redirect";

import Confirmation from "./Confirmation";

import tmp_pic from "../../images/pfp_placeholder.png";

const UserSettings = ({userInfo, currentUser}) => {
    const [image, setImage] = useState(null);

    const [imageid, setImageid] = useState((userInfo && userInfo.imageid) ? userInfo.imageid : tmp_pic);
    const [name, setName] = useState((userInfo && userInfo.username) ? userInfo.username : "");
    const [bio, setBio] = useState((userInfo && userInfo.bio) ? userInfo.bio : "");
    const [pub, setPub] = useState(true);

    useEffect(() => {
        if (!userInfo) return;
        setName(userInfo.username);
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

    const onSubmit = () => {
        // submit to database
    }

    const onDeleteAccount = () => {
        //delete account
    }

    return (
        <Container>
            <Segment padded>
                <Header as = 'h2' textAlign = "center">Settings</Header>
                <Form>
                    <Grid container stackable>
                        <Grid.Row>
                            <Grid.Column width = {5} verticalAlign = "middle">
                                <Image src = {imageid} circular centered size = "small"/>

                                <div style = {{width: "100%", textAlign: "center", marginTop: "30px"}}>
                                    <Button className = "pfp-upload-button" id = "pfp-upload-button"><label htmlFor = "pfp-upload" className = "pfp-upload-label">Upload</label></Button>
                                    <input id = "pfp-upload" onChange = {onImageInput} hidden type = "file" accept = ".jpg, .jpeg, .png"/>
                                </div>
                            </Grid.Column>
                            <Grid.Column width = {11}>
                                <Segment>
                                    <Form.Field required 
                                                label = "Username" 
                                                control = "input"  
                                                value = {name} 
                                                onChange = {(e) => setName(e.target.value)} 
                                                style = {{ textAlign: "center", fontSize: "22px", padding: "8px"}} 
                                                size = "large"/>
                                    <Divider />
                                    <Form.Field label = "Description" 
                                                control = "textarea" 
                                                rows = {3} 
                                                value = {bio} 
                                                onChange = {(e) => setBio(e.target.value)} />
                                </Segment>
                            </Grid.Column>    
                        </Grid.Row>    
                        <Grid.Row centered>
                            <Grid.Column textAlign = "center">
                                { (pub) ? <span>Profile shown</span> : <span>Profile hidden</span>}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column textAlign = "center">
                                <Checkbox toggle checked = {pub} onClick = {() => {setPub(!pub)}} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column textAlign = "center">
                                <Button color = "green" onClick = {onSubmit}>Save</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>

                <Divider />

                <Container textAlign = "center" style = {{margin: "50px 0 35px 0"}}>
                    <Confirmation trigger = {<Button color = "red">Delete Account</Button>} 
                                  text = "Are you sure you would like to delete your account? This action cannot be undone." 
                                  onConfirm = {() => {onDeleteAccount()}} />
                </Container>

            </Segment>
        </Container>
    );
}

export default UserSettings;