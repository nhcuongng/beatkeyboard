import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Input, FormGroup, Button, Progress, Card, Alert, CardText, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import TrainingRecord from './TrainingRecord'

import axios from '../axios'
import { API_ROOT } from '../config/ApiRoot'

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
            isStart: false,
            data: []
        }
    }

    static timer;

    componentDidMount() {
        this.setState({data: this.props.data})
    }

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
                    "Wowww, your typing speed is unbelievable." :
                    inputPercentage > 40 ?
                    "Things are good. Keep going man." :
                    inputPercentage > 20 ?
                    "Cool! I've done 1/5 of the job. Let's do it faster!" :
                    "Mehh. Let's type it fast!",
                buttonDisable: true
            })
        }
        if (inputPercentage === 100) {
            let dataCopy = this.state.data;
            let now = new Date();
            let nowMonth = now.getMonth() + 1;

            if (nowMonth < 10) nowMonth = '0' + nowMonth;
            let nowTime = `${now.getDate()}/${nowMonth}/${now.getFullYear()}`;

            let currentData = {
                date: nowTime,
                characters: this.state.characters,
                time: this.state.time,
                id: this.props.id
            }

            dataCopy.unshift(currentData)

            clearInterval(this.timer);

            let timeCopy = this.state.time;
            this.setState({
                message: `Yessss! You did it! Just takes you only
                    ${timeCopy}s to complete ${this.state.characters} characters.
                    Great!!!`,
                disable: true,
                data: dataCopy
            })
            this.postData(currentData);
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

    pasteInput = () => {
        this.setState({ disable: true })
    }

    postData(data) {
        if (this.props.name !== "") {
            axios({
                url: `${ API_ROOT }/post`,
                method: 'POST',
                data: data
            }).catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="mainDivision p-3">
                {this.props.name === "" ? 
                <Alert color="danger" className="mb-1">
                    Log in to save your scores and records to the cloud.
                </Alert> : ""}
                <div className="typing_section p-3 rounded mb-3">
                    <h1 className="font-weight-bold mb-4">Training</h1>
                    <Alert color="success">
                        {this.state.input === '' ?
                        'Try typing whatever you like as fast as possible reduce your stress :3' :
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
                            placeholder="Type something here"

                            value={this.state.input}
                            onChange={this.changeInput}
                            onPaste={this.pasteInput}
                            disabled = {this.state.disable}/>
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <Button color="success">
                                    {(this.state.time -this.state.time % 60 )/ 60}:{this.state.time % 60 < 10 ? '0': ''}{this.state.time % 60}
                                </Button>
                                <Label className={this.state.characters === 200 ?
                                    "btn btn-light active" :
                                    this.state.buttonDisable === true ?
                                    "btn btn-light notDisplay" :
                                    "btn btn-light"}>
                                    <Input type="radio" name="characters" value="200"
                                    onClick={this.setChar}/>
                                    200
                                </Label>
                                <Label className={this.state.characters === 500 ?
                                    "btn btn-light active" :
                                    this.state.buttonDisable === true ?
                                    "btn btn-light notDisplay" :
                                    "btn btn-light"}>
                                    <Input type="radio" name="characters" value="500"
                                    onClick={this.setChar}/>
                                    500
                                </Label>
                                <Label className={this.state.characters === 1000 ?
                                    "btn btn-light active" :
                                    this.state.buttonDisable === true ?
                                    "btn btn-light notDisplay" :
                                    "btn btn-light"}>
                                    <Input type="radio" name="characters" value="1000"
                                    onClick={this.setChar}/>
                                    1000
                                </Label>
                                <Label className="btn btn-secondary characterBtnSecondary">
                                    <Input type="radio" disabled/> characters
                                </Label>
                            </div>
                        </div>
                        <Button color="dark" onClick={this.resetInput}>
                            <FontAwesomeIcon icon={faUndo} />
                        </Button>
                    </div>
                </div>
                <TrainingRecord data={this.state.data} max={3}/>
            </div>
        );
    }
}

export default Training;