import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Button, Progress, Card, Alert, CardText, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../api';

class Multiplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socketId: "",
            nameUser:"",
            input: '',
            progress: 0,
            message1: '',
            message:'',
            characters: 1000,
            time: 30,
            disable: false,
            isStart: false,
            win: true
        }
        socket.on("server-send-to-user2", (data) => {
            this.setState(data)
            
        })
        socket.emit("getid", ({ id: "" }))
        socket.on("get-id-success", (abc)=>{
            this.setState({ socketId: socket.io.engine.id })
            socket.emit("looking-for-opponent",({ socketId: this.state.socketId }))
        })
        socket.on("success", (data) => {
            console.log(data)
            this.setState({ nameUser: data.nameUser })
        })
        
        // console.log(this.state.socketId)
        

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
                message1: "Come on man!!!"
            })
        }
        if (inputPercentage === 100) {
            clearInterval(this.timer);

            let timeCopy = 30 - this.state.time;
            this.setState({
                message1: `Yessss! You did it! Just takes you only
                    ${timeCopy}s to complete ${this.state.characters} characters.
                    Great!!!`,
                disable: true
            })
        }
        socket.emit('user1-send-to-server', { message: e.target.value })
        
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
            message1: '',
            message:'',
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
                message1: `Oh nooo! That's so pity, you lose! You got ${this.state.input.length} characters
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
                        this.state.message1}
                        
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
                    <h4 className="mb-0 pt-2 font-weight-bold">{ this.state.nameUser }</h4>                         
                    </div>
                    <Progress className="my-2" striped color="info" value={this.state.progress}>
                        {this.state.progress === 0 ? '' :
                        this.state.progress + "%"}
                    </Progress>
                    <FormGroup className="mb-0">
                        <Input
                            type="textarea"
                            rows="1" name="input"
                            placeholder="From Opponent....."
                            value={this.state.message}
                            disabled
                            />
                    </FormGroup>
                    <hr className="my-4"/>
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-0 pt-2 font-weight-bold">{ this.props.name }</h4>
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