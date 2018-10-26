import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { API_ROOT } from '../config/ApiRoot';
import axios from '../axios'

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
        axios({
            // axios must with credential
            url: `${ API_ROOT }/profile`,
            method: 'GET',
            // withCredentials: true,
          }).then(response => {
            // console.log(data)
           this.setState({
             name: response.data.user.name
           })
      
          })
            .catch(err => console.log(err)) 
        return (
          <div> 
                <div>
                    <div className="login">
                        { this.state.name ? <div>Xin Chào Cường,<a href={ `${ API_ROOT }/logout` }>Đăng Xuất</a></div> : <Button onClick={this.toggle} className="m-3" color="primary">Sign in</Button> }
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Sign in to <span className="text-primary">BeatKeyboard</span></ModalHeader>
                        <ModalBody>
                            <div className='text-center'>
                                <a href={ `${ API_ROOT }/api/auth/facebook` }>
                                    <button className="btn btn-primary"><span className="fa fa-facebook"/> Login With Facebook</button>
                                </a>
                            </div>
                            <hr/>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Username</Label>
                                    <Input type="text" name="username" id="exampleEmail" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="" />
                                </FormGroup>
                                <Button className="btn btn-primary">Sign In</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter className="text-center">
                            New to <span className="text-primary">BeatKeyboard?</span> Create a new account!
                        </ModalFooter>
                    </Modal>
                </div>
            }
          </div>
        );
    }
}

export default Login;