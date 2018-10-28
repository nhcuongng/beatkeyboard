import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Multiplayer from './Multiplayer';
import 'bootstrap/dist/css/bootstrap.min.css';

class MultiplayerPage extends Component {
    render() {
        return (
            <div className="d-flex">
                <Sidebar/>
                <Multiplayer/>
            </div>
        );
    }
}

export default MultiplayerPage;