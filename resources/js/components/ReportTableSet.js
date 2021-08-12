import React, { useState, useEffect, useRef } from 'react';
import { Table, Header, Button, Popup, Statistic } from "semantic-ui-react";
import axios from "axios";


import BanModal from './BanModal';
import Confirmation from './Confirmation';

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

function getReportedSets(sets, reports) {
    const [deleted, setDeleted] = useState([]);

    let tempArray = [];

    reports.forEach(report => {
        if (report.type == 1) {
            sets.forEach(set => {
                if (report.resourceid == set.setid && !(deleted.find(elem => elem === report.reportid))) {
                    tempArray.push({
                        reportid: report.reportid,
                        setid: set.setid,
                        userid: set.userid,
                        name: set.name,
                        description: set.description
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
                        <Header as='h2'>
                            <Header.Content style={{ margin: '10px' }} className="ss-text-primary">
                                {reportInformation.name}
                                <Header.Subheader className="ss-text-secondary">
                                    {reportInformation.description ?? <p className="ss-text-light">No description</p>}
                                </Header.Subheader>
                                <Header.Subheader>
                                    <Popup
                                        content='View entire set'
                                        position='bottom center'
                                        trigger={
                                            <Button style={{ marginTop: "12px" }} onClick={() => {
                                                redirect('/set', [{ key: "id", value: reportInformation.setid }]);
                                            }}>Go to set</Button>}
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
                                />}
                            onConfirm={() => {
                                onReportDelete(reportInformation.reportid);
                                setDeleted([reportInformation.reportid, ...deleted]);
                            }}
                            text="Remove this report?" />
                        <BanModal userid={reportInformation.userid}
                            reportid={reportInformation.reportid}
                            trigger={
                                <Popup
                                content='Remove from database'
                                position='bottom center'
                                trigger={<Button color='red' content='Ban Account' />}
                                />}
                            onBan={() => {
                                setDeleted([reportInformation.reportid, ...deleted]);
                            }} />
                    </Table.Cell>
                </Table.Row>
            );
        })));
    }
    else {
        return <tr><td className="ss-text-light" style={{ textAlign: "center" }}>No reports</td></tr>;
    }
}

const ReportTableSet = () => {

    const [reports, setReports] = useState([]);
    const [sets, setSets] = useState([]);
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

        axios.get(`/api/sets`).then((response) => {
            setTimeout(() => {
                if (isCurrent.current) {
                    setSets(response.data);
                }
            }, 1000);
        }).catch(() => {
            toast("Error fetching sets from server", "error");
        });
    }, []);

    const renderedSetReports = getReportedSets(sets, reports);
    return (
        <div>
            <Statistic horizontal size='mini' label="Set Reports" value={renderedSetReports.length} />
            <hr/>
            <Table stackable basic='very' celled fixed>
                <Table.Body>
                    {renderedSetReports}
                </Table.Body>
            </Table>
        </div>
    );
}

export default ReportTableSet;
