import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';

const ReportTableSet = () => {

    const [reportedSets, setReportedSets] = useState([]);

    useEffect(()=>{

        let setReportsArr = [];

        axios.get(`/api/reports`).then(response=>{
            
            for(let report of response.data)
            {
                switch(report.type)
                {
                    case 1:
                        setReportsArr.push(report);
                        break;
                    default:
                        break;
                }
            }
            setReportedSets(setReportsArr);
        }).catch(error=>{
            console.error('Error: ' + error);
        });}, []);

    const renderedSetReports = reportedSets.map((set) => {
        return(
            <Table.Row key={set.reportid} className='ss-reporttableitem-row'>
                <Table.Cell width={14}>
                    <Image src={''} inline rounded size='small' className='ss-reporttableitem-image'/>
                    <Header as='h2' image className='ss-reporttableitem-header'>
                        <Header.Content style={{margin:'10px'}}>
                            Place Item Name Here
                            <Header.Subheader>
                                Place Item Description Here
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

    return(
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedSetReports}
            </Table>
        </div>
    );
}

export default ReportTableSet;
