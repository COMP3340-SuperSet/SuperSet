import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import FileUpload from '../FileUpload';

function Edit() {
    const [userid, setUserid] = useState('');
    const [setid, setSetid] = useState('');
    const [itemid, setItemid] = useState('');

    return (
        <div>
            Upload User Profile Image
            <input type="number" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder='UserID'></input>
            <FileUpload fileUploadURL={`/api/user/${userid}/image`}/><br/>

            Upload Set Image
            <input type="number" value={setid} onChange={(e) => setSetid(e.target.value)} placeholder='SetID'></input>
            <FileUpload fileUploadURL={`/api/setImages/${setid}`}/><br/>

            Upload Item Image
            <input type="number" value={itemid} onChange={(e) => setItemid(e.target.value)} placeholder='ItemID'></input>
            <FileUpload fileUploadURL={`/api/itemImages/${itemid}`}/><br/>
        </div>
    );
}

export default Edit;

if (document.getElementById('edit')) {
    ReactDOM.render(<Edit />, document.getElementById('edit'));
}
