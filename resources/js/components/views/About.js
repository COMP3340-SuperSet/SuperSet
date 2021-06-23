import React from 'react';
import ReactDOM from 'react-dom';

function About() {
    return (
        <div>
            I am the About Component
        </div>
    );
}

export default About;

if (document.getElementById('about')) {
    ReactDOM.render(<About />, document.getElementById('about'));
}
