import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink, Card, CardText, CardBody } from 'reactstrap';
import { Link } from "react-router-dom";

import Login from './Login';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Nav vertical>
                    <NavItem>
                        <h3 className="m-3">BeatKeyboard</h3>
                    </NavItem>
                </Nav>
                <Nav vertical>
                    <Login />
                </Nav>
                <hr/>
                <Nav vertical>
                    <NavItem>
                        <Link to="/" className="nav-link">Training</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/multiplayer" className="nav-link">Multiplayer</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className="nav-link">Highscores</Link>
                    </NavItem>
                </Nav>
                <hr />
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#">About</NavLink>
                    </NavItem>
                </Nav>
                <Card className="border-0 bg-success about">
                    <CardBody>
                        <CardText>
                            Hi, this is BeatKeyboard, a MERN stack based project that aims to be a
                            playground for developers to reduce their stress after a long time working
                            with computer.<br/>
                            Thank you! ❤️
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Sidebar;