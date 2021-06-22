import React from 'react';
import ReactDOM from 'react-dom';

function Set() {
    return (
        <div>
            I am the Set Component
        </div>
    );
}

export default Set;

if (document.getElementById('set')) {
    ReactDOM.render(<Set />, document.getElementById('set'));
}
