import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Training from './Training';
import 'bootstrap/dist/css/bootstrap.min.css';

class TrainingPage extends Component {
    render() {
        return (
            <div className="d-flex">
                <Sidebar name={this.props.name} image={this.props.image} />
                <Training
                    name={this.props.name}
                    image={this.props.image}
                    data={this.props.data}
                    id={this.props.id}/>
            </div>
        );
    }
}

export default TrainingPage;