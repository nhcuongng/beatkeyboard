import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBeer } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {
    render() {
        return (
            <div className="mainDivision p-3">
                <div className="home_section text-center rounded mb-3">
                    <h1 className="font-weight-bold">Hi, it's BeatKeyboard.</h1>
                    <h4>
                        Let your stress down and quickly get relaxed by beating your keyboard crazily.
                    </h4>
                    <Link to="/training">
                        <Button color="success" size="lg" className="text-uppercase font-weight-bold mt-4">
                            Try it now
                        </Button>
                    </Link>
                </div>
                <div className="d-flex pr-4 mb-3">
                    <div className="bg-white rounded p-4 col-md-4 mr-2">
                        <h4 className="font-weight-bold">
                            Easily playing
                        </h4>
                        <p className="mb-0">
                            For this game. You only need a browser to participate in.
                            No need to install anything. Also, you can play anytime you want
                            and quickly get your mood boosted.
                        </p>
                    </div>
                    <div className="bg-white rounded p-4 col-md-4 mx-1">
                        <h4 className="font-weight-bold">
                            Training
                        </h4>
                        <p className="mb-0">
                           If you don't have any experiences with BeatKeyboard, you'd better
                           start with the Training section. Try to beat your keyboard in your
                           own way.
                        </p>
                    </div>
                    <div className="bg-white rounded p-4 col-md-4 ml-2">
                        <h4 className="font-weight-bold">
                            Multiplayer
                        </h4>
                        <p className="mb-0">
                           Get tired of playing BeatKeyboard yourself?! This section is for you.
                           Battle with computer or other opponents to get memorable moments.
                        </p>
                    </div>
                </div>
                <div className="bg-white p-3 rounded text-center">
                    Made with&nbsp;
                    <FontAwesomeIcon icon={faHeart} color="red" /> and &nbsp;
                    <FontAwesomeIcon icon={faBeer} color="orange" />&nbsp;
                    in Techkids Web 14
                </div>
            </div>
        );
    }
}

export default Home;