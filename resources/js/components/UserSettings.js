import React, { useState, useEffect } from "react";
import { Segment, Divider, Container, Header, Grid, Form, Image, Button, Input } from 'semantic-ui-react';
import { redirect } from "../utils/redirect";

import { getImagePath } from "../utils/imagePath";

import Confirmation from "./Confirmation";

import tmp_pic from "../../images/pfp_placeholder.png";
import { uploadFile } from "../services/fileUpload";
import axios from "axios";
import { toast } from "./Toast";

const UserSettings = ({ userInfo }) => {
    const [image, setImage] = useState(null);

    const [imageid, setImageid] = useState((userInfo && userInfo.imageid) ? userInfo.imageid : tmp_pic);
    const [name, setName] = useState((userInfo && userInfo.username) ? userInfo.username : "");
    const [bio, setBio] = useState((userInfo && userInfo.bio) ? userInfo.bio : "");

    const [toggleDel, setToggleDel] = useState(true);
    const [delPass, setDelPass] = useState("");

    useEffect(() => {
        if (!userInfo) return;
        setName(userInfo.username);
        if (userInfo.bio) setBio(userInfo.bio);
        if (userInfo.imageid) setImageid(userInfo.imageid);
    }, [userInfo]);

    useEffect(() => {

    }, [imageid]);

    const onImageInput = (e) => {
        let uploadedFiles = e.target.files;

        setImage(uploadedFiles[0]);
        if (uploadedFiles && uploadedFiles[0]) setImageid(URL.createObjectURL(uploadedFiles[0]));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setName(name === "" ? userInfo.username : name);

        if (image) {
            var formData = new FormData();
            formData.append("image", image);

            formData.append("userid", userInfo.userid);

            //uploadFile('/api/user/image', formData);
            axios.post('/api/user/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data.user);
                axios.put(`/api/user/`, {
                    userid: userInfo.userid,
                    username: name,
                    bio: bio
                }).then(response => {
                    console.log("then: ", response.data.user);
                    setImageid(response.data.user.imageid)
                }).catch(error => {
                    console.error(error);
                });
            }).catch(err => console.error(err));
        } else {
            axios.put(`/api/user/`, {
                userid: userInfo.userid,
                username: name,
                bio: bio
            }).then(response => {
                console.log("then: ", response.data.user);
                setImageid(response.data.user.imageid)
            }).catch(error => {
                console.error(error);
            });
        }


    }

    const onDeleteAccount = async () => {

        //check password {delPass}
        //replace false with condition if password check passed
        if (false) {
            await axios.delete(`/api/user/`, {
                userid: userInfo.userid
            });

            redirect('/');
        }
        else { toast("Incorrect password!", "error"); }

    }

    return (
        <Container>
            <Segment padded>
                <Header as='h2' textAlign="center">Settings</Header>
                <Form>
                    <Grid container stackable>
                        <Grid.Row>
                            <Grid.Column width={5} verticalAlign="middle">
                                <Image src={getImagePath('user', imageid)} circular centered size="small" />

                                <div style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
                                    <Button className="pfp-upload-button" id="pfp-upload-button"><label htmlFor="pfp-upload" className="pfp-upload-label">Upload</label></Button>
                                    <input id="pfp-upload" onChange={onImageInput} hidden type="file" accept=".jpg, .jpeg, .png" />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <Segment>
                                    <Form.Field required
                                        label="Username"
                                        control="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ textAlign: "center", fontSize: "22px", padding: "8px" }}
                                        size="large" />
                                    <Divider />
                                    <Form.Field label="Description"
                                        control="textarea"
                                        rows={3}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)} />
                                </Segment>

                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column textAlign="center">
                                <Button color="green" onClick={onSubmit}>Save</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>

                <Divider />


                <Container textAlign="center" style={{ margin: "50px 0 35px 0" }}>
                    <Confirmation trigger={<Button color="red">Delete Account</Button>}
                        text="Are you sure you would like to delete your account? This action cannot be undone."
                        onConfirm={() => { onDeleteAccount() }} />
                </Container>

            </Segment>
        </Container>
    );
}

export default UserSettings;