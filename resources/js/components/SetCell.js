import React from "react";
import { Table } from 'semantic-ui-react';
import { redirect } from "../utils/redirect";

/* handle page transfer to view set of inputted id using onClick = {} within Table.Row tag*/
const SetCell = ({ id, count = 1, name, description }) => {
    return (
        <Table.Row className="hoverable" onClick={() => { redirect("/set", [{ key: "id", value: id }]) }}>
            <Table.Cell textAlign="center">{count}</Table.Cell>
            <Table.Cell textAlign="center">{name}</Table.Cell>
            <Table.Cell textAlign="center">{description}</Table.Cell>
        </Table.Row>
    );
}

export default SetCell;