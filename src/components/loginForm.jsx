import React, { Component } from 'react';

class LoginForm extends Component {
  username = React.createRef();

  handleSubmit = e => {
    e.preventDefault();

    // Call the server
    const username = this.username.current.value;
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              autoFocus
              ref={this.username}
              id='username'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' />
          </div>
        </form>
        <button className='btn btn-primary'>Login</button>
      </div>
    );
  }
}

export default LoginForm;
