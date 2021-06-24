import React from "react";
import { Table } from 'semantic-ui-react';

const SetCell = (props) => {
    return (
        <Table.Row>
            <Table.Cell textAlign = "center">{props.count}</Table.Cell>
            <Table.Cell textAlign = "center">{props.name}</Table.Cell>
            <Table.Cell textAlign = "center">{props.description}</Table.Cell>
        </Table.Row>
    );
}

export default SetCell;