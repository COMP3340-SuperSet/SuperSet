import React from 'react';
import ReactDOM from 'react-dom';

import FileUpload from '../FileUpload';

function Edit() {
    return (
        <div>
            I am the Edit Component
            <FileUpload/>
        </div>
    );
}

export default Edit;

if (document.getElementById('edit')) {
    ReactDOM.render(<Edit />, document.getElementById('edit'));
}
