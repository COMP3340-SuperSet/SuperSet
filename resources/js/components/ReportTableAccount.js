import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';

const ReportTableAccount = () => {

    const [reportedAccounts, setReportedAccounts] = useState([]);

    useEffect(()=>{

        let accountReportsArr= [];

        axios.get(`/api/reports`).then(response=>{
            
            for(let report of response.data)
            {
                switch(report.type)
                {
                    case 0:
                        accountReportsArr.push(report);
                        break;
                    default:
                        break;
                }
            }
            setReportedAccounts(accountReportsArr);
        }).catch(error=>{
            console.error('Error: ' + error);
        });}, []);

    const renderedAccountReports = reportedAccounts.map((account) => {
        return(
            <Table.Row key={account.reportid} className='ss-reporttableitem-row'>
                <Table.Cell width={14}>
                    <Image src={account.accountImage} inline rounded size='small' className='ss-reporttableitem-image' />
                    <Header as='h2' image className='ss-reporttableitem-header'>
                        <Header.Content style={{margin:'10px'}}>
                            Place Account Name Here
                            <Header.Subheader>
                                Place Account Description Here
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button.Group vertical>  
                        <Button color='red' content='Delete Report'/>
                        <BanModal trigger={<Button color='red' content='Ban Account'/>}/>
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