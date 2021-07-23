import React, { useEffect, useState } from 'react';
import { Card, Form, Segment } from "semantic-ui-react";
import ImageUploader from './ImageUploader';

const SetDetails = ({ set = null, updateSet = () => { }, setImagesEnt, setSetImagesEnt }) => {
  const [name, setName] = useState((set && set.name) ? set.name : '');
  const [description, setDescription] = useState((set && set.description) ? set.description : '');

  useEffect(() => {
    updateSet({
      ...set,
      name: name,
      description: description
    });
  }, [name, description]);

  useEffect(() => {
    if (set) {
      setName(set.name);
      setDescription(set.description);
    }
  }, [set]);

  function insertAsList(ent, setEnt, payloadList) {
    const tempEnt = { ...ent };

    payloadList.forEach(payload => {
      tempEnt.elements[tempEnt.count] = {
        id: tempEnt.count++,
        payload
      }
    });

    const tempCount = tempEnt.count - 1;

    setEnt(tempEnt);
    return tempCount;
  }

  function deleteEnt(ent, setEnt, hashid) {
      const tempEnt = {...ent};
      tempEnt.elements[hashid] = null;
      tempEnt.hash[hashid] = null;
      setEnt(tempEnt);
  }

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


  const onUploadImages = (files) => {
    insertAsList(setImagesEnt, setSetImagesEnt, files);
  }

  const onDeleteImage = (id) => {
    deleteEnt(setImagesEnt, setSetImagesEnt, id);
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
          <Form.Field style={{ marginTop: "12px" }}>
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
        <ImageUploader images={setImagesEnt.elements} updateImages={onUploadImages} onDeleteImage = {onDeleteImage} />
      </Card.Content>
    </Card>
  );
}

export default SetDetails;
