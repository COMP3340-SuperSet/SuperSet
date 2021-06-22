import React from 'react';
import ReactDOM from 'react-dom';

function Admin() {
    return (
        <div>
            I am the Admin Component
        </div>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
