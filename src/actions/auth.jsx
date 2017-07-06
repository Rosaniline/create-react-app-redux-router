import _ from 'lodash'

import { checkHttpStatus, parseJSON } from '../utils'
import { AUTH_ACTION } from 'constant/auth'

export const updateUsername = (username) => ({type: AUTH_ACTION.UPDATE_USERNAME, username})

export const updatePassword = (password) => ({type: AUTH_ACTION.UPDATE_PASSWORD, password})

export const authLoginUserSuccess = (token) => {
  sessionStorage.setItem('token', token)

  return {
    type: AUTH_ACTION.LOGIN_SUCCESS,
    token
  }
}

export function authLoginUserFailure(error, message) {
  sessionStorage.removeItem('token')

  return {
    type: AUTH_ACTION.LOGIN_FAILED,
    statusText: message
  }
}

export const authLoginUserRequest = () => {
  return { type: AUTH_ACTION.LOGIN_REUQEST }
}

export function authLogout() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')

  return { type: AUTH_ACTION.LOGOUT }
}

export const authLoginUser = (redirect='/') => (dispatch, getState) => {
  const { username, password } = getState().auth

  dispatch(authLoginUserRequest())
  return fetch(`/api/token-auth/`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  }).then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      dispatch(authLoginUserSuccess(response.token))
    }).catch((error) => {
      if (error && typeof error.response !== 'undefined' && error.response.status >= 400 && error.response.status < 500 ) {
        return error.response.json().then((data) => {
          dispatch(authLoginUserFailure(401, _.get(data, 'non_field_errors[0]', 'Unable to log in with provided credentials.')))
        })
      } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
        dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'))
      } else {
        dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'))
      }

      return Promise.resolve()
    })
}
