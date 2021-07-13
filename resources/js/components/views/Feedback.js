import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import FeedbackForm from '../FeedbackForm';

function Feedback() {

    return (
        <div>
            <Header currentUser = {null}/>
            <FeedbackForm />
        </div>
    );
}

export default Feedback;

if (document.getElementById('feedback')) {
    ReactDOM.render(<FeedbackForm />, document.getElementById('feedback'));
}
