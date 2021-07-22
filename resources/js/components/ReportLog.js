import React from 'react';
import { Grid, Tab } from "semantic-ui-react";
import ReportTableItem from './ReportTableItem';
import ReportTableSet from './ReportTableSet';
import ReportTableAccount from './ReportTableAccount';

const ReportTable = () => {
    
    const panes = [
        { menuItem: 'Items', render: () => <Tab.Pane> <ReportTableItem /> </Tab.Pane> },
        { menuItem: 'Sets', render: () => <Tab.Pane> <ReportTableSet /> </Tab.Pane> },
        { menuItem: 'Accounts', render: () => <Tab.Pane> <ReportTableAccount /> </Tab.Pane> }
    ]

    return (
        <div>
            <div className='ss-reportlog-div'>
                <Grid centered stackable divided='vertically'>
                    <Grid.Row columns={1}>
                        <Tab panes={panes} />
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
}

export default ReportTable;
