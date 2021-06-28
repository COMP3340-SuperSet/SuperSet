import React, {useState} from "react";
import SetCard from "./SetCard.js";
import SetCell from "./SetCell.js";
import { Grid, Segment, Header, Image, Icon, Button, Table } from "semantic-ui-react";

import "../../css/Profile.css";

const GRID_MODE = true;
const LIST_MODE = false;

const SetsDisplay = (props) => {
    if (props.displayMode === GRID_MODE){
        return(
            <Grid stackable container columns = {4}>
                <Grid.Column><SetCard name = "Set 1" count = "2" description = "This is a set"/></Grid.Column>
                <Grid.Column><SetCard name = "Set 2" count = "5" description = "This is a set again"/></Grid.Column>
                <Grid.Column><SetCard name = "Set 3" count = "4" description = "Test description"/></Grid.Column>
                <Grid.Column><SetCard name = "Set 4" count = "8" description = "Lorem Ipsum"/></Grid.Column>
                <Grid.Column><SetCard name = "Set 5" count = "1" description = "Another set"/></Grid.Column>
            </Grid>
        );
    }
    else{
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
                    <SetCell name = "Set 1" count = "2" description = "This is a set"/>
                    <SetCell name = "Set 2" count = "5" description = "This is a set again"/>
                    <SetCell name = "Set 3" count = "4" description = "Test description"/>
                    <SetCell name = "Set 4" count = "8" description = "Lorem Ipsum"/>
                    <SetCell name = "Set 5" count = "1" description = "Another set"/>
                    <SetCell name = "Set 1" count = "2" description = "This is a set"/>
                    <SetCell name = "Set 2" count = "5" description = "This is a set again"/>
                    <SetCell name = "Set 3" count = "4" description = "Test description"/>
                    <SetCell name = "Set 4" count = "8" description = "Lorem Ipsum"/>
                    <SetCell name = "Set 5" count = "1" description = "Another set"/>
                </Table.Body>
            </Table>
        );
    }
}

const Profile = () => {
    const [displayType, setDisplayType] = useState(GRID_MODE);

    return (
        <Grid divided padded stackable columns = {2} >

            <Grid.Column width = {5}>
                <Segment padded = "very">
                    <Image size = "small" src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" circular centered/>
                    <Header as = "h1" textAlign = "center" >Username</Header>
                    <Segment>
                        <Header as = "h3" textAlign = "center" >Description</Header>
                    </Segment>
                </Segment>
            </Grid.Column>

            <Grid.Column stretched width = {11}>
                <Segment textAlign = "center">
                    <Header as = "h1" className = "inline ss-grey" >My Sets</Header>

                    <Button floated = "left" icon ><Icon name = "plus"/></Button>
                    
                    <Button onClick = {() => setDisplayType(LIST_MODE)} floated = "right" icon primary = {!displayType}><Icon name = "list"/></Button>
                    <Button onClick = {() => setDisplayType(GRID_MODE)} floated = "right" icon primary = {displayType}><Icon name = "th"/></Button>
                </Segment>

                <Segment padded>
                    <SetsDisplay displayMode = {displayType}/>
                </Segment>
            </Grid.Column>

        </Grid>
    );
}

export default Profile;