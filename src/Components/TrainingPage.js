import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Training from './Training';
import 'bootstrap/dist/css/bootstrap.min.css';

class TrainingPage extends Component {
    render() {
        return (
            <div className="d-flex">
                <Sidebar/>
                
                <Training name = { this.props.name }/>
            </div>
        );
    }
}

export default TrainingPage;