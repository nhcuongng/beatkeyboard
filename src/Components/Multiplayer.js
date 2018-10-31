import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Input, FormGroup, Button, Progress, Card, Alert, CardText } from 'reactstrap';

class Multiplayer extends Component {
    render() {
        return (
            <div className="mainDivision">
                <Alert color="primary mx-5 mt-5 mb-2">
                    <h1>Multiplayer</h1>
                </Alert>
                <Jumbotron className="typing_section mx-5 mb-5 mt-0 rounded">
                    <div className="d-flex justify-content-between mb-3">
                        <Button className="mr-1" color="primary">1:00</Button>{' '}
                        <h3>Duong</h3>
                    </div>
                    <Progress className="my-2" striped color="" value={75}>75%</Progress>
                    {/* <p className="lead text-info">Try typing whatever you like as fast as possible to beat your opponent</p> */}
                    <hr/>
                    <h3 className="mb-3">Duy Anh</h3>
                    <Progress className="my-2" striped color="" value={85}>85%</Progress>
                    <Card body className="bg-primary mb-2">
                        <CardText className="text-white">This is some sample text that you did type here mannn.</CardText>
                    </Card>
                    <FormGroup>
                        <Input type="textarea" rows="1" name="text" id="exampleText" placeholder="Type something here"/>
                    </FormGroup>
                </Jumbotron>
            </div>
        );
    }
}

export default Multiplayer;