import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TrainingPage from './Components/TrainingPage';
import MultiplayerPage from './Components/MultiplayerPage';

import { API_ROOT } from './Config/ApiRoot';
import axios from './axios'

import './App.css';

class App extends Component {
  state = {}
  componentDidMount() {
    axios({
      // axios must with credential
      url: `${ API_ROOT }/profile`,
      method: 'GET',
      // withCredentials: true,
    }).then(response => {
      // console.log(data)
     if(response && response.data.user.name){
      this.setState({
          name: response.data.user.name
        })
      }
    })
    .catch(err => console.log(err)) 
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/"  render={(props) => <TrainingPage {...props} name={this.state.name} isAuthed={true} />} />
          <Route exact path="/multiplayer" render={(props) => <MultiplayerPage {...props} name={this.state.name} isAuthed={true} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
