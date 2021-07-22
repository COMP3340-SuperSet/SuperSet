import React from 'react';
import { Table } from "semantic-ui-react";
import AdminCarousel from './AdminCarousel';
import "../../css/AdminInstructions.css";

const AdminInstructions = () => {
    return (
        <div className="ss-admininstructions-div">
            <Table stackable basic='very' celled fixed>
                <Table.Row verticaalign='middle' className='ss-reporttableitem-row'>
                    <Table.Cell verticalalign="middle" textAlign='center' width={14}>
                        <div className="ss-admininstructions-innerdiv">
                            <AdminCarousel images={[]} />
                        </div>
                    </Table.Cell>
                </Table.Row>
            </Table>
        </div>
    );
}

export default AdminInstructions;