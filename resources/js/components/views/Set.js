import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import SetView from '../SetView';

function Set() {
    return (
        <div>
            <Header />
            <SetView />
        </div>
    );
}

export default Set;

if (document.getElementById('set')) {
    ReactDOM.render(<Set />, document.getElementById('set'));
}
