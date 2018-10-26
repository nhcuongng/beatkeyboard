import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import { Jumbotron, Input, FormGroup, Button, Progress, Card, Alert, CardText } from 'reactstrap';

class Training extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            display: '',
            progress: 0,
            progressMessage: ''
        }
    }

    componentDidMount() {
        this.setState({
            display: 'Hey mannn, have a good day!!!'
        })
    }

    handleInputChange = (e) => {
        let inputPercentage = e.target.value.length / 200 * 100;
        this.setState({
            input: e.target.value,
            display: e.target.value === '' ?
                'Hey mannn, have a good day!!!' :
                e.target.value,
            progress: inputPercentage,
            progressMessage: inputPercentage > 80 ? 
                "You're almost done. Keep going" :
                inputPercentage > 40 ?
                "Keep going mannn" : ""
        })
        
    }

    render() {
       console.log(this.props.name)
        return (
            
            <div className="training">
                <Alert color="primary mx-5 mt-5 mb-2">
                    <h1>Training Session</h1>
                </Alert>
                { this.props.name ? <Alert color="info mx-5 mt-3 mb-2">
                                        <h1>Bạn đang training với tư cách { this.props.name } </h1>
                                    </Alert> : 
                                    <Alert color="warning mx-5 mt-3 mb-2">
                                        <h1>Bạn đang training với tư cách nặc danh</h1>
                                    </Alert>
                                     }
                <Jumbotron className="typing_section mx-5 mb-5 mt-0 rounded">
                    <p className="lead text-info">Try typing whatever you like as fast as possible in just a minute to reduce your stress</p>
                    <Card body className="bg-primary">
                        <CardText className="text-white">{this.state.display}</CardText>
                    </Card>
                    <Progress className="my-2" striped color="" value={this.state.progress}>{this.state.progressMessage}</Progress>
                    <FormGroup>
                        <Input
                            type="textarea"
                            rows="1" name="input"
                            id="exampleText"
                            placeholder="Type something here"
                            value={this.state.input}
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <div className="d-flex">
                        <Button className="mr-1" color="primary">1:00</Button>{' '}
                        <Button className="mr-1" color="secondary">Reset</Button>{' '}
                    </div>
                </Jumbotron>
                <Login/>
            </div>
        );
    }
}

export default Training;