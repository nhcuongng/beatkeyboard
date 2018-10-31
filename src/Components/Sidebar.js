import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, NavItem, NavLink, Card, CardText, CardBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faListOl, faUserFriends, faVial } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

import Login from './Login'
import Logout from './Logout'

class Sidebar extends Component {
    state = {
        about: false
    }

    showAbout = () => {
        let currentAbout = this.state.about;
        this.setState({ about: !currentAbout })
    }

    render() {
        return (
            <div className="sidebar">
                <Nav vertical>
                    <NavItem>
                        <Link to="/" className="logo">
                            <h3 className="m-3 text-success"><strong>BeatKeyboard</strong></h3>
                        </Link>
                    </NavItem>
                </Nav>
                <Nav vertical>
                    {this.props.name !== '' ?
                    <Logout name={this.props.name} image={this.props.image}/> :
                    <Login />}
                </Nav>
                <Nav vertical>
                    <NavItem>
                        <Link to="/training" className="nav-link">
                            <FontAwesomeIcon icon={faVial} className="size-16"/>
                            Training
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/multiplayer" className="nav-link">
                            <FontAwesomeIcon icon={faUserFriends} className="size-16"/>
                            Multiplayer
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className="nav-link">
                            <FontAwesomeIcon icon={faListOl} className="size-16"/>
                            Highscores
                        </Link>
                    </NavItem>
                </Nav>
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#"
                            onClick={this.showAbout}>
                            <FontAwesomeIcon icon={faInfoCircle} className="size-16"/>
                            About
                        </NavLink>
                    </NavItem>
                </Nav>
                <Card className="border-0 bg-success about"
                    style={{visibility: this.state.about === true ? "" : "hidden"}}>
                    <CardBody>
                        <CardText>
                            Hi, this is <strong>BeatKeyboard</strong>, a project that
                            aims to be a playground for people to <strong>beat their keyboard</strong>, so
                            they can 
                            reduce their stress after a long time working with computer.<br/>
                            Thanks and much ❤️
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Sidebar;