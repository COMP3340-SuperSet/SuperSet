import React from 'react';
import { Grid } from "semantic-ui-react";

import AdminCarousel from './AdminCarousel';

const AdminInstructions = () => {
    return (
        <Grid centered>
            <Grid.Column textAlign = "center" style = {{padding: "50px 0"}}>
                <AdminCarousel images={[]} />
            </Grid.Column>
        </Grid>
    );
}

export default AdminInstructions;