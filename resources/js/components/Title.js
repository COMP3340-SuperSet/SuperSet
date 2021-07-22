import React, { Fragment } from 'react';
import { Header, Image } from "semantic-ui-react";
import logo from "../../images/superset.png";
import "../../css/Title.css";

const Title = ({ title, subtitle }) => {
    return (
        <Fragment>
            <Header className="ss-title-header" textAlign="center">
                <Image className="ss-title-logo" src={logo} size="massive" /> <span className="ss-title-title">{title}</span>
                <p className="ss-title-subtitle">{subtitle}</p>
            </Header>
        </Fragment>

    );
};

export default Title;