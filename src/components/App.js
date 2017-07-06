import React from 'react'

import Loadable from 'react-loadable'
import { Route, Switch, Redirect } from 'react-router-dom'

const notFound = () => <h1>Not Found</h1>

const AsyncLogin = Loadable({
  loader: () => import('containers/Login'),
  loading: () => null
})

const Index = () => (
  <div className="flex-center screen-size login-background">
    <h3>React Start</h3>
  </div>
)

const Private = () => (
  <div className="flex-center screen-size login-background">
    <h3>Private</h3>
  </div>
)

export const App = (props) => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={routeProps => (
      props.isAuthenticated ? (
        <Component {...routeProps}/>
      ):(
        <Redirect to={{
          pathname: '/login',
          state: { from: routeProps.location }
        }}/>
      )
    )}/>
  )

  return (
  <div>
    <Switch>
      <Route exact path="/" component={Index} />
      <PrivateRoute path="/private" component={Private} />
      <Route path="/login" component={AsyncLogin} />
      <Route component={notFound} />
    </Switch>
  </div>
)}
