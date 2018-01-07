import { connect } from 'react-redux'
import { toJS } from 'utils/to-js'
import Home from './Home'
import { getBankerId, getBankerIds, resetBankerId, setBankerId } from 'store/modules/bankers'

const mapStateToProps = (state) => ({
  bankerId: getBankerId(state),
  bankerIds: getBankerIds(state)
})

const mapDispatchToProps = (dispatch) => ({
  resetBankerId: () => dispatch(resetBankerId()),
  setBankerId: (id) => dispatch(setBankerId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Home))