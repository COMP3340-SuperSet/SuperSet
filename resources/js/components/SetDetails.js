import React, { useState } from 'react';
import { Card, Form } from "semantic-ui-react";

const SetDetails = ({ set }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onChangeDescription = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
    const desc = document.getElementById('set-description');

    // Reset field height
    desc.style.height = 'inherit';

    // Get the computed styles for the element
    var computed = window.getComputedStyle(desc);

    // Calculate the height
    var height
      = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + desc.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    desc.style.height = height + 'px';
  }

  return (
    <Card fluid>
      <Card.Content>
        <Form size="massive">
          <Form.Field>
            <input
              style={{ border: 'none', margin: 'none', padding: '0.25rem' }}
              value={name}
              maxLength="60"
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            ></input>
          </Form.Field>
        </Form>
        <Form>
          <Form.Field>
            <textarea
              style={{ border: 'none', resize: 'none', overflow: 'hidden', margin: 'none', padding: '0.25rem' }}
              spellCheck="false"
              id="set-description"
              maxLength="2048"
              rows="1"
              value={description}
              onChange={e => onChangeDescription(e)}
              placeholder="Description (optional)"
            ></textarea>
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
  );
}

export default SetDetails;
