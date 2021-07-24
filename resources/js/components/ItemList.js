import React from 'react';
import { List, Button, Icon } from "semantic-ui-react";

const ItemList = ({ items, onSelectItem, onDeleteItem }) => {
  const [items_db, items_new] = [items[0], items[1]];

  let renderedList;
  if (!(items_db.length + items_new.length)) {
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

  else renderedList = [...items_db, ...items_new].map(item => {
    if (!item) return;
    return (
      <List.Item
        className="hoverable"
        key={item.name} >
        <List.Content floated='right'>
          <Button icon onClick={() => onSelectItem(item) }><Icon name="edit"></Icon></Button>
          <Button icon onClick={() => onDeleteItem(item) }><Icon name="trash"></Icon></Button>
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

