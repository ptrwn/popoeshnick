import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import axios from 'axios'
import PropTypes from 'prop-types'

import './dialog.css'


export class DialogForgot extends Component {
  state = {
    login: null,
    password: null,
    passwordIdentity: false,
  }

  handleVerifyPassword = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({ passwordIdentity: true })
    }
  }
  
  onSignup = () => {
    axios.post('/user/signup', {
      email: this.state.login,
      password: this.state.password
    }).then(
      // ...
    )
  }
  render() {
    return (
      <div className="dialog-style">
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <DialogTitle>{'Enter your email to get confirmation code'}</DialogTitle>
          <DialogContent>
            <form
              // style={ DIALOG_STYLE }
            >
              <TextField
                label="Enter email"
                margin="normal"
                onChange={this.onSetLogin}
              />
              <Button
                variant="contained"
                color="primary"
                style={{marginTop: '20px'}}
                onClick={this.onForgotPassword}
                disabled={!this.state.login}
              >
                Send
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

PropTypes.DialogSignup = {
  open: PropTypes.boolean,
  onClose: () => {},
}