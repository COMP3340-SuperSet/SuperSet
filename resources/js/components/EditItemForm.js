import { Button, Card, Form, Input, Label, Segment, Rail, Divider } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';

const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.name) {
        setName(selectedItem.name);
      }
      if (selectedItem.description) {
        setDescription(selectedItem.description);
      }
    } else {
      setName('');
      setDescription('');
    }
  }, [selectedItem]);

  const onSubmit = () => {
    const tempItem = {
      name,
      description
    };
    setName('');
    setDescription('');
    onSubmitItem(tempItem);
  }

  const onClear = () => {
    setName('');
    setDescription('');
    setSelectedItem(null);
  }

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="name"
          ></input>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="description"
          ></input>
        </Form.Field>
        <Form.Field>
          <label>Images</label>
        </Form.Field>
        <Divider/>
        <Button basic onClick={() => onClear()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save</Button>
      </Form>
    </div>
  );
}

export default EditItemForm
