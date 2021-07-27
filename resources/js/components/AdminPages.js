import React from 'react';
import { Segment, Tab } from "semantic-ui-react";

import AdminInstructions from './AdminInstructions';
import AdminFeedback from './AdminFeedback';
import ReportTable from "./ReportLog";
import AdminThemeSetting from './AdminThemeSetting';


/*
import StatisticsPage from './StatisticsPage';
 not in use: { menuItem: 'View Statistics', render: () => <Tab.Pane><StatisticsPage /></Tab.Pane> },
*/

const AdminPages = () => {

    const panes = [
        { menuItem: 'Instructions', render: () => <Tab.Pane><AdminInstructions /></Tab.Pane> },
        { menuItem: 'Reports', render: () => <Tab.Pane><ReportTable /></Tab.Pane> },
        { menuItem: 'Feedback', render: () => <Tab.Pane><AdminFeedback /></Tab.Pane> },
        { menuItem: 'Site Themes', render: () => <Tab.Pane><AdminThemeSetting /></Tab.Pane> }
    ]

    return (
            <Segment basic padded>
                <Tab panes={panes}  className = "ss-tab" />
            </Segment>
    );
}

export default AdminPages;