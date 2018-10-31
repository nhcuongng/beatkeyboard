import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Multiplayer from './Multiplayer';
import 'bootstrap/dist/css/bootstrap.min.css';

class MultiplayerPage extends Component {
    render() {
        return (
            <div className="d-flex">
                <Sidebar name={this.props.name} image={this.props.image} />
                <Multiplayer
                    name={this.props.name}
                    image={this.props.image}
                    data={this.props.data}
                    id={this.props.id}
                />
            </div>
        );
    }
}

export default MultiplayerPage;