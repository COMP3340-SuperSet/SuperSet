import React from 'react';
import { Grid, Tab } from "semantic-ui-react";
import AdminInstructions from './AdminInstructions';
import AdminFeedback from './AdminFeedback';
import StatisticsPage from './StatisticsPage';
import ReportTable from "./ReportLog";

const AdminPages = () => {

    const panes = [
        { menuItem: 'View Instructions', render: () => <Tab.Pane><AdminInstructions/></Tab.Pane> },
        { menuItem: 'View Statistics', render: () => <Tab.Pane><StatisticsPage/></Tab.Pane> },
        { menuItem: 'View Reports', render: () => <Tab.Pane><ReportTable/></Tab.Pane> },
        { menuItem: 'View Feedback', render: () => <Tab.Pane><AdminFeedback/></Tab.Pane> }
    ]

    return (
        <div>
            <div className='ss-adminpages-div'>
                <Grid centered stackable divided='vertically'>
                    <Grid.Row columns={1}>
                        <Tab panes={panes} />
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
}

export default AdminPages;