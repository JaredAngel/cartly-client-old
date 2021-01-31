import React, { Component } from 'react'
import LoginForm from '../../LoginForm/LoginForm';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='Form'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          showApp={() => this.props.showApp()}
        />
      </section>
    );
  }
}

export default LoginRoute