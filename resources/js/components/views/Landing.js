import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import InstructionsCarousel from '../InstructionsCarousel';

function Landing() {
    return (
        <div>
            <Header />
            <InstructionsCarousel />
        </div>
    );
}

export default Landing;

if (document.getElementById('landing')) {
    ReactDOM.render(<Landing />, document.getElementById('landing'));
}
