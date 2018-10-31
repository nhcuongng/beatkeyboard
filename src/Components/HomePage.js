import React, { Component } from 'react';
import Sidebar from './Sidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';

class HomePage extends Component {
    render() {
        return (
            <div className="d-flex">
                <Sidebar name={this.props.name} image={this.props.image} />
                <Home />
            </div>
        );
    }
}

export default HomePage;