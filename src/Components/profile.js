import React, { Component } from 'react'
import axios from 'axios'
import { API_ROOT } from '../config/ApiRoot'

export default class profile extends Component {

  state = {
    
  }

  render() {
    axios({
      // axios must with credential
      url: `${ API_ROOT }/profile`,
      method: 'GET',
      withCredentials: true,
    }).then(response => {
      if(response.data && response.data.user.name){
        this.setState({
          name: response.data.user.name,
          image: response.data.user.image,
          message: "Bạn đã đăng nhập"
        })
      }else{
        this.setState({
          name: undefined,
          message: "Bạn Chưa Đăng Nhập"
        })
      }

    })
      .catch(err => console.log(err)) 
    return (
      <div>
        { this.state.name ? <p>Xin Chào: { this.state.name } <img src={ this.state.image }/></p> : <p>Bạn Chưa Đăng Nhập</p> } /> }
      </div>
    )
  }
}
