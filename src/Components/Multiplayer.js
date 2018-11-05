import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Button, Progress, Card, Alert, CardText, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../config/api';
import { API_ROOT } from '../config/ApiRoot'

class Multiplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            found: false,
            isToggle: false,
            nameUser:undefined,
            nameRoom:"You Are In Waiting Room...",
            input: '',
            progress: 0,
            messageFromWebsite: '',
            message:'',
            characters: 1000,
            time: 30,
            disable: true,
            isStart: false,
            win: true
        }
        socket.on("server-send-to-user2", (data) => {
            this.setState(data)
            
        })
    }

    lookingOpponent = () => {
        this.resetInput()
        this.setState({ nameUser: "Waiting.....",disable: false  })
        socket.emit("looking-for-opponent",({ nameUser: this.props.name}))
        setTimeout(() => {
            // check data recive
            socket.on("success", (data) => {
                console.log(data)
                if(data[0] === this.props.name){
                    this.setState({ nameUser: data[1] })
                    this.setState({ found: true })
                        
                }else if(data[1] === this.props.name){
                    this.setState({ nameUser: data[0] })
                    this.setState({ found: true })
                }
                // Opponent Found and Notice to another user
                if(this.state.found && data[2]){
                    alert("Opponent Found. Let's Start!") 
                    this.setState({ nameRoom: "Wel Come To Room "+data[2] })
                }else{
                    alert("No User Found...You Will Play With My BOT")
                    window.location.replace("http://localhost:3000/computer")
                }
                
                // this is bug, Not already to fix: 
                // 2 user in differece room but browser notice is in one room
                // Not frequently but must to fix
                // else if(data.length === 4){
                //     if(data[2] == data[3]){
                //         alert("No User Found...You Will Play With My BOT")
                //         window.location.replace("http://localhost:3000/computer")
                //     }
                // }
            })
           },3500)
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
                messageFromWebsite: "Come on man!!!"
            })
        }
        if (inputPercentage === 100) {
            clearInterval(this.timer);

            let timeCopy = 30 - this.state.time;
            this.setState({
                messageFromWebsite: `Yessss! You did it! Just takes you only
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
            messageFromWebsite: '',
            message:'',
            characters: 1000,
            time: 30,
            disable: true,
            isStart: false,
            win: true
        })
        clearInterval(this.timer);
    }

    componentDidUpdate() {
        if (this.state.time === 1) {
            clearInterval(this.timer);
            this.setState({
                messageFromWebsite: `Oh nooo! That's so pity, you lose! You got ${this.state.input.length} characters
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
                    <h3 className="font-weight-bold mb-4">{ this.state.nameRoom }</h3>
                    <Alert color={ this.state.win === true ? "success" : "danger"}>
                        {this.state.input === '' ?
                            'Try typing 1000 characters in just 30 seconds first to defeat your opponent!!!' :
                        this.state.messageFromWebsite}
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
                    <br/>
                    <Card body className="bg-danger mb-2">
                        <CardText className="text-white">
                            {this.state.message === '' ?
                            "From Opponent....." :
                            this.state.message }
                        </CardText>
                    </Card>
                    <hr className="my-4"/>
                    <div className="d-flex justify-content main-player1">
                        <h4 className="mb-0 pt-2 font-weight-bold">{ this.props.name }</h4>
                        <Button outline size="sm" className="ml-4" color='info' onClick={ this.lookingOpponent } >READY</Button>                        
                        <Button color="light" className="ml-4" onClick={this.resetInput}>
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
                        <Input id = "input-user"
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