import React from "react";
import { Table } from 'semantic-ui-react';

const SetCell = ({count = 1, name, description}) => {
    return (
        <Table.Row>
            <Table.Cell textAlign = "center">{count}</Table.Cell>
            <Table.Cell textAlign = "center">{name}</Table.Cell>
            <Table.Cell textAlign = "center">{description}</Table.Cell>
        </Table.Row>
    );
}

export default SetCell;