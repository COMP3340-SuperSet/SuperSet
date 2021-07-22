import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import FeedbackForm from '../FeedbackForm';
import Toast from '../Toast';

function Feedback() {

    return (
        <div>
            <Header currentUser={null} />
            <FeedbackForm />
            <Toast />
        </div>
    );
}

export default Feedback;

if (document.getElementById('feedback')) {
    ReactDOM.render(<Feedback />, document.getElementById('feedback'));
}
