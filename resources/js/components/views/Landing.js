import React from 'react';
import ReactDOM from 'react-dom';

function Landing() {
    return (
        <div>
            I am the Landing Component
        </div>
    );
}

export default Landing;

if (document.getElementById('landing')) {
    ReactDOM.render(<Landing />, document.getElementById('landing'));
}
