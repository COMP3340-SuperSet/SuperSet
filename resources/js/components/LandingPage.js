
import React from 'react';
import { Button, Container, Image, Popup } from "semantic-ui-react";

import Carousel from './Carousel';
import { redirect } from '../utils/redirect';

import logoFull from "../../images/supersetfull.png";
import gif1 from "../../images/landing_gif1.gif";
import gif2 from "../../images/landing_gif2.gif";
import gif3 from "../../images/landing_gif3.gif";

const LandingPage = () => {

    return (
        <Container textAlign="center" style = {{paddingBottom: "24px"}}>
            <Image src={logoFull} style={{ margin: "30px auto 6px auto" }} size="large" />
            <Container textAlign="center">
                <p className="ss-title-subtitle" style={{ paddingBottom: "0" }}>How it works</p>
                <p className="ss-text-primary" style={{ marginBottom: "14px", fontSize: "16px" }}>Create and manage organized sets of items</p>
            </Container>
            <Carousel images = {[gif1, gif2, gif3]} />
            <Popup 
                    content='Register to SuperSet' 
                    position='top center'
                    trigger={<Button content="Get Started" className="ss-instructions-button"  onClick={() => redirect('/register')}  />}
                />
        </Container>
    );
};

export default LandingPage;