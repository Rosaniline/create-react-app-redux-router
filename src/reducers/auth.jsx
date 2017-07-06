import { createReducer } from 'utils'
import { AUTH_ACTION } from 'constant/auth'

const initialState = {
  username: '',
  password: '',
  token: sessionStorage.getItem('token') || null,
  isAuthenticated: 'token' in sessionStorage,
  isAuthenticating: false,
  statusText: null
}

export default createReducer(initialState, {
  [AUTH_ACTION.UPDATE_USERNAME]: (state, { username }) => ({
    ...state, username
  }),

  [AUTH_ACTION.UPDATE_PASSWORD]: (state, { password }) => ({
    ...state, password
  }),

  [AUTH_ACTION.LOGIN_REUQEST]: (state) => ({
    ...state,
    isAuthenticating: true
  }),

  [AUTH_ACTION.LOGIN_SUCCESS]: (state, { token }) => ({
    ...state,
    token,
    isAuthenticating: false,
    isAuthenticated: true,
    statusText: null
  }),

  [AUTH_ACTION.LOGIN_FAILED]: (state, { statusText }) => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: false,
    statusText
  }),

  [AUTH_ACTION.LOGOUT]: (state) => ({
    username: '',
    password: '',
    token: null,
    isAuthenticated: false,
    statusText: null
  })
})
