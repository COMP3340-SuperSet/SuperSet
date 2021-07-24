import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Grid, Segment } from 'semantic-ui-react';
import ImageUploader from './ImageUploader';

const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');

  const [images, setImages] = useState([]);

  const [suggestedImages, setSuggestedImages] = useState([]);
  const [selectedSuggestedImages, setSelectedSuggestedImages] = useState([]);

  useEffect(() => {
    if (!selectedItem) {
      clearForm();
      return;
    };

    if (selectedItem.name) setName(selectedItem.name);
    if (selectedItem.description) setDescription(selectedItem.description);
  }, [selectedItem]);

  const onSubmitItemImages = () => {
    // if (selectedItem && "id" in selectedItem) insertItemImages(itemImagesEnt, setItemImagesEnt, selectedItem.id, images);
    // else {
    //   //insert new item images
    // }
  }

  const onDeleteItemImages = (id) => {
    //deleteEnt(itemImagesEnt, setItemImagesEnt, id);
  }

  const onUploadImages = (files) => {
    // console.log("Item files:", files);
    // insertAsList(images, setImages, files);
  }

  const onDeleteImage = (id) => {
    //deleteEnt(images, setImages, id);
  }

  //when the 'clear' button is clicked, clear the form
  const clearForm = () => {
    setName('');
    setDescription('');
    setSelectedItem(null);
    //setImages(ent);
  }

  const onSubmit = () => {
    const tempItem = {...tempItem};
    tempItem.name = name;
    tempItem.description = description;

    onSubmitItem(tempItem);
    clearForm();
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
          <ImageUploader inputid="itemInput" images={images.elements} updateImages={onUploadImages} onDeleteImage={onDeleteImage} />
        </Form.Field>
        <Button basic onClick={() => clearForm()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save</Button>
      </Form>
    </div >
  );
}

export default EditItemForm
