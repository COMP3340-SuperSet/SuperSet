import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Grid, Segment } from 'semantic-ui-react';
import ImageUploader from './ImageUploader';

const Hash = {
  init: () => {
    this.elements = {};
    this.ref = {};
    this.count = 0;
    return this;
  },

  read: () => {
    return this;
  },

  encode: (id, elem) => {
    this.ref[this.count] = id;
    const tempElem = { ...elem };
    tempElem.id = this.count;
    this.elements[this.count++] = tempElem;
  },

  insert: (elem) => {
    const tempElem = { ...elem };
    tempElem.id = this.count;
    this.elements[this.count++] = tempElem;
  }
};

const ent = {
  elements: [],
  count: 0,
  hash: []
};


const EditItemForm = ({ selectedItem, setSelectedItem, onSubmitItem, itemImagesEnt, setItemImagesEnt }) => {
  const [name, setName] = useState(selectedItem && selectedItem.name ? selectedItem.name : '');
  const [description, setDescription] = useState(selectedItem && selectedItem.description ? selectedItem.description : '');

  const [images, setImages] = useState(ent);

  const [suggestedImages, setSuggestedImages] = useState([]);
  const [selectedSuggestedImages, setSelectedSuggestedImages] = useState([]);

  //const [hashes, setHashes] = useState(Hash.init());

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.name) {
        setName(selectedItem.name);
      }
      if (selectedItem.description) {
        setDescription(selectedItem.description);
      }
      if (selectedItem.id && itemImagesEnt) {
        setImages(insertAsList(images, setImages, itemImagesEnt.elements.filter(elem => elem.id === selectedItem.id)));
        //setImages(ent);
      }
    } else {
      setName('');
      setDescription('');
      setImages(ent);
    }
  }, [selectedItem]);

  //useEffect(() => {
  //  console.log("Hashes: ",hashes);
  //}, [hashes]);

  useEffect(() => {
    //console.log("Item images: ", images);
  }, [images]);

  function insertItemImages(ent, setEnt, itemid, files) {
    const tempEnt = { ...ent };

    tempEnt.elements = tempEnt.elements.filter(elem => elem.id !== id);

    files.forEach(file => {
      tempEnt.elements[tempEnt.count] = {
        id: tempEnt.count++,
        payload: {
          itemid,
          file
        }
      }
    });

    const tempCount = tempEnt.count - 1;

    setEnt(tempEnt);
    return tempCount;
  }

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
    //console.log("Deleting:", ent);
    const tempEnt = { ...ent };
    tempEnt.elements[hashid] = null;
    tempEnt.hash[hashid] = null;
    setEnt(tempEnt);
  }

  const onSubmitItemImages = () => {
    if (selectedItem && "id" in selectedItem) insertItemImages(itemImagesEnt, setItemImagesEnt, selectedItem.id, images);
    else {
      //insert new item images
    }
  }

  const onDeleteItemImages = (id) => {
    //deleteEnt(itemImagesEnt, setItemImagesEnt, id);
  }

  const onUploadImages = (files) => {
    console.log("Item files:", files);
    insertAsList(images, setImages, files);
  }

  const onDeleteImage = (id) => {
    deleteEnt(images, setImages, id);
  }

  //when the 'clear' button is clicked, clear the form
  const onClear = () => {
    setName('');
    setDescription('');
    setSelectedItem(null);
    setImages(ent);
  }

  const onSubmit = () => {
    const tempItem = {
      name,
      description
    };
    if (selectedItem && "id" in selectedItem) {
      tempItem["id"] = selectedItem.id;
    }
    onSubmitItem(tempItem);
    onSubmitItemImages();

    onClear();
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
        <Button basic onClick={() => onClear()}>Clear</Button>
        <Button floated="right" primary onClick={() => onSubmit()}>Save</Button>
      </Form>
    </div >
  );
}

export default EditItemForm
