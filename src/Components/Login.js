import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, Form, NavLink, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import { API_ROOT } from '../config/ApiRoot';
// import axios from '../axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
        toggle() {
            this.setState({
            modal: !this.state.modal
        });
    }
    
    render() {
        return (
          <div>
            <NavItem>
                <NavLink href="#" onClick={this.toggle}  className="bg-light">
                    <FontAwesomeIcon icon={faAngleDoubleRight} className="size-16"/>
                    Log In
                </NavLink>
            </NavItem>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>
                    Log in to&nbsp;
                    <span className="text-success font-weight-bold">BeatKeyboard</span>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Button className="btn btn-primary btn-block facebook-bg">
                            <a href={ `${ API_ROOT }/api/auth/facebook`} className="text-white">
                                Login with Facebook
                            </a>
                        </Button>
                    </Form>
                </ModalBody>
                {/* <ModalFooter className="text-center">
                    New to <span className="text-primary">BeatKeyboard?</span> Create a new account!
                </ModalFooter> */}
            </Modal>
          </div>
        );
    }
}

export default Login;