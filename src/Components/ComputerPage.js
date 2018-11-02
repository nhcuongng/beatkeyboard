import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Computer from './Computer';
import 'bootstrap/dist/css/bootstrap.min.css';

class ComputerPage extends Component {
    render() {
        return (
            <div className="d-flex">
                <Sidebar name={this.props.name} image={this.props.image} />
                <Computer
                    name={this.props.name}
                    image={this.props.image}
                    data={this.props.data}
                    id={this.props.id}
                    computerData={this.props.computerData}
                />
            </div>
        );
    }
}

export default ComputerPage;