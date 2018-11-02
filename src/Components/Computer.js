import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Input, FormGroup, Button, Progress, Card, Alert, CardText, Label } from 'reactstrap'
import GameRecords from './GameRecords'

import axios from '../axios'
import { API_ROOT } from '../config/ApiRoot'

class Computer extends Component {
    constructor() {
        super();
        this.state = {
            opponent: '',
            opponentSpeed: 0,
            opponentInputLength: 0,
            input: '',
            progress: 0,
            message: '',
            characters: 1000,
            time: 30,
            disable: false,
            isStart: false,
            win: true,
            draw: false,
            data: []
        }
    }

    static timer;
    static opponent;

    componentDidMount() {
        this.setState({data: this.props.computerData})
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
                message: "Come on man!!!"
            })
        }
        if (inputPercentage === 100) {
            clearInterval(this.timer);
            clearInterval(this.opponent);
            this.setState({
                message: `Wowww! You won!!! Greatttt!!!`,
                disable: true
            }, () => {
                this.collectData();
            });
            
        }
        
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            let timeCopy = this.state.time;
            
            this.setState({
                time: timeCopy - 1,
            })
        }, 1000);
        this.opponent = setInterval(() => {
            let opponentInputLengthCopy = this.state.opponentInputLength;
            let opponentSpeedCopy = this.state.opponentSpeed / 5;
            opponentInputLengthCopy += opponentSpeedCopy + Math.round(Math.random() * 2 - 1);
            this.setState({
                opponentInputLength: opponentInputLengthCopy
            })
        },200)
    }

    resetInput = () => {
        this.setState({
            input: '',
            progress: 0,
            opponentInputLength: 0,
            message: '',
            characters: 1000,
            time: 30,
            disable: false,
            isStart: false,
            win: true
        })
        this.randomOpponent();
        clearInterval(this.timer);
        clearInterval(this.opponent);
    }

    componentDidUpdate() {
        if (this.state.time === 1) {
            clearInterval(this.timer);
            clearInterval(this.opponent);
            this.setState({
                message: 
                    this.state.progress < Math.round(this.state.opponentInputLength / 1000 * 100) ?
                    `You lose, ${this.state.opponent} was so excellent! Be better next time!` :
                    this.state.progress > Math.round(this.state.opponentInputLength / 1000 * 100) ?
                    `Wowww! You won!!! Can't believe it!!!` : "Draw!!!",
                disable: true,
                time: 0,
                win: this.state.progress > Math.round(this.state.opponentInputLength / 1000 * 100) ?
                true : false,
                draw: this.state.progress === Math.round(this.state.opponentInputLength / 1000 * 100) ?
                true: false
            }, () => {
                this.collectData();
            });
        }
        if (Math.round(this.state.opponentInputLength / 1000 * 100) === 99) {
            clearInterval(this.timer);
            clearInterval(this.opponent);
            this.setState({
                message: `You lose, ${this.state.opponent} was so excellent! Be better next time!`,
                disable: true,
                win: false,
                opponentInputLength: 1001,
            }, () => {
                this.collectData();
            });
        }
    }

    componentDidMount() {
        this.randomOpponent();
    }

    randomOpponent = () => {
        let opponents = ['Martin', 'Olivia', "Patrick", "Alex", "Paul"]
        let opponent = opponents[Math.floor(Math.random() * opponents.length)];
        let opponentSpeed = Math.round(Math.random()* 16 + 20);
        this.setState({opponent, opponentSpeed})
    }

    pasteInput = () => {
        this.setState({ disable: true, message: "Bitchhh! You cheated!!!" })
    }

    collectData = () => {
        let dataCopy = this.state.data;
        let now = new Date();
        let nowMonth = now.getMonth() + 1;

        if (nowMonth < 10) nowMonth = '0' + nowMonth;
        let nowTime = `${now.getDate()}/${nowMonth}/${now.getFullYear()}`;

        let currentData = {
            date: nowTime,
            opponent: this.state.opponent,
            win: this.state.win,
            draw: this.state.draw,
            id: this.props.id
        }
        dataCopy.unshift(currentData)
        
        this.setState({ data: dataCopy })

        if (this.props.name !== "") {
            axios({
                url: `${ API_ROOT }/challenge/post`,
                method: 'POST',
                data: currentData
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
                    <h1 className="font-weight-bold mb-4">Battle with Computer</h1>
                    <Alert color={ this.state.win === true ? "success" : "danger"}>
                        {this.state.input === '' ?
                            `Try typing ${this.state.characters} characters in just ${this.state.time} seconds first to defeat the COMPUTER BOT!!!` :
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
                        <h4 className="mb-0 pt-2 font-weight-bold">{this.state.opponent}</h4>
                    </div>
                    <Progress className="my-2" striped color="info" value={Math.round(this.state.opponentInputLength /1000 * 100)}>
                        {Math.round(this.state.opponentInputLength /1000 * 100) === 0 ? '' :
                        Math.round(this.state.opponentInputLength /1000 * 100) + "%"}
                    </Progress>
                    <hr className="my-1"/>
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-0 pt-2 font-weight-bold">
                            {this.props.name === "" ? "You" : this.props.name}
                        </h4>
                        <Button 
                            color="secondary" 
                            onClick={this.resetInput} 
                            className={this.state.disable === true ? "" : "invisible"}>
                            Again?!
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
                <GameRecords data={this.state.data} max={3} name={this.props.name} />
            </div>
        );
    }
}

export default Computer;