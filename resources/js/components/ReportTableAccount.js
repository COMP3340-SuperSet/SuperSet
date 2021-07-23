import axios from "axios";
import React, {useState, useEffect, useRef} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';
import tmp_pic from "../../images/pfp_placeholder.png";

function onReportDelete(reportid)
{
    axios.post('/api/delete/report', {reportid}).then(response=>{}).catch(err=>console.log(err));
}

function getReportedUser(users, reports){

    let tempArray = [];

    reports.forEach(report =>{
        if(report.type == 0)
        {
            users.forEach(user => {
                if(report.resourceid == user.userid){
                    tempArray.push(
                        {
                            reportid: report.reportid,
                            userid: user.userid, 
                            imageid: tmp_pic, 
                            username: user.username, 
                            bio: user.bio
                        });
            }})
        }});

    return(tempArray.map((reportInformation=>{
        return(
                <Table.Row key={reportInformation.reportid} className='ss-reporttableitem-row'>
                    <Table.Cell width={14}>
                        <Image src={reportInformation.imageid} inline rounded size='small' className='ss-reporttableitem-image'/>
                        <Header as='h2' image className='ss-reporttableitem-header'>
                            <Header.Content style={{margin:'10px'}}>
                                {reportInformation.username}
                                <Header.Subheader>
                                    {reportInformation.bio}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button.Group vertical>  
                            <Button color='red' content='Delete Report' onClick={()=>{onReportDelete(reportInformation.reportid)}}/>
                            <BanModal userid={reportInformation.userid} reportid={reportInformation.reportid} trigger={<Button color='red' content='Ban Account'/>}/>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
    })));
}

const ReportTableAccount = () => {

    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
    const isCurrent = useRef(true);

    useEffect(()=>{
        return () => {
            console.log("Unmounted Account Table");
            isCurrent.current = false;
        };
    }, []);

    useEffect(()=>
    {
        axios.get(`/api/reports`).then((response)=>{
            setTimeout(()=>{
                if(isCurrent.current)
                {
                    setReports(response.data);
                }
            }, 1000);
        })
        axios.get(`/api/users`).then((response)=>{
            setTimeout(()=>{
                if(isCurrent.current)
                {
                    setUsers(response.data);
                }
            }, 1000);       
        })
    }, []);

    const renderedAccountReports = getReportedUser(users, reports);

    return (
        <div>
            <Table stackable basic='very' celled fixed>
                <thead>
                    {renderedAccountReports}
                </thead>
            </Table>
        </div>
    );
}

export default ReportTableAccount;