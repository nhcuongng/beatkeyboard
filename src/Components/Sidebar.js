import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar border-right">
                <Nav vertical>
                <NavItem>
                    <h3 className="m-3">BeatKeyboard</h3>
                </NavItem>
                <NavItem>
                    <Link to="/" className="nav-link">Training</Link>
                </NavItem>
                <NavItem>
                    <Link to="/multiplayer" className="nav-link">Multiplayer</Link>
                </NavItem>
                <NavItem>
                    <Link to="/" className="nav-link">Highscore</Link>
                </NavItem>
                </Nav>
                <hr />
                <Nav vertical>
                <NavItem>
                    <NavLink href="#">About</NavLink>
                </NavItem>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;