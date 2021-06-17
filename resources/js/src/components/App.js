import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';


import HelloWorld from './HelloWorld';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HelloWorld/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
