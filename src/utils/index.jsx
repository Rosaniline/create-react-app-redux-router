import _ from 'lodash'

export const createConstant = (...args) =>
  args.reduce((accu, curr) => {
    accu[curr] = curr
    return accu
  }, {})

export const createReducer = (initialState, reducerMap) => {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]

    return reducer ? reducer(state, _.omit(action, 'type')) : state
  }
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}
