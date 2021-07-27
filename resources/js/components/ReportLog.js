import React from 'react';
import { Segment, Tab } from "semantic-ui-react";
import ReportTableItem from './ReportTableItem';
import ReportTableSet from './ReportTableSet';
import ReportTableAccount from './ReportTableAccount';

const ReportTable = () => {

    const panes = [
        { menuItem: 'Accounts', render: () => <Tab.Pane> <ReportTableAccount /> </Tab.Pane> },
        { menuItem: 'Sets', render: () => <Tab.Pane> <ReportTableSet /> </Tab.Pane> },
        { menuItem: 'Items', render: () => <Tab.Pane> <ReportTableItem /> </Tab.Pane> }
    ]

    return (
        <Segment basic padded className = "ss-segment-secondary">
            <Tab panes={panes} />
        </Segment>
    );
}

export default ReportTable;
