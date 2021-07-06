import React from "react";
import { Icon, Image, Header, Input, Dropdown, Segment } from "semantic-ui-react";

import "../../css/Header.css";
import 'semantic-ui-css/semantic.min.css';

import logo from "../../images/superset.png";
import { redirect } from "../utils/redirect";

const SSHeader = () => {
    return (
        <Segment  className="ss-header ">
            <Segment basic compact className ="ss-bg-grey no-margin no-bottompadding ss-header-1">
                <Header size="huge" className="inline">
                    <div 
                        onClick={() => redirect('/')}
                        style={{cursor: "pointer"}}
                    >
                        <Image className="ss-header-logo" src={logo} size="mini" centered verticalAlign="middle" spaced="left"/>
                        <a className="ss-header-title" style={{padding: "12px", verticalAlign: "middle", textDecoration: "none"}}>SuperSet</a>
                    </div>
                </Header>
                
                <Input className="ss-header-searchbar" placeholder="Search"/>
            </Segment>
            
            <Segment basic floated="right" compact className="ss-bg-grey no-margin">
                <Icon name="user" className="ss-white no-padding"/>
                <Dropdown  button className="ss-white ss-bg-grey no-padding no-margin">
                    <Dropdown.Menu direction="left">
                        <Dropdown.Item text='Log In' onClick={() => redirect('/login')}/>
                        <Dropdown.Item text='Sign Up' onClick={() => redirect('/register')}/>
                        <Dropdown.Item text='Tutorial' />
                    </Dropdown.Menu>
                </Dropdown>
            </Segment>
            
        </Segment>
    );
}

export default SSHeader;
