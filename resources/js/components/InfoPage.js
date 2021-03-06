import React, { useState } from "react";
import { Menu, Segment, Icon, Grid, Header, List, Image, Divider, Button, Embed } from "semantic-ui-react";

import StatusCard from "./StatusCard";
import { redirect } from "../utils/redirect";

import signUpImg from "../../images/InfoImgs/signup.png";
import logInImg from "../../images/InfoImgs/login.png";
import tutorialThumbnail from "../../images/tutorial_thumbnail.jpg";

const ABOUT = 0;
const DOC_AUTH = 1;
const DOC_PROFILE = 2;
const DOC_SETS = 3;
const DOC_ITEMS = 4;
const DOC_SEARCH = 5;
const FEEDBACK = 6;
const SERVICE_STATUS = 7;
const VIDEO_TUTORIAL = 8;

const InfoH1 = (props) => {
    return (
        <Header as="h1" textAlign="center" style={{ marginBottom: "24px" }} className="ss-text-primary">
            {props.children}
        </Header>
    );
}

const InfoText = (props) => {
    let textStyle = { fontSize: "16px" };
    if (props.centered) { textStyle.textAlign = "center"; }
    return (
        <p style={textStyle} className="ss-text-primary">
            {props.children}
        </p>
    );
}

const InfoLink = ({ text = "", loc = "/about" }) => {
    if (loc === "null") return (<a className="hoverable ss-link">{text}</a>);
    return (<a className="hoverable ss-link" onClick={() => redirect(loc)}>{text}</a>);
}

const AboutSection = () => {
    return (
        <Segment padded="very" id="about-about" className="ss-segment-primary">
            <InfoH1>SuperSet</InfoH1>
            <InfoText>
                SuperSet is a platform for all of your sets. Do you have a PC build you want to track?
                A trading card collection or wardrobe you want to share? SuperSet is built for all of these things.
                The aim is for the user to be able to manage and track their sets of items, see other people's created
                sets and profiles and also export their sets for anyone else to view.
            </InfoText>

            <br /><br />

            <InfoH1>The project and creators</InfoH1>
            <InfoText>
                SuperSet was built by these five students as a final project for the course `World Wide Web Information Systems Development`.
            </InfoText>
            <List>
                <List.Item>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <a className="ss-link" style={{ fontSize: "16px", fontWeight: "bold", verticalAlign: "middle" }}
                            href="https://github.com/BoKlassen" target="_blank">Brandon Klassen</a>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <a className="ss-link" style={{ fontSize: "16px", fontWeight: "bold", verticalAlign: "middle" }}
                            href="https://github.com/Stephen-SW" target="_blank">Stephen Sarkis-Wiebe</a>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <a className="ss-link" style={{ fontSize: "16px", fontWeight: "bold", verticalAlign: "middle" }}
                            href="https://github.com/BrettShepley11" target="_blank">Brett Shepley</a>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <a className="ss-link" style={{ fontSize: "16px", fontWeight: "bold", verticalAlign: "middle" }}
                            href="https://github.com/Ru-Two" target="_blank">Ruturaj Darji</a>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <a className="ss-link" style={{ fontSize: "16px", fontWeight: "bold", verticalAlign: "middle" }}
                            href="https://github.com/ShaneTracey7" target="_blank">Shane Tracey </a>
                    </List.Content>
                </List.Item>
            </List>
        </Segment>
    );
}

const DocsAuthSection = () => {
    return (
        <Segment padded="very" id="about-docs-auth" className="ss-segment-primary">
            <InfoH1>Sign Up</InfoH1>
            <InfoText>
                In order to sign up, first click on the dropdown menu at the right end of the header and select &nbsp;
                <InfoLink text="Sign Up" loc="/register" />. <br />
                <Image size="big" src={signUpImg} style={{ margin: "14px auto" }} />
                Enter your information in the form as requested then hit the register button.
                You will then be redirected to the landing page where you can start using SuperSet.
            </InfoText>

            <Divider />

            <InfoH1>Log In</InfoH1>
            <InfoText>
                In order to log in, first click on the dropdown menu at the right end of the header and select &nbsp;
                <InfoLink text="Log In" loc="/login" />. <br />
                <Image size="big" src={logInImg} style={{ margin: "14px auto" }} />
                Enter your information in the form as requested then hit the login button.
                You will then be redirected to the landing page where you can continue using SuperSet.
            </InfoText>

            <Divider />

            <InfoH1>Log Out</InfoH1>
            <InfoText>
                In order to log out, simply click on the dropdown menu at the right end of the header and select &nbsp;
                <InfoLink text="Log Out" loc="null" />. <br />
                You will then be redirected to the landing page and you will no longer be logged in.
            </InfoText>
        </Segment>
    );
}

const DocsProfileSection = () => {
    return (
        <Segment padded="very" id="about-docs-profile" className="ss-segment-primary">
            <InfoH1>Viewing Profile</InfoH1>
            <InfoText>
                In order to view your profile once you are authenticated, simply click on the dropdown menu at the right end of the header and select &nbsp;
                <InfoLink text="Profile" loc="/profile" />. You will be redirected to your profile page where your profile and sets will viewable.
            </InfoText>

            <Divider />

            <InfoH1>Editing Profile</InfoH1>
            <InfoText>
                Once you are on your profile page, you may edit your profile by clicking the <Button icon className="no-hover"><Icon name="pencil" /></Button> pencil
                icon on top of your profile card. Once you click this button, the card displaying your information will allow you to edit
                it and make changes. You may change your profile picture, username, and description when editing your profile. <br />
                Once you are finished editing your profile, click the <Button className="no-hover" positive>Save</Button> button to save your changes.
            </InfoText>

            <Divider />

            <InfoH1>Sharing Profile</InfoH1>
            <InfoText>
                Once you are on your profile page, you may share your profile by clicking the <Button icon className="no-hover"><Icon name="linkify" /></Button> link
                button. This will copy the link to your profile that you may share with others. When others view your profile, they will see your
                profile card and all of your sets on display.
            </InfoText>
        </Segment>
    );
}

const DocsSetsSection = () => {
    return (
        <Segment padded="very" id="about-docs-sets" className="ss-segment-primary">
            <InfoH1>Viewing Sets</InfoH1>
            <InfoText>
                Once you are viewing your profile, you may see all of your sets. Your sets can be displayed in two modes: &nbsp;
                <Button icon className="no-hover"><Icon name="th" /></Button> Grid and <Button icon className="no-hover"><Icon name="list" /></Button> List.
                The default view will be grid mode. To switch view modes simply click on the icon representing each view on the
                right of the controls section at the top of the set view. <br />
                To view any individual set, click on the set respresented by a card in grid view, and a row in list view. This will
                redirect you to a page where you can view all the information and items in your set.
            </InfoText>

            <Divider />

            <InfoH1>Creating Sets</InfoH1>
            <InfoText>
                To create a set first navigate to your profile. Then click on the <Button icon className="no-hover"><Icon name="plus" /></Button> plus
                button in the controls sections and you will be prompted to enter a name for your new set. After entering your name,
                clicking the <Button positive className="no-hover">Create</Button> button will redirect you to the set editing page with your new blank set. <br />
            </InfoText>

            <Divider />

            <InfoH1>Editing Sets</InfoH1>
            <InfoText>
                To edit a set, first click on your desired set you want to edit from your profile. This will bring you to your set's
                information page. From here, click the <Button icon className="no-hover"><Icon name="pencil" /></Button> pencil button and you will be
                redirected to the set editing page. <br /> <br />
                On this set editing page, you may update your set's name, description, image and items.
                See the Items tab in our documentation to get more information about managing items.
            </InfoText>

            <Divider />

            <InfoH1>Adding/Deleting Set Images</InfoH1>
            <InfoText>
                There are two options for adding images to a set.<br /> The first is clicking the <Button basic className="no-hover">Add</Button> button to select
                images from your own file system (images cannot exceed 2Mb).<br /> The second option is to use our image picker powered by Unsplash.
                This image picker searches Unsplash for images based on what your set's name is, and presents the top ten results to choose from.
                <br />
                To remove any of your images, simply click the <Button icon className="no-hover" color = "red"><Icon name = "trash" /></Button> delete button attached at the 
                bottom of the image.
            </InfoText>

            <Divider />

            <InfoH1>Deleting Sets</InfoH1>
            <InfoText>
                Once you are on the set editing page, you may also delete your set entirely. You can do this by clicking
                the <Button color="red" className="no-hover">Delete set</Button> button. You will be prompted with a confirmation box if you truly want to delete the set,
                and confirming will delete your set data and it will be removed from the database. (So be careful!)<br />
                After deleting a set, you will be redirected back to your profile page.
            </InfoText>

            <Divider />

            <InfoH1>Sharing Sets</InfoH1>
            <InfoText>
                To share any of your sets, first navigate to the set's view page. Then click the <Button icon className="no-hover"><Icon name="linkify" /></Button> link
                button at the top of your set. This will copy the link to your set, and you may share this link with others. When others view your set,
                they will see all of the information you do when viewing it.
            </InfoText>
        </Segment>
    );
}

const DocsItemsSection = () => {
    return (
        <Segment padded="very" id="about-docs-items" className="ss-segment-primary">
            <InfoText centered>
                While on the set editing page, the user may add, edit, or delete items.
            </InfoText>

            <InfoH1>Creating Items</InfoH1>
            <InfoText>
                To create an item, fill out the information for the item in the "Create an item" dropdown box. Once
                the name is inputted, the user will be allowed to add that item to their set by clicking
                the <Button primary className="no-hover">Save</Button> button. The description and image are optional.
            </InfoText>

            <Divider />

            <InfoH1>Editing Items</InfoH1>
            <InfoText>
                In order to edit an existing item from the item list, click on the <Button icon className="no-hover"><Icon name="edit" /></Button> edit
                button to bring that item's information into the item creation form. The user may now change that item's information however
                they would like, and then hit the <Button primary className="no-hover">Save</Button> button to save their changes.
            </InfoText>

            <Divider />

            <InfoH1>Adding/Deleting Item Images</InfoH1>
            <InfoText>
                There are two options for adding images to an item. <br /> The first is clicking the <Button basic className="no-hover">Add</Button> button to select
                images from your own file system (images cannot exceed 2Mb). <br />The second option is to use our image picker powered by Unsplash.
                This image picker searches Unsplash for images based on what your item's name is, and presents the top ten results to choose from.
                <br />
                To remove any of your images, simply click the <Button icon className="no-hover" color = "red"><Icon name = "trash" /></Button> delete button attached at the 
                bottom of the image.
            </InfoText>

            <Divider />

            <InfoH1>Deleting Items</InfoH1>
            <InfoText>
                To delete an item, simply click the <Button icon className="no-hover" color = "red"><Icon name="trash" /></Button> delete button on that item in the list of items
                below the form. The user is then prompted if they truly wish to delete that item, and upon confirming the item is deleted.
                Be careful, this action cannot be undone.
            </InfoText>
        </Segment>
    );
}

const DocsSearchSection = () => {
    return (
        <Segment padded="very" id="about-docs-search" className="ss-segment-primary">
            <InfoH1>Search for profiles and sets</InfoH1>
            <InfoText>
                SuperSet allows you to find and view other users' profiles and sets. <br /> <br />
                You can do this by selecting the search bar on the page header and typing what you want to search
                for. The system will search the database and display the output below the search bar. You could be
                presented with a number of users and/or sets that matched with your search input.
                Clicking on any of these will bring you to their respective viewing pages.
            </InfoText>
        </Segment>
    );
}

const FeedbackSection = () => {
    return (
        <Segment padded="very" id="about-feedback" className="ss-segment-primary">
            <InfoH1>Submit feedback</InfoH1>
            <InfoText centered>
                Want to submit feedback to the developers? Please do so on
                our <Button icon onClick={() => redirect('/feedback')} > <Icon name="file text" /> Feedback</Button> page.
            </InfoText>
        </Segment>
    );
}

const ServiceStatusSection = () => {
    return (
        <Segment padded="very" id="about-service-status" className="ss-segment-primary">
            <InfoH1>Check service status</InfoH1>
            <InfoText centered>
                Our <InfoLink text="Service Status Module" loc="/status" /> offers a look at which of our services are online and which are not.
                If there are any issues on the site, this page will show which services are experiencing difficulties, and which are online.
            </InfoText>
            
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <div><StatusCard name={"Online"} description={"This type of card indicates the service is online"} operational={true} /></div>
                <div><StatusCard name={"Offline"} description={"This type of card indicates the service is not online"} operational={false} /></div>
            </div>
        </Segment>
    );
}

const VideoTutorialSection = () => {
    return (
        <Segment padded="very" id="about-video-tutorial" className="ss-segment-primary">
            <InfoH1>Video Tutorial</InfoH1>
            <Embed id="7wgHT5OkTzU"
                source="youtube"
                placeholder={tutorialThumbnail}
                hd autoplay aspectRatio="16:9" />
        </Segment>
    );
}

const InfoSection = ({ section }) => {
    switch (section) {
        case ABOUT: return <AboutSection />;
        case DOC_AUTH: return <DocsAuthSection />;
        case DOC_PROFILE: return <DocsProfileSection />;
        case DOC_SETS: return <DocsSetsSection />;
        case DOC_ITEMS: return <DocsItemsSection />;
        case DOC_SEARCH: return <DocsSearchSection />;
        case FEEDBACK: return <FeedbackSection />;
        case SERVICE_STATUS: return <ServiceStatusSection />;
        case VIDEO_TUTORIAL: return <VideoTutorialSection />;
        default: return null;
    }
}

const InfoPage = () => {
    const [activeItem, setActiveItem] = useState(ABOUT);

    return (
        <Grid columns={2} stackable padded>
            <Grid.Column width={3} >
                <Menu vertical fluid secondary style={{ marginLeft: "6px" }} className="ss-info-menu">
                    <Menu.Item header>About</Menu.Item>
                    <Menu.Item active={activeItem === ABOUT} onClick={() => setActiveItem(ABOUT)} >
                        <span ><Icon rotated='clockwise' name='level up' />About SuperSet</span>
                    </Menu.Item>

                    <Menu.Item header>Documentation</Menu.Item>
                    <Menu.Item active={activeItem === DOC_AUTH} onClick={() => setActiveItem(DOC_AUTH)} >
                        <span><Icon rotated='clockwise' name='level up' />Authentication</span>
                    </Menu.Item>
                    <Menu.Item active={activeItem === DOC_PROFILE} onClick={() => setActiveItem(DOC_PROFILE)} >
                        <span><Icon rotated='clockwise' name='level up' />Profile</span>
                    </Menu.Item>
                    <Menu.Item active={activeItem === DOC_SETS} onClick={() => setActiveItem(DOC_SETS)} >
                        <span><Icon rotated='clockwise' name='level up' />Sets</span>
                    </Menu.Item>
                    <Menu.Item active={activeItem === DOC_ITEMS} onClick={() => setActiveItem(DOC_ITEMS)} >
                        <span><Icon rotated='clockwise' name='level up' />Items</span>
                    </Menu.Item>
                    <Menu.Item active={activeItem === DOC_SEARCH} onClick={() => setActiveItem(DOC_SEARCH)} >
                        <span><Icon rotated='clockwise' name='level up' />Search</span>
                    </Menu.Item>

                    <Menu.Item header>Feedback</Menu.Item>
                    <Menu.Item active={activeItem === FEEDBACK} onClick={() => setActiveItem(FEEDBACK)} >
                        <span ><Icon rotated='clockwise' name='level up' />Submit feedback</span>
                    </Menu.Item>

                    <Menu.Item header>Service Status</Menu.Item>
                    <Menu.Item active={activeItem === SERVICE_STATUS} onClick={() => setActiveItem(SERVICE_STATUS)} >
                        <span ><Icon rotated='clockwise' name='level up' />Check service status</span>
                    </Menu.Item>

                    <Menu.Item header>Tutorial</Menu.Item>
                    <Menu.Item active={activeItem === VIDEO_TUTORIAL} onClick={() => setActiveItem(VIDEO_TUTORIAL)} >
                        <span><Icon rotated='clockwise' name='level up' />Video Tutorial</span>
                    </Menu.Item>
                </Menu>
            </Grid.Column>

            <Grid.Column width={13}>
                <InfoSection section={activeItem} />
            </Grid.Column>
        </Grid>
    );
}

export default InfoPage;
