import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Grid, Segment } from 'semantic-ui-react';
import ImageUploader from './ImageUploader';

const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem, itemImages, setItemImages }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');
  const [hashid, setHashid] = useState(selectedItem && selectedItem.hashid ? selectedItem.hashid : null);

  const [images, setImages] = useState([]);

  const [suggestedImages, setSuggestedImages] = useState([]);
  const [selectedSuggestedImages, setSelectedSuggestedImages] = useState([]);

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.name) {
        setName(selectedItem.name);
      }
      if (selectedItem.description) {
        setDescription(selectedItem.description);
      }
      if (selectedItem.hashid) {
        setHashid(selectedItem.hashid);
        setImages(itemImages.filter(image => image.hashid == selectedItem.hashid));
      }
    } else {
      setName('');
      setDescription('');
      setImages([]);
      setHashid(null);
    }
  }, [selectedItem]);

  useEffect(() => { 
    //console.log("Item images: ", images);
  }, [images]);

  //when the 'clear' button is clicked, clear the form
  const onClear = () => {
    setName('');
    setDescription('');
    setHashid(null);
    setSelectedItem(null);
    setImages([]);
  }

  const onSubmit = () => {
    const tempItem = {
      hashid,
      name,
      description
    };
    setName('');
    setDescription('');
    setHashid(null);

    onSubmitItem(tempItem, images);
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
          <textarea
            rows='2'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="description"
          ></textarea>
        </Form.Field>
        <Form.Field>
          <label>Images</label>
          <ImageUploader images={images} updateImages={setImages} />
        </Form.Field>
        <Button basic onClick={() => onClear()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save</Button>
      </Form>
    </div >
  );
}

export default EditItemForm
