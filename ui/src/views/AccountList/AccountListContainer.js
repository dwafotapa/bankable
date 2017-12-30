import { connect } from 'react-redux'
import AccountList from './AccountList'
import { fetchAccountsRequest } from 'store/modules/accounts'
import { toJS } from 'utils/to-js'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isFetching: state.accounts.isFetching,
  hasFailed: state.accounts.hasFailed,
  accounts: state.accounts.ids.map(id => state.accounts.byId.get(id))
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccountsRequest: () => {
    dispatch(fetchAccountsRequest());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AccountList))