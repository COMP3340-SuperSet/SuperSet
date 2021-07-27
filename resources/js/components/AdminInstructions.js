import React from 'react';
import { Grid } from "semantic-ui-react";

import AdminCarousel from './AdminCarousel';

import info_theme from "../../images/admin_info_theme.jpg";
import info_nav from "../../images/admin_info_nav.jpg";

const AdminInstructions = () => {
    return (
        <Grid centered>
            <Grid.Column textAlign = "center" style = {{padding: "50px 0"}}>
                <AdminCarousel images={[info_nav, info_theme]} />
            </Grid.Column>
        </Grid>
    );
}

export default AdminInstructions;