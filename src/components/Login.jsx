import React from 'react'

import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export const Login = (props) => {
  if (props.isAuthenticated) {
    return (
      <Redirect to={_.get(props, 'location.state.from.pathname', '/')}/>
    )
  }

  return (
    <div>
      <div className="flex-center screen-size login-background" />
      <div className="flex-center screen-size">
        <Paper zDepth={3} className="login-container">
          <div className="flex-center login-title">
            <p>
              React
            </p>
          </div>
          <div className="login-text">
            <TextField
              fullWidth
              floatingLabelText="Username"
              onKeyPress={event => event.key === 'Enter' ? props.authLoginUser() : null}
              onChange={event => props.updateUsername(event.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              floatingLabelText="Password"
              style={{ marginBottom: '20px' }}
              onKeyPress={event => event.key === 'Enter' ? props.authLoginUser() : null}
              onChange={event => props.updatePassword(event.target.value)}
            />
            <span style={{ visibility: props.statusText ? 'visible':'hidden', color: '#F44336' }}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" style={{ margin: '10px' }} />
              {props.statusText || "HIDDEN"}
            </span>
            <RaisedButton
              primary
              label="Log in"
              fullWidth={true}
              onClick={props.authLoginUser}
            />
          </div>
        </Paper>
      </div>
    </div>
  )
}
