import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Button, Progress, Card, Alert, CardText, Label } from 'reactstrap';

class Training extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            progress: 0,
            message: '',
            time: 0,
            characters: 200,
            disable: false,
            buttonDisable: false,
            isStart: false
        }
    }

    static timer;

    changeInput = (e) => {
        let chars = this.state.characters;
        let inputPercentage = Math.round(e.target.value.length / chars * 100);
        if(!this.state.isStart) {
            this.startTimer();
        }
        if (inputPercentage <= 100) {
            this.setState({
                isStart: true,
                input: e.target.value,
                progress: inputPercentage,
                message: inputPercentage > 80 ? 
                    "You're almost done. Keep going!" :
                    inputPercentage > 60 ?
                    "Wowww, your typing speed is unbeleivable." :
                    inputPercentage > 40 ?
                    "Things are good. Keep going man." :
                    inputPercentage > 20 ?
                    "Cool! I've done 1/5 of the job. Let's do it faster!" :
                    "Mehh. Let's type it fast!",
                buttonDisable: true
            })
        }
        if (inputPercentage === 100) {
            clearInterval(this.timer)
            let timeCopy = this.state.time;
            this.setState({
                message: "Yessss! You did it! Just takes you only " + timeCopy + "s. Great!!!",
                disable: true
            })
        }
    }

    resetInput = () => {
        this.setState({
            input: '',
            progress: 0,
            message: '',
            time: 0,
            characters: 200,
            disable: false,
            buttonDisable: false,
            isStart: false
        })
        clearInterval(this.timer);
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            let timeCopy = this.state.time;
            this.setState({time: timeCopy + 1})
        }, 1000);
    }

    setChar = (e) => {
        this.setState({[e.target.name]: e.target.value * 1})
    }

    render() {
        return (
            <div className="training p-3">
                <div className="typing_section p-3 rounded">
                    <h1 className="font-weight-bold mb-4">Training Session</h1>
                    <Alert color="success">
                        {this.state.message === '' ?
                        'Try typing whatever you like as fast as possible in just a minute to reduce your stress <3':
                        this.state.message}
                    </Alert>
                    <Card body className="bg-success">
                        <CardText className="text-white">
                            {this.state.input === '' ?
                            "Let's BEAT your KEYBOARD right now!" :
                            this.state.input }
                        </CardText>
                    </Card>
                    <Progress className="my-2" striped color="success" value={this.state.progress}>
                        {this.state.progress === 0 ? '' :
                        this.state.progress + "%"}
                    </Progress>
                    <FormGroup>
                        <Input
                            type="textarea"
                            rows="1" name="input"
                            id="exampleText"
                            placeholder="Type something here"
                            
                            value={this.state.input}
                            onChange={this.changeInput}
                            disabled = {this.state.disable}/>
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <Button className="" color="success">
                                    {(this.state.time -this.state.time % 60 )/ 60}:{this.state.time % 60 < 10 ? '0': ''}{this.state.time % 60}
                                </Button>
                                <Label className={this.state.characters === 200 ?
                                    "btn btn-info active" :
                                    this.state.buttonDisable === true ?
                                    "btn btn-info notDisplay" :
                                    "btn btn-info"}>
                                    <Input type="radio" name="characters" value="200"
                                    onClick={this.setChar}/>
                                    200
                                </Label>
                                <Label className={this.state.characters === 500 ?
                                    "btn btn-info active" :
                                    this.state.buttonDisable === true ?
                                    "btn btn-info notDisplay" :
                                    "btn btn-info"}>
                                    <Input type="radio" name="characters" value="500"
                                    onClick={this.setChar}/>
                                    500
                                </Label>
                                <Label className={this.state.characters === 1000 ?
                                    "btn btn-info active" :
                                    this.state.buttonDisable === true ?
                                    "btn btn-info notDisplay" :
                                    "btn btn-info"}>
                                    <Input type="radio" name="characters" value="1000"
                                    onClick={this.setChar}/>
                                    1000
                                </Label>
                                <Label className="btn btn-info">
                                    <Input type="radio" disabled/> characters
                                </Label>
                            </div>
                        </div>
                        <Button color="secondary" onClick={this.resetInput}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Training;