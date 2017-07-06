import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Login } from 'components/Login'
import * as actions from 'actions/auth'

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
