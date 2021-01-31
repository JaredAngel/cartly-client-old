import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service';
import UserContext from '../contexts/UserContext';
import './LoginForm.css'
import TokenService from '../services/token-service';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        //this.context.processLogin(res.authToken)
        TokenService.saveAuthToken(res.authToken)
        // const jwtPayload = TokenService.parseAuthToken()
        // this.setUser({
        //   id: jwtPayload.user_id,
        //   firstname: jwtPayload.firstname,
        //   lastname: jwtPayload.lastname,
        //   username: jwtPayload.sub,
        // })
        console.log('test here blah')
        //this.props.handleLogin();
        // this.props.onLoginSuccess();
      }).then(() =>{
          this.props.showApp()
        
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
      
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <label htmlFor='login-username-input'>
            Username {' '}
          </label>
          <input
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <label htmlFor='login-password-input'>
            Password {' '}
          </label>
          <input
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <button type='submit'>
          Login
        </button>
      </form>
    )
  }
}

export default LoginForm