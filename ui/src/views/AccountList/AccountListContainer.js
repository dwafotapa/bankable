import { connect } from 'react-redux'
import { toJS } from 'utils/to-js'
import AccountList from './AccountList'
import { fetchAccountsRequest, resetAccountsRequest } from 'store/modules/accounts'

const mapStateToProps = (state) => ({
  isFetching: state.accounts.get('isFetching'),
  error: state.accounts.get('error'),
  accounts: state.accounts.get('ids').map(id => state.accounts.getIn(['byId', id]))
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccountsRequest: () => dispatch(fetchAccountsRequest()),
  resetAccountsRequest: () => dispatch(resetAccountsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AccountList))