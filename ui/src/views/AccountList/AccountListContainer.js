import { connect } from 'react-redux'
import { toJS } from 'utils/to-js'
import AccountList from './AccountList'
import { fetchAccountsRequest } from 'store/modules/accounts'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isFetching: state.accounts.get('isFetching'),
  hasFailed: state.accounts.get('hasFailed'),
  accounts: state.accounts.get('ids').map(id => state.accounts.getIn(['byId', id]))
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccountsRequest: () => dispatch(fetchAccountsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AccountList))