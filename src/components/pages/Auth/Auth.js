import React from 'react';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';

import googleButton from './images/google_booze.png';
import boozeLogo from './images/booze_logo.png';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div id="authBtn">
        <img src={boozeLogo} id="logo" alt="booze clues logo" />
        <div className='Auth'>
          <button className='loginBtn' onClick={this.authenticateUser}>
            <img src={googleButton} alt="google login" />
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;
