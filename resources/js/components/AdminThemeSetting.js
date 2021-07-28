import React, { useState, useEffect } from 'react';
import { Popup, Grid, Button } from "semantic-ui-react";
import axios from 'axios';

import { redirect } from "../utils/redirect";
import Confirmation from "./Confirmation";
import { toast } from './Toast';

const onSetTheme = (theme) => {
    axios.put('/api/settings', {
        setting: "theme",
        value: theme
    }).then(() => {
        toast("Theme Changed", "success");
        setTimeout(()=>{
            redirect('/admin');
        }, 1000);
    }).catch(err => {
        console.error(err);
        toast("Error changing theme", "error");
    });
}

const ColorBlock = ({ color, centered = true, bordered = false }) => {
    let blockStyle = {
        height: "50px",
        width: "175px",
        display: "block",
        backgroundColor: "" + color,
        marginTop: "8px",
        borderRadius: "18px"
    };

    if (centered) blockStyle.margin = "8px auto";
    if (bordered) blockStyle.border = "1px solid black";

    return (
        <div style={blockStyle}>&nbsp;</div>
    );
}

const AdminThemeSetting = () => {
    const [currentTheme, setCurrentTheme] = useState("0");

    useEffect(() => {
        axios.get(`/api/settings/theme`).then(response => {
            setCurrentTheme(response.data.value);
        });
    }, []);

    return (
        <Grid stackable centered columns={3} style={{ margin: "32px 0" }}>
            <Grid.Column width={4} style={{ textAlign: "center" }}>
                <ColorBlock color="#464C55" />
                <ColorBlock color="white" bordered = {(currentTheme === "0")} />
                <ColorBlock color="#2875A8" />

                <Confirmation style={{ marginTop: "20px" }}
                    trigger={
                        <Popup
                            content='Change theme for all users'
                            position='bottom center'
                            trigger={<Button>Set Theme</Button>}
                        />
                    }
                    onConfirm={() => { onSetTheme("0"); }}
                    text="Set site theme to default?" 
                    disabled = {(currentTheme === "0")} />

                {(currentTheme === "0") ? <p className = "ss-text-secondary" style = {{marginTop: "8px"}}>Current Theme</p> : null}
            </Grid.Column>
            <Grid.Column width={4} style={{ textAlign: "center" }}>
                <ColorBlock color="#181818" />
                <ColorBlock color="#414141" bordered = {(currentTheme === "1")} />
                <ColorBlock color="#018ABE" />

                <Confirmation style={{ marginTop: "20px" }}
                    trigger={
                        <Popup
                        content='Change theme for all users'
                        position='bottom center'
                        trigger={<Button>Set Theme</Button>}
                        />
                    }
                    onConfirm={() => { onSetTheme("1"); }}
                    text="Set site theme to second theme?" 
                    disabled = {(currentTheme === "1")}  />
                
                {(currentTheme === "1") ? <p className = "ss-text-secondary" style = {{marginTop: "8px"}}>Current Theme</p> : null}
            </Grid.Column>
            <Grid.Column width={4} style={{ textAlign: "center" }}>
                <ColorBlock color="#017284" />
                <ColorBlock color="#36D6EF" bordered = {(currentTheme === "2")} />
                <ColorBlock color="#201878" />

                <Confirmation style={{ marginTop: "20px" }}
                    trigger={
                        <Popup
                        content='Change theme for all users'
                        position='bottom center'
                        trigger={<Button>Set Theme</Button>}
                        />
                    }
                    onConfirm={() => { onSetTheme("2"); }}
                    text="Set site theme to third theme?" 
                    disabled = {(currentTheme === "2")}  />
                
                {(currentTheme === "2") ? <p className = "ss-text-secondary" style = {{marginTop: "8px"}}>Current Theme</p> : null}
            </Grid.Column>
        </Grid>
    );
}

export default AdminThemeSetting;