import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Header from '../Header';
import FeedbackForm from '../FeedbackForm';
import Toast from '../Toast';

function Feedback() {
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
            <FeedbackForm />
            <Toast />
        </div>
    );
}

export default Feedback;

if (document.getElementById('feedback')) {
    ReactDOM.render(<Feedback />, document.getElementById('feedback'));
}
