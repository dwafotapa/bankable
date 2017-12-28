import 'whatwg-fetch'
import { handleErrors } from 'utils/fetch'

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST'
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE'
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS'

export const fetchAccountsRequest = () => ({
  type: FETCH_ACCOUNTS_REQUEST
})

export const fetchAccountsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FAILURE,
  error
})

export const fetchAccountsSuccess = (accounts) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  accounts
})

export const fetchAccounts = () => {
  return (dispatch, getState) => {
    dispatch(fetchAccountsRequest())
    const { bankerId } = getState()
    const url = `/api/v1/bankers/${bankerId}/accounts`
    return fetch(url)
      .then(handleErrors)
      .then(json => dispatch(fetchAccountsSuccess(json.accounts)))
      .catch(ex => dispatch(fetchAccountsFailure(ex)))
  }
}

const initialState = []

export default function accounts(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}