import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider, Dropdown, Grid, Header, Segment } from 'semantic-ui-react'
import { toJS } from 'utils/to-js'
import { getBankerId, getBankerIds, resetBankerId, setBankerId } from 'store/modules/bankers'

const getDropdownOptions = (bankerIds) => {
  return bankerIds.map(id => ({
    text: id,
    value: id
  }))
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { dropdownValue: '' }
  }

  handleDropdownChange = (e, { value }) => this.setState({ dropdownValue: value })

  handleSignOutButtonClick = () => {
    this.props.setBankerId('')
    this.setState({ dropdownValue: ''})
  }

  render() {
    const { bankerId, bankerIds, resetBankerId, setBankerId } = this.props
    return (
      <Container>
        <Header as="h3" block textAlign="center">Home</Header>
        <Segment>
          {
            bankerId
            ? <p>You are signed in as <strong>{bankerId}</strong>.</p>
            : <p>You are signed out.</p>
          }
        </Segment>
        <Grid textAlign="center">
          <Grid.Column>
            {
              bankerId
              ? <Button onClick={this.handleSignOutButtonClick} primary>Sign out</Button>
              : <Button onClick={resetBankerId} primary>Sign in</Button>
            }
          </Grid.Column>
        </Grid>
        {
          bankerId
          ? null
          : <div>
              <Divider horizontal>Or</Divider>
              <Grid textAlign="center">
                <Grid.Column>
                  <Dropdown
                    placeholder="Sign in as"
                    selection
                    options={getDropdownOptions(bankerIds)}
                    value={this.state.dropdownValue}
                    onChange={this.handleDropdownChange}
                  />
                  <span> </span>
                  <Button
                    primary
                    disabled={!this.state.dropdownValue}
                    onClick={() => setBankerId(this.state.dropdownValue)}
                  >
                    Sign in
                  </Button>
                </Grid.Column>
              </Grid>
            </div>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  bankerId: getBankerId(state),
  bankerIds: getBankerIds(state)
})

const mapDispatchToProps = (dispatch) => ({
  resetBankerId: () => dispatch(resetBankerId()),
  setBankerId: (id) => dispatch(setBankerId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Home))