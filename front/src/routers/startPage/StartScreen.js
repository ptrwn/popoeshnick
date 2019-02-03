import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import {
  Redirect,
} from "react-router-dom";

import './StartScreen.css'
import { DialogSignup, DialogForgot } from '../../components/dialogs';

export class StartScreen extends Component {
  state = {
    login: null,
    password: null,
    openSignup: false,
    openForgot: false,
    redirect: null
  }

  onSetPassword = (event) => {
    this.setState({password: event.target.value})
  }

  onSetLogin = (event) => {
    this.setState({login: event.target.value})
  }

  onLogin = () => {
    axios.post('/user/login', {
      email: this.state.login,
      password: this.state.password
    }).then(
      // ...
      // console.log('login')
      this.setState({ redirect:true })
    ).catch(e => {
      
    })
  }

  handleSendQuery = () => this.setState({ redirect:true })

  onForgotPassword = () => {
    axios.post('/user/forget', {
      email: this.state.login,
    }).then(
      // ...
    )
  }
  // модальное окно регистрации
  handleCloseSignup = () => {
    this.setState({ openSignup: false })
  }
  handleOpenSignup = () => {
    this.setState({ openSignup: true })
  }

  // модальное окно забыли пароль
  handleCloseForgot = () => {
    this.setState({ openForgot: false })
  }
  handleOpenForgot = () => {
    this.setState({ openForgot: true })
  }

  handleVerifyPassword = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({ passwordIdentity: true })
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/protected'/>;
    }
    return (
      <div className="start">
        <header className="App-header">
          <div id="alkashPicture"></div>
          <Typography component="h1" variant="h4" style={{ marginTop: '20px'}}>
            Hello, Alkash!!!
          </Typography>
          <Typography component="h2" variant="subtitle1" style={{ marginTop: '10px'}}>
            Explore alco-possibilities with new awesome service Popoeshnick
          </Typography>
          <TextField
            required
            label="email"
            margin="normal"
            onChange={this.onSetLogin}
          />
          <TextField
            required
            label="password"
            margin="normal"
            type="password"
            onChange={this.onSetPassword}
          />
          <Button
            variant="contained"
            color="primary"
            style={{marginTop: '10px'}}
            onClick={this.onLogin}
            disabled={!this.state.login && !this.state.password}
          >
            Log in
          </Button>
          <Button
            style={{marginTop: '15px', marginBottom: '15px'}}
            onClick={this.handleOpenForgot}
          >
            Forgot password?
          </Button>
          <Button
            onClick={this.handleOpenSignup}
          >
            Registration
          </Button>
          <DialogSignup 
            open={this.state.openSignup}
            onClose={this.handleCloseSignup}
            onSend={this.handleSendQuery}
          />
          <DialogForgot 
            open={this.state.openForgot}
            onClose={this.handleCloseForgot}
          />
        </header>
      </div>
    );
  }

}