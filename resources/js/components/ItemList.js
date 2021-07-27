import React from 'react';
import { List, Button, Icon } from "semantic-ui-react";

const ItemList = ({ items, onSelectItem, onDeleteItem }) => {

  const onEdit = (item) => {
    //console.log('clicked', item);
    onSelectItem(item);
  }


  const onDelete = (item) => {
    //console.log('deleting ', item);
    onDeleteItem(item);
  }

  let renderedList;
  if (!items.length) {
    renderedList = (
      <List.Item
        style={{ textAlign: 'center' }}
      >
        <List.Content >
          <List.Header>
            This set has no Items
          </List.Header>
        </List.Content>
      </List.Item>
    );
  }
  else renderedList = items.map(item => {
    return (
      // <Table.Cell textAlign="center"><Button icon onClick={() => { onEdit(item) }}><Icon name="edit"></Icon></Button></Table.Cell>
      // <Table.Cell textAlign="center"><Button icon onClick={() => { onDelete(item) }}><Icon name="trash"></Icon></Button></Table.Cell>
      <List.Item
        className="hoverable"
        key={item.name}
      >
        <List.Content floated='right'>
          <Button icon onClick={() => { onEdit(item) }}><Icon name="edit"></Icon></Button>
          <Button icon onClick={() => { onDelete(item) }}><Icon name="trash"></Icon></Button>
        </List.Content>
        <List.Content>
          <List.Header as='a'>{item.name}</List.Header>
          <List.Description>
            {item.description}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  });

  return (
    <List divided>
      {renderedList}
    </List>
  );
}

export default ItemList;

