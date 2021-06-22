import React from 'react';
import ReactDOM from 'react-dom';

function Item() {
    return (
        <div>
            I am the Item Component
        </div>
    );
}

export default Item;

if (document.getElementById('item')) {
    ReactDOM.render(<Item />, document.getElementById('item'));
}
