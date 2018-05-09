import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './fileUpload';
import VideoUpload from './video';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './index.css';
const App = () => (
    <Router>
        <div>
            <ul className="nav">
                <li>
                    <Link to="/file">File</Link>
                </li>
                <li>
                    <Link to="/video">Video</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/file" component={FileUpload} />
                <Route path="/video" component={VideoUpload} />
                <Route component={FileUpload} />
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(<App />, document.getElementById('app'));
