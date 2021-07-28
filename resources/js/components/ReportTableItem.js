import React, { useState, useEffect, useRef } from 'react';
import { Table, Header, Button, Popup } from "semantic-ui-react";
import axios from "axios";

import BanModal from './BanModal';
import Confirmation from './Confirmation';

import { redirect } from '../utils/redirect';
import { toast } from './Toast';

function onReportDelete(reportid) {
    axios.post('/api/delete/report', { reportid }).then(response => {
        toast("Report deleted!", "success");
    }).catch(err => {
        console.log(err);
        toast("Error deleting report", "error");
    });
}

function getReportedItems(items, reports) {
    const [deleted, setDeleted] = useState([]);

    let tempArray = [];

    reports.forEach(report => {
        if (report.type == 2) {
            items.forEach(item => {
                if (report.resourceid == item.itemid && !(deleted.find(elem => elem === report.reportid))) {
                    tempArray.push({
                        reportid: report.reportid,
                        userid: report.resourceid,
                        setid: item.setid,
                        itemid: item.itemid,
                        name: item.name,
                        description: item.description
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
                        <Header as='h2' >
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
                        <BanModal userid={reportInformation.userid} item_setid = {reportInformation.setid}
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

const ReportTableItem = () => {

    const [reports, setReports] = useState([]);
    const [items, setItems] = useState([]);
    const [sets, setSets] = useState([]);
    const isCurrent = useRef(true);

    useEffect(() => {
        return () => {
            //console.log("Unmounted Item Table");
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
        })

        axios.get(`/api/items`).then((response) => {
            setTimeout(() => {
                if (isCurrent.current) {
                    setItems(response.data);
                }
            }, 1000);
        })
    }, []);

    const renderedItemReports = getReportedItems(items, reports);

    return (
        <div>
            <Table stackable basic='very' celled fixed>
                <Table.Body>
                    {renderedItemReports}
                </Table.Body>
            </Table>
        </div>
    );
}

export default ReportTableItem;
