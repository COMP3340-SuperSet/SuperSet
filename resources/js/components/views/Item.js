import React from 'react';
import ReactDOM from 'react-dom';

const Item = () => {
    return (
        <div>
            Empty Component
        </div>
    );
}

export default Item;

if (document.getElementById('item')) {
    ReactDOM.render(<Item />, document.getElementById('item'));
}
