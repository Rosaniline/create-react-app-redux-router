import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import { persistStore, autoRehydrate } from 'redux-persist'

import DevTools from 'containers/DevTools'

const enhancers = []
const middleware = [
  thunk
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  enhancers.push(DevTools.instrument())
}

enhancers.push(autoRehydrate())

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers
  )
  persistStore(store, {})
  return store
}
