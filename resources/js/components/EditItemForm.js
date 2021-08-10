import React, { useState, useEffect } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import ImageList from './ImageList';
import ImageUploader from './ImageUploader';
import SuggestedImages from './SuggestedImages';
import ErrorMessage from './ErrorMessage';

const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');
  const [itemImages_db, setItemImages_db] = useState(selectedItem && selectedItem.images_db ? selectedItem.images_db : []);
  const [itemImages_new, setItemImages_new] = useState(selectedItem && selectedItem.images_new ? selectedItem.images_new : []);

  const [errors, setErrors] = useState('');

  useEffect(() => { }, [itemImages_db, itemImages_new]);
  const [suggestedImages, setSuggestedImages] = useState([]);
  const [selectedSuggestedImages, setSelectedSuggestedImages] = useState([]);

  useEffect(() => {
    if (!selectedItem) {
      clearForm();
      return;
    };

    if (selectedItem.name) setName(selectedItem.name);
    if (selectedItem.description) setDescription(selectedItem.description);
    if (selectedItem.images_db) setItemImages_db(selectedItem.images_db);
    if (selectedItem.images_new) setItemImages_new(selectedItem.images_new);
  }, [selectedItem]);

  const uploadItemImages = (files) => {
    setItemImages_new([...itemImages_new, ...files]);
  }

  const onSelectUnsplashImage = (urls) => {
    //downsize here
    urls.download += "&w=500&fit=cover";
    setItemImages_new([...itemImages_new, { urls }]);
  }

  const deleteItemImage = (index) => {
    let temp;
    if (index < itemImages_db.length) {
      temp = [...itemImages_db];
      temp.splice(index, 1);
      setItemImages_db(temp);
      return;
    }

    if (index < itemImages_db.length + itemImages_new.length) {
      index -= itemImages_db.length;
      temp = [...itemImages_new];
      temp.splice(index, 1);
      setItemImages_new(temp);
      return;
    }
  }

  //when the 'clear' button is clicked, clear the form
  const clearForm = () => {
    setName('');
    setDescription('');
    setSelectedItem(null);
    setItemImages_db([]);
    setItemImages_new([]);
    //setImages(ent);
  }

  const onSubmit = () => {
    if (!name) {
      setErrors("Item Name is required.");
      return;
    } else if (name.length < 3) {
      setErrors("Item Name must be at least 3 characters.");
      return;
    } else {
      setErrors('');
    }
    const temp = { ...selectedItem };
    temp.name = name;
    temp.description = description;
    temp.images_db = itemImages_db;
    temp.images_new = itemImages_new;
    onSubmitItem(temp);
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
          <ImageUploader onUploadImages={uploadItemImages} imageCount={itemImages_db.length + itemImages_new.length} formID="item-image-uploader" />
          <SuggestedImages term={name} onSelectImage={onSelectUnsplashImage} />
        </Form.Field>
        <ImageList images={[...itemImages_db, ...itemImages_new]} onDeleteImage={deleteItemImage} />
        <Button basic onClick={() => clearForm()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save Item</Button>
      </Form>
      {errors ?
        <Message negative style={{ margin: "0.5em 0", padding: "0.5em" }}>
          <p>{errors}</p>
        </Message>
        : null
      }

    </div >
  );
}

export default EditItemForm
