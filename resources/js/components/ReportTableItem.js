import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';
import tmp_pic from "../../images/pfp_placeholder.png";

function onReportDelete(reportid)
{
    axios.post('/api/delete/report', {reportid}).then(response=>{}).catch(err=>console.log(err));
}

function getReportedItems(items, reports){

    let tempArray = [];

    reports.forEach(report =>{
        if(report.type == 2)
        {
            items.forEach(item => {
                if(report.resourceid == item.itemid){tempArray.push({reportid: report.reportid,itemid: item.itemid, name: item.name, description: item.description});
            }})
        }});

    return(tempArray.map((reportInformation=>{
        return(
                <Table.Row key={reportInformation.reportid} className='ss-reporttableitem-row'>
                    <Table.Cell width={14}>
                        <Image src={tmp_pic} inline rounded size='small' className='ss-reporttableitem-image'/>
                        <Header as='h2' image className='ss-reporttableitem-header'>
                            <Header.Content style={{margin:'10px'}}>
                                {reportInformation.name}
                                <Header.Subheader>
                                    {reportInformation.description}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button.Group vertical>  
                            <Button color='red' content='Delete Report' onClick={()=>{onReportDelete(reportInformation.reportid)}}/>
                            <BanModal trigger={<Button color='red' content='Ban Account'/>}/>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
    })));
}

const ReportTableItem = () => {

    const [reports, setReports] = useState([]);
    const [items, setItems] = useState([]);
    
    useEffect(()=>
    {
            axios.get(`/api/reports`).then((response)=>{
                setReports(response.data);
            })
    
            axios.get(`/api/items`).then((response)=>{
                setItems(response.data);
            })
        }, []);

    const renderedItemReports = getReportedItems(items, reports);

    return(
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedItemReports}
            </Table>
        </div>
    );
}

export default ReportTableItem;
