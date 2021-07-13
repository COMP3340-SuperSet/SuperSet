import React, { useEffect, useState} from "react";
import { Menu, Segment, Container, Icon, Grid } from "semantic-ui-react";

//import { redirect } from "../utils/redirect";
//import axios from "axios";

const ABOUT = 0;
const DOC_AUTH = 1;
const DOC_SETS = 2;
const DOC_ITEMS = 3;
const DOC_PROFILE = 4;
const DOC_SEARCH = 5;
const VIDEO_TUTORIAL = 8;

const AboutSection = () =>{
    return(
        <Segment>
            About 
        </Segment>
    );
}

const DocsAuthSection = () =>{
    return(
        <Segment>
            Documentation - Auth 
        </Segment>
    );
}

const DocsSetsSection = () =>{
    return(
        <Segment>
            Documentation - Sets 
        </Segment>
    );
}

const DocsItemsSection = () =>{
    return(
        <Segment>
            Documentation - Items 
        </Segment>
    );
}

const DocsProfileSection = () =>{
    return(
        <Segment>
            Documentation - Profile 
        </Segment>
    );
}

const DocsSearchSection = () =>{
    return(
        <Segment>
            Documentation - Search 
        </Segment>
    );
}

const VideoTutorialSection = () => {
    return(
        <Segment>
            Video Tutorial
        </Segment>
    );
}

const InfoSection = ({section}) => {
    switch(section){
        case ABOUT:
            return <AboutSection />;
        case DOC_AUTH:
            return <DocsAuthSection />
        case DOC_SETS:
            return <DocsSetsSection />
        case DOC_ITEMS:
            return <DocsItemsSection />
        case DOC_PROFILE:
            return <DocsProfileSection />
        case DOC_SEARCH:
            return <DocsSearchSection />
        case VIDEO_TUTORIAL:
            return <VideoTutorialSection />
        default:
            return null;
    }
}

const InfoPage = () => {
    const [activeItem, setActiveItem] = useState(ABOUT);

    return (
        <Grid columns = {2} stackable padded>
            <Grid.Column width = {3} >
                <Segment padded basic>
                    <Menu vertical fluid borderless secondary>
                        <Menu.Item header>About<Icon name = "caret down" /></Menu.Item>
                        <Menu.Item active = {activeItem === ABOUT} onClick = {() => setActiveItem(ABOUT)} >About</Menu.Item>

                        <Menu.Item header>Documentation<Icon name = "caret down" /></Menu.Item>
                        <Menu.Item active = {activeItem === DOC_AUTH} onClick = {() => setActiveItem(DOC_AUTH)} >Authentication</Menu.Item>
                        <Menu.Item active = {activeItem === DOC_SETS} onClick = {() => setActiveItem(DOC_SETS)} >Sets</Menu.Item>
                        <Menu.Item active = {activeItem === DOC_ITEMS} onClick = {() => setActiveItem(DOC_ITEMS)} >Items</Menu.Item>
                        <Menu.Item active = {activeItem === DOC_PROFILE} onClick = {() => setActiveItem(DOC_PROFILE)} >Profile</Menu.Item>
                        <Menu.Item active = {activeItem === DOC_SEARCH} onClick = {() => setActiveItem(DOC_SEARCH)} >Search</Menu.Item>

                        <Menu.Item header>Tutorial<Icon name = "caret down" /></Menu.Item>
                        <Menu.Item active = {activeItem === VIDEO_TUTORIAL} onClick = {() => setActiveItem(VIDEO_TUTORIAL)} >Video Tutorial</Menu.Item>
                    </Menu>
                </Segment>
            </Grid.Column>
            
            <Grid.Column width = {13}>
                <InfoSection section = {activeItem} />
            </Grid.Column>
        </Grid>
    );
}

export default InfoPage;
