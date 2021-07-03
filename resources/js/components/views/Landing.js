import React from 'react';
import ReactDOM from 'react-dom';
import InstructionsCarousel from '../InstructionsCarousel';

function Landing() {
    return (
        <div>
            <InstructionsCarousel images={[]}/>
        </div>
    );
}

export default Landing;

if (document.getElementById('landing')) {
    ReactDOM.render(<Landing />, document.getElementById('landing'));
}
