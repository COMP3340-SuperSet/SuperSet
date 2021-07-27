import React, { useState, useEffect, useRef } from 'react';
import { Table, Image, Header, Button } from "semantic-ui-react";
import axios from "axios";

import BanModal from './BanModal';

import tmp_pic from "../../images/pfp_placeholder.png";

function onReportDelete(reportid) {
    axios.post('/api/delete/report', { reportid }).then(response => { }).catch(err => console.log(err));
}

function getReportedSets(sets, reports) {

    let tempArray = [];

    reports.forEach(report => {
        if (report.type == 1) {
            sets.forEach(set => {
                if (report.resourceid == set.setid) {
                    tempArray.push({ reportid: report.reportid, setid: set.setid, userid: set.userid, name: set.name, description: set.description });
                }
            })
        }
    });

    if (tempArray.length > 0) {
        return (tempArray.map((reportInformation => {
            return (
                <Table.Row key={reportInformation.reportid}>
                    <Table.Cell width={14}>
                        <Image src={tmp_pic} inline rounded size='small' style = {{margin: "20px"}}  />
                        <Header as='h2' image>
                            <Header.Content style={{ margin: '10px' }} className = "ss-text-primary">
                                {reportInformation.name}
                                <Header.Subheader className = "ss-text-secondary">
                                    {reportInformation.description ?? <p className = "ss-text-light">No description</p>}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button.Group vertical>
                            <Button color='red' content='Delete Report' onClick={() => { onReportDelete(reportInformation.reportid) }} />
                            <BanModal userid={reportInformation.userid} reportid={reportInformation.reportid} trigger={<Button color='red' content='Ban Account' />} />
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
        })));
    }
    else {
        return <p className="ss-text-light" style={{ textAlign: "center" }}>No reports</p>;
    }
}

const ReportTableSet = () => {

    const [reports, setReports] = useState([]);
    const [sets, setSets] = useState([]);
    const isCurrent = useRef(true);

    useEffect(() => {
        return () => {
            console.log("Unmounted Set Table");
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

        axios.get(`/api/sets`).then((response) => {
            setTimeout(() => {
                if (isCurrent.current) {
                    setSets(response.data);
                }
            }, 1000);
        })
    }, []);

    const renderedSetReports = getReportedSets(sets, reports);

    return (
        <div>
            <Table stackable basic='very' celled fixed>
                <thead>
                    {renderedSetReports}
                </thead>
            </Table>
        </div>
    );
}

export default ReportTableSet;
