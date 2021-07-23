import React, { useEffect, useState } from 'react';
import { Card, Form, Segment } from "semantic-ui-react";

const SetDetails = ({ set = null, updateSet = () => {}, imageList = null, updateImageList = () => {} }) => {
  const [name, setName] = useState((set && set.name) ? set.name : '');
  const [description, setDescription] = useState((set && set.description) ? set.description : '');

  const [images, setImages] = useState((imageList) ? imageList : []);

  useEffect(() => {
    updateSet({
      ...set,
      name: name,
      description: description
    });
  }, [name, description]);

  useEffect(() => {
    if (set){
      setName(set.name);
      setDescription(set.description);
    }
  }, [set]);

  useEffect(() => {
    updateImageList(
      //image data
      null
    );
  }, [images]);

  useEffect(() => {
    if (imageList){
      setImages(imageList);
    }
  }, [imageList]);

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

  let renderedImages = images.map((image, index) => {
    const url = URL.createObjectURL(image);
    return (
      <Grid.Column className="image-wrapper" key={index} style={{ padding: '0.25rem' }}>
        <Image bordered
          className="grid-image"
          src={url}
          onClick={() => setSelectedImage(url)} />
      </Grid.Column>
    );
  });
  
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
          <Form.Field style = {{marginTop: "12px"}}>
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
        <Segment style = {{marginTop: "12px"}}>
          { (images && images.length > 0) ?
              <Grid centered stackable doubling
                columns="6"
                style={{ margin: '0.25rem' }}>
                {renderedImages}
              </Grid> :
              <p>No Images on display</p>}
        </Segment>
      </Card.Content>
    </Card>
  );
}

export default SetDetails;
