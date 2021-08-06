import React from 'react';
import { Grid } from "semantic-ui-react";

import Carousel from './Carousel';

import info_nav from "../../images/admin_info_nav.jpg";
import info_reports from "../../images/admin_info_reports.jpg";
import info_feedback from "../../images/admin_info_feedback.jpg";
import info_theme from "../../images/admin_info_theme.jpg";

const AdminInstructions = () => {
    return (
        <Grid centered>
            <Grid.Column textAlign = "center" style = {{padding: "50px 0"}}>
                <Carousel images={[info_nav, info_reports, info_feedback, info_theme]} />
            </Grid.Column>
        </Grid>
    );
}

export default AdminInstructions;