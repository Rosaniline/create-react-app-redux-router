import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from 'store'
import App from 'containers/App'
import DevTools from 'containers/DevTools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BrowserRouter } from 'react-router-dom'

import 'font-awesome/css/font-awesome.css'
import 'css/index.css'
import 'css/login.css'

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <MuiThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
      { process.env.NODE_ENV === 'development' ? <DevTools /> : null }
    </div>
  </Provider>
  , document.getElementById('root')
)
