import React, { useState, useEffect, useRef } from 'react';
import { Table, Image, Header, Button, Popup } from "semantic-ui-react";
import axios from "axios";

import BanModal from './BanModal';
import Confirmation from './Confirmation';

import { getImagePath } from "../utils/imagePath";

import tmp_pic from "../../images/pfp_placeholder.png";
import { redirect } from '../utils/redirect';
import { toast } from './Toast';

function onReportDelete(reportid) {
    axios.post('/api/delete/report', { reportid }).then(response => {
        toast("Report deleted!", "success");
    }).catch(err => {
        console.error(err);
        toast("Error deleting report", "error");
    });
}

function getReportedUser(users, reports) {
    const [deleted, setDeleted] = useState([]);

    let tempArray = [];

    reports.forEach(report => {
        if (report.type == 0) {
            users.forEach(user => {
                if (report.resourceid == user.userid && !(deleted.find(elem => elem === report.reportid))) {
                    tempArray.push(
                        {
                            reportid: report.reportid,
                            userid: user.userid,
                            imageid: user.imageid,
                            username: user.username,
                            bio: user.bio
                        });
                }
            })
        }
    });

    if (tempArray.length > 0) {
        return (tempArray.map((reportInformation => {
            return (
                <Table.Row key={reportInformation.reportid}>
                    <Table.Cell width={14}>
                        <Image src={reportInformation.imageid ? getImagePath('user', reportInformation.imageid) : tmp_pic}
                            circular
                            size='small'
                            style={{ margin: "20px", display: "inline-block" }} />
                        <Header image>
                            <Header.Content style={{ margin: '10px', marginTop: "0" }} className="ss-text-primary">
                                <h2>{reportInformation.username}</h2>
                                <Header.Subheader className="ss-text-secondary">
                                    {reportInformation.bio ?? <span className="ss-text-light">No bio</span>}
                                </Header.Subheader>
                                <Header.Subheader>
                                    <Popup
                                    content='View entire profile'
                                    position='bottom center'
                                    trigger={
                                        <Button style={{ marginTop: "12px" }} onClick={() => {
                                            redirect('/user', [{ key: "id", value: reportInformation.userid }]);
                                        }}>
                                            Go to profile
                                        </Button>}
                                    />
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Confirmation style={{ marginBottom: "14px" }}
                            trigger={
                                <Popup
                                content='Remove from database'
                                position='top center'
                                trigger={<Button color='red' content='Delete Report' />}
                                />
                            }
                            onConfirm={() => {
                                onReportDelete(reportInformation.reportid);
                                setDeleted([reportInformation.reportid, ...deleted]);
                            }}
                            text="Remove this report?"
                        />
                        <BanModal userid={reportInformation.userid}
                            reportid={reportInformation.reportid}
                            trigger={
                                <Popup
                                content='Remove from database'
                                position='bottom center'
                                trigger={<Button color='red' content='Ban Account' />}
                                />
                            }
                            onBan = {() => {
                                setDeleted([reportInformation.reportid, ...deleted]);
                            }} />
                    </Table.Cell>
                </Table.Row>
            );
        })));
    }
    else {
        return <tr><td colSpan="2" className="ss-text-light" style={{ textAlign: "center" }}>No reports</td></tr>;
    }
}

const ReportTableAccount = () => {

    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
    const isCurrent = useRef(true);

    useEffect(() => {
        return () => {

            isCurrent.current = false;
        };
    }, []);

    useEffect(() => {
        axios.get(`/api/reports`).then((response) => {
            setTimeout(() => {
                if (isCurrent.current) {
                    setReports(response.data);
                }
            }, 1000);
        }).catch(() => {
            toast("Error fetching reports from server", "error");
        });
        axios.get(`/api/users`).then((response) => {
            setTimeout(() => {
                if (isCurrent.current) {
                    setUsers(response.data);
                }
            }, 1000);
        }).catch(() => {
            toast("Error fetching users from server", "error");
        });
    }, []);

    const renderedAccountReports = getReportedUser(users, reports);

    return (
        <div>
            <Table stackable basic='very' celled fixed>
                <Table.Body>
                    {renderedAccountReports}
                </Table.Body>
            </Table>
        </div>
    );
}

export default ReportTableAccount;