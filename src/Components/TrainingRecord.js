import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';

class TrainingRecord extends Component {
    render() {
        let tableData = [];
        let dataLength;
        this.props.data.length < 3 ?
        dataLength = this.props.data.length :
        dataLength = 3;
        for (let i = 0; i < dataLength; i++) {
            tableData.push(
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{this.props.data[i].date}</td>
                    <td>{this.props.data[i].characters} chars</td>
                    <td>{this.props.data[i].time}s</td>
                </tr>
            )
        }
        return (
            <div className="bg-white p-3 rounded">
                <h4 className="font-weight-bold">Training Records</h4>
                {this.props.data.length === 0 ?
                <h4 className="text-center my-3">You have no training records!</h4> :
                <div>
                    <Table borderless responsive className="mb-0">
                        <thead className="border-bottom">
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Characters</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                </div>
                }
            </div>
        );
    }
}

export default TrainingRecord;