import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';


const ReportTableItem = () => {

    const [reportedItems, setReportedItems] = useState([]);

    useEffect(()=>{

        let itemReportsArr= [];
        
        axios.get(`/api/reports`).then(response=>{
            
            for(let report of response.data)
            {
                switch(report.type)
                {
                    case 2:
                        itemReportsArr.push(report);
                        break;
                    default:
                        break;
                }
            }
            setReportedItems(itemReportsArr);
        }).catch(error=>{
            console.error('Error: ' + error);
        });}, []);

    const renderedItemReports = reportedItems.map((item) => {
        return(
            <Table.Row key={item.reportid} className='ss-reporttableitem-row'>
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

    return (
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedItemReports}
            </Table>
        </div>
    );
}

export default ReportTableItem;
