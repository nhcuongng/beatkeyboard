import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'reactstrap'

class GameRecords extends Component {
    render() {
        let tableData = [];
        let dataLength;
        this.props.data.length < this.props.max ?
        dataLength = this.props.data.length :
        dataLength = this.props.max;
        for (let i = 0; i < dataLength; i++) {
            tableData.push(
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{this.props.name === "" ? "You" : this.props.name}</td>
                    <td
                        className={this.props.data[i].draw === true ?
                        "text-warning font-weight-bold" :
                        this.props.data[i].win === true ?
                        "text-success font-weight-bold" :
                        "text-danger font-weight-bold"}>
                        {this.props.data[i].draw === true ? "DRAW" :
                        this.props.data[i].win === true ?
                        "WIN" : "LOSE"}
                    </td>
                    <td>{this.props.data[i].opponent}</td>
                </tr>
            )
        }
        return (
            <div className="bg-white p-3 rounded">
                <h4 className="font-weight-bold">Latest Game Records</h4>
                {this.props.data.length === 0 ?
                <h4 className="text-center my-3">You have no game records!</h4> :
                <div>
                    <Table borderless responsive className="mb-0">
                        <thead className="border-bottom">
                            <tr>
                                <th>#</th>
                                <th>Player</th>
                                <th>Result</th>
                                <th>Opponent</th>
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

export default GameRecords;