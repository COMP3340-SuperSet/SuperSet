import React, { useState, useEffect } from 'react';
import { Button, Form, Divider, Image, Grid, Segment } from 'semantic-ui-react';

const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');
  const [images, setImages] = useState([]);

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

  useEffect(() => {
  }, [images]);


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

  const onFileChange = (event) => {
    const formData = new FormData();
    const files = [...event.target.files];

    const tempImages = files.map(image => URL.createObjectURL(image));
    setImages([...tempImages]);
    formData.append('images', tempImages);
  }

  const onAddClick = (event) => {
    event.preventDefault();
    document.getElementById('file').click();
  }

  const renderedImages = images.map((url, index) => {
    return (
      <Grid.Column key={index} style={{ padding: '0.25rem' }}>
        <Image src={url} />
      </Grid.Column>
    );
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
            <Button basic onClick={e => onAddClick(e)}>Add</Button>
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
              <Grid style={{ margin: '0.25rem' }}>
                <Grid.Row columns={6}>
                  {renderedImages}
                </Grid.Row>
              </Grid>
              :
              null
          }

        </Form.Field>
        <Button basic onClick={() => onClear()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save</Button>
      </Form>
    </div >
  );
}

export default EditItemForm
