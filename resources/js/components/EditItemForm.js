import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Grid, Segment } from 'semantic-ui-react';
import ImageOverlay from './ImageOverlay';

const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');
  const [images, setImages] = useState([]);
  const [suggestedImages, setSuggestedImages] = useState([]);
  const [selectedSuggestedImages, setSelectedSuggestedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  //rerender when the image list changes
  useEffect(() => { }, [images]);

  //when the 'clear' button is clicked, clear the form
  const onClear = () => {
    setName('');
    setDescription('');
    setSelectedItem(null);
  }

  //when the user presses the 'ok' button in the file browse window
  const onFileChange = (event) => {
    setImages([...images, ...event.target.files]);
  }

  const onSubmit = () => {
    const tempItem = {
      name,
      description
    };
    setName('');
    setDescription('');
    onSubmitItem(tempItem);
  }

  const onClickAddFiles = () => {
    document.getElementById('file').click();
  }

  const renderedImages = images.map((image, index) => {
    const url = URL.createObjectURL(image);
    return (
      <Grid.Column className="image-wrapper" key={index} style={{ padding: '0.25rem' }}>
        <Image bordered
          className="grid-image"
          src={url}
          onClick={() => setSelectedImage(url)} />
        <Button fluid size='mini'>Mini</Button>
      </Grid.Column>
    );
  });

  renderedImages += suggestedImages.map((image, index) => {
    //custom logic for recommended images
  });

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
          <Segment style={{ boxShadow: 'none', display: 'flex', alignItems: 'center', margin: 'none', padding: 'none' }}>
            <Button basic onClick={() => onClickAddFiles()}>Add</Button>
            {
              images && images.length
                ? <p>{images.length} Images Selected</p>
                : <p>No Images Selected</p>
            }
          </Segment>
          <input multiple hidden
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={(e) => onFileChange(e)} />
          {
            images && images.length
              ?
              <Grid centered stackable doubling
                columns="6"
                style={{ margin: '0.25rem' }}>
                {renderedImages}
              </Grid>
              :
              null
          }
        </Form.Field>
        <Button basic onClick={() => onClear()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save</Button>
      </Form>
      <ImageOverlay imageURL={selectedImage} setImageURL={setSelectedImage} />
    </div >
  );
}

export default EditItemForm
