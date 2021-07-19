import React from 'react';
import { Card, Item, Button, Icon } from "semantic-ui-react";

// have trash can button invoke "Are you sure?" pop up
const SetDetails = ({ set }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {set && set.name ? set.name : 'Set Name'}
        </Card.Header>
        <Card.Description>
          {set && set.description ? set.description : 'Set Description'}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default SetDetails;
