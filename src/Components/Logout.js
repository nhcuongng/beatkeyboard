import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

import { API_ROOT } from '../config/ApiRoot';

class Logout extends Component {
    render() {
        return (
            <div>
                <NavItem>
                    <NavLink disabled href="#" className="bg-light">
                        <img src={this.props.image} alt='' className="userAvatar"/>&nbsp;&nbsp;
                        <strong id="name">
                            {this.props.name.length < 16 ?
                            this.props.name :
                            this.props.name.slice(0,13) + '..'}
                        </strong>&nbsp;
                    </NavLink>
                    <NavLink href={ `${ API_ROOT }/logout` }>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} className="size-16"/>
                        Log out
                    </NavLink>
                </NavItem> 
            </div>
        );
    }
}

export default Logout;