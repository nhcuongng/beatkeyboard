import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Multiplayer from './Multiplayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';

class MultiplayerPage extends Component {
    state = {}
    render() {
        return (
            <div className="d-flex">
                <Sidebar/>
                { this.props.name ? <Multiplayer /> : <div>
                                                        Bạn chưa Đăng nhập <Login />
                                                      </div>  }
            </div>
        );
    }
}

export default MultiplayerPage;