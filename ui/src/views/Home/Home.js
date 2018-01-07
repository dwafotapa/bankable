import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Divider, Dropdown, Grid, Header, Segment } from 'semantic-ui-react'

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
          !bankerId &&
          <div>
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

Home.propTypes = {
  bankerId: PropTypes.string.isRequired,
  bankerIds: PropTypes.array.isRequired,
  resetBankerId: PropTypes.func.isRequired,
  setBankerId: PropTypes.func.isRequired
}

export default Home