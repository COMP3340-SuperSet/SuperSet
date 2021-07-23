import React, { useState, useEffect } from "react";
import { Segment, Divider, Container, Header, Grid, Form, Image, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

import { redirect } from "../utils/redirect";

import { getImagePath } from "../utils/imagePath";
import Confirmation from "./Confirmation";
import tmp_pic from "../../images/pfp_placeholder.png";
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
        if (userInfo.imageid) setImageid(getImagePath('user', userInfo.imageid));
    }, [userInfo]);

    useEffect(() => {

    }, [imageid]);

    const onImageInput = (e) => {
        let uploadedFiles = e.target.files;

        setImage(uploadedFiles[0]);
        if (uploadedFiles && uploadedFiles[0]) setImageid(URL.createObjectURL(uploadedFiles[0]));
    }

    const onDeleteImage = () => {
        axios.post(`/api/delete/user/image`, {
            userid: userInfo.userid
        }).then((response) => {
            console.log("delete image response:", response.data.user);
        }).catch((error) => {
            console.error(error);
        });

        redirect("/user/settings");
    }

    const onSubmit = (event) => {
        setName(name === "" ? userInfo.username : name);

        if (image) {
            var formData = new FormData();
            formData.append("image", image);
            formData.append("userid", userInfo.userid);

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
        redirect("/user/settings");
    }

    const onDeleteAccount = async () => {
        axios.post('/api/password', {
            userid: userInfo.userid,
            password: delPass
        }).then(response => {
            let passwordGood = response.data.result;
            console.log('From Password Test: ', passwordGood);
            if (passwordGood) {
                axios.post(`/api/delete/user/`, {
                    userid: userInfo.userid
                }).then(() => {
                    redirect('/');
                });
            } else { toast("Incorrect password!", "error"); }
        }).catch(error => {
            console.error(error);
            toast("Something went wrong. Please try again", "error");
        });
    }

    return (
        <Container>
            <Segment padded>
                <Header as='h1' textAlign="center" style={{ margin: "10px 0" }}>Settings</Header>
                <Form style={{ margin: "30px 0" }}>
                    <Grid container stackable>
                        <Grid.Row>
                            <Grid.Column width={5} verticalAlign="middle">
                                <Image src={imageid} circular centered size="small" />

                                <div style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
                                    <Button className="pfp-upload-button" id="pfp-upload-button"><label htmlFor="pfp-upload" className="pfp-upload-label">Upload</label></Button>
                                    <input id="pfp-upload" onChange={onImageInput} hidden type="file" accept=".jpg, .jpeg, .png" />
                                    <Confirmation trigger={<Button color="red" icon><Icon name="trash" /></Button>}
                                        text="Delete profile picture?"
                                        onConfirm={() => { onDeleteImage() }}
                                        confirmText="Delete"
                                        inline />
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
                                <Button onClick={() => redirect('/user', [{ key: "id", value: userInfo.userid }])}>Back to profile</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>

                <Divider />

                <Segment compact style={{ margin: "20px auto 0 auto" }}>
                    {(toggleDel) ? (<Button color="red" onClick={() => { setToggleDel(false) }}>Delete Account</Button>) :
                        (<Form>
                            <Form.Group style={{ justifyContent: "center", marginBottom: "0" }}>
                                <Form.Field required
                                    control="input" type="password"
                                    placeholder="Confirm your password"
                                    value={delPass}
                                    onChange={(e) => { setDelPass(e.target.value) }} />

                                <Confirmation trigger={<Button color="red">Confirm</Button>}
                                    text="Are you sure you would like to delete your account? This action cannot be undone."
                                    confirmText="Delete"
                                    onConfirm={() => { onDeleteAccount() }} />

                                <Button onClick={() => { setToggleDel(true); setDelPass(""); }}>Cancel</Button>
                            </Form.Group>
                        </Form>)}
                </Segment>
            </Segment>
        </Container>
    );
}

export default UserSettings;