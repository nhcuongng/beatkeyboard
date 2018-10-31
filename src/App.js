import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TrainingPage from './Components/TrainingPage'
import MultiplayerPage from './Components/MultiplayerPage'
import HomePage from './Components/HomePage'

import { API_ROOT } from './config/ApiRoot'
import axios from './axios'

import './App.css';

class App extends Component {
  state = {
    name: '',
    image: '',
}
componentWillMount() {
    axios({
      // axios must with credential
      url: `${ API_ROOT }/profile`,
      method: 'GET',
      // withCredentials: true,
    }).then(response => {
      if(response && response.data.user){
        this.setState({
          name: response.data.user.name,
          image: response.data.user.image,
        })
      }
    })
    .catch(err => console.log(err)) 
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/"  render={(props) => <HomePage {...props} name={this.state.name} image={this.state.image} isAuthed={true} />} />
          <Route exact path="/training"  render={(props) => <TrainingPage {...props} name={this.state.name} image={this.state.image} isAuthed={true} />} />
          <Route exact path="/multiplayer" render={(props) => <MultiplayerPage {...props} name={this.state.name} image={this.state.image} isAuthed={true} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
