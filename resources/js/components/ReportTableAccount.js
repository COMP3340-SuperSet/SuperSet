import React, { useState } from 'react';
import { Table, Image, Header, Button } from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';

const ReportTableAccount = () => {

    const [reportedAccounts, setReportedAccounts] = useState([]);

    const renderedAccountReports = reportedAccounts.map((account) => {
        return (
            <Table.Row key={account.accountName} className='ss-reporttableitem-row'>
                <Table.Cell width={14}>
                    <Image src={account.accountImage} inline rounded size='small' className='ss-reporttableitem-image' />
                    <Header as='h2' image className='ss-reporttableitem-header'>
                        <Header.Content style={{ margin: '10px' }}>
                            {account.accountName}
                            <Header.Subheader>{account.accountDescription}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button.Group vertical>
                        <Button color='blue' content='View Profile' />
                        <Button color='red' content='Delete Report' />
                        <BanModal trigger={<Button color='red' content='Ban Account' />} />
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    })

    return (
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedAccountReports}
            </Table>
        </div>
    );
}

export default ReportTableAccount;