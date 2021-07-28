import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from "../Header";
import InstructionsCarousel from '../InstructionsCarousel';

import gif1 from "../../../images/landing_gif1.gif";
import gif2 from "../../../images/landing_gif2.gif";
import gif3 from "../../../images/landing_gif3.gif";

function Landing() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get("/api/check").then((response) => {
            setCurrentUser(response.data.user);
        });
    }, []);

    useEffect(() => { }, [currentUser]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <InstructionsCarousel images={[gif1, gif2, gif3]} />
        </div>
    );
}

export default Landing;

if (document.getElementById('landing')) {
    ReactDOM.render(<Landing />, document.getElementById('landing'));
}
