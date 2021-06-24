import React from "react";
import { Icon, Image, Header, Input, Dropdown, Segment } from "semantic-ui-react";

import "../../css/Header.css";
import 'semantic-ui-css/semantic.min.css';

import logo from "../../images/superset.png";

const SSHeader = () => {
    return (
        <Segment  className = "ss-header ">
            <Segment basic compact className = "ss-bg-grey no-margin no-bottompadding ss-header-1">
                <Header size = "huge" className = "inline">
                    <Image className = "ss-header-logo" src = {logo} size = "tiny" centered verticalAlign = "middle" spaced = "left"/>
                    <a class = "ss-header-title" style = {{padding: "12px", verticalAlign: "middle"}} href = "#">SuperSet</a>
                </Header>
                
                <Input className = "ss-header-searchbar" placeholder = "Search"/>
            </Segment>
            
            <Segment basic floated = "right" compact className = "ss-bg-grey no-margin">
                <Icon name = "user" className = "ss-white no-padding"/>
                <Dropdown  button className = "ss-white ss-bg-grey no-padding no-margin">
                    <Dropdown.Menu direction = "left">
                        <Dropdown.Item text = 'Log In' />
                        <Dropdown.Item text = 'Sign Up' />
                        <Dropdown.Item text = 'Tutorial' />
                    </Dropdown.Menu>
                </Dropdown>
            </Segment>
            
        </Segment>
    );
}

export default SSHeader;
