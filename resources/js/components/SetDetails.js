import React, { useEffect, useState } from 'react';
import { Card, Form } from "semantic-ui-react";
import ImageList from './ImageList';
import ImageUploader from './ImageUploader';
import SuggestedImages from './SuggestedImages';

const SetDetails = ({ set, updateSet, onUploadImages, onSelectUnsplashImage, onDeleteImage, images }) => {
  const images_merged = [...images[0], ...images[1]];
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
    if (!set) return;
    if (set.name) setName(set.name);
    if (set.description) setDescription(set.description);
  }, [set]);

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
        <ImageUploader onUploadImages={onUploadImages} formID="set-image-uploader" imageCount={images_merged.length} />
        <SuggestedImages term={name} onSelectImage={onSelectUnsplashImage} />
        <ImageList images={images_merged} onDeleteImage={onDeleteImage} />
      </Card.Content>
    </Card>
  );
}

export default SetDetails;
