import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { App } from 'components/App'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default withRouter(connect(
  mapStateToProps
)(App))
