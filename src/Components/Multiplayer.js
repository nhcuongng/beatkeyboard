import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Button, Progress, Card, Alert, CardText, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'

class Multiplayer extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            progress: 0,
            message: '',
            characters: 1000,
            time: 30,
            disable: false,
            isStart: false,
            win: true
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
                message: "Come on man!!!"
            })
        }
        if (inputPercentage === 100) {
            clearInterval(this.timer);

            let timeCopy = 30 - this.state.time;
            this.setState({
                message: `Yessss! You did it! Just takes you only
                    ${timeCopy}s to complete ${this.state.characters} characters.
                    Great!!!`,
                disable: true
            })
        }
        
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            let timeCopy = this.state.time;
            this.setState({time: timeCopy - 1})
        }, 1000);
    }

    resetInput = () => {
        this.setState({
            input: '',
            progress: 0,
            message: '',
            characters: 1000,
            time: 30,
            disable: false,
            isStart: false,
            win: true
        })
        clearInterval(this.timer);
    }

    componentDidUpdate() {
        if (this.state.time === 1) {
            clearInterval(this.timer);
            this.setState({
                message: `Oh nooo! That's so pity, you lose! You got ${this.state.input.length} characters
                in 30 seconds. Be better next time!!`,
                disable: true,
                time: 0,
                win: false
            })
        }
    }

    render() {
        return (
            <div className="mainDivision p-3">
                <div className="typing_section p-3 rounded mb-3">
                    <h1 className="font-weight-bold mb-4">Multiplayer</h1>
                    <Alert color={ this.state.win === true ? "success" : "danger"}>
                        {this.state.input === '' ?
                            'Try typing 1000 characters in just 30 seconds first to defeat your opponent!!!' :
                        this.state.message}
                        
                    </Alert>
                    <div className="d-flex justify-content-between">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <Button color="secondary">
                                {(this.state.time -this.state.time % 60 )/ 60}:{this.state.time % 60 < 10 ? '0': ''}{this.state.time % 60}
                            </Button>
                            <Label className="btn btn-light characterBtnLight">
                                <Input type="radio" disabled/>1000 characters
                            </Label>
                        </div>
                        <h4 className="mb-0 pt-2 font-weight-bold">Cuong</h4>
                    </div>
                    <Progress className="my-2" striped color="info" value={this.state.progress}>
                        {this.state.progress === 0 ? '' :
                        this.state.progress + "%"}
                    </Progress>
                    <hr className="my-4"/>
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-0 pt-2 font-weight-bold">Duy Anh</h4>
                        <Button color="light" onClick={this.resetInput}>
                            <FontAwesomeIcon icon={faUndo} />
                        </Button>
                    </div>
                    <Progress className="my-2" striped color="success" value={this.state.progress}>
                        {this.state.progress === 0 ? '' :
                        this.state.progress + "%"}
                    </Progress>
                    <Card body className="bg-success mb-2">
                        <CardText className="text-white">
                            {this.state.input === '' ?
                            "Let's BEAT your OPPONENT right now!" :
                            this.state.input }
                        </CardText>
                    </Card>
                    <FormGroup className="mb-0">
                        <Input
                            type="textarea"
                            rows="1" name="input"
                            placeholder="Type something here"

                            value={this.state.input}
                            onChange={this.changeInput}
                            onPaste={this.pasteInput}
                            disabled = {this.state.disable}/>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

export default Multiplayer;