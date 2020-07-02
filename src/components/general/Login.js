import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/login.css';
import logo from '../images/logo.png';
import loginImg from '../images/login.svg'
import {Link} from 'react-router-dom';
import {SignUp} from './SignUp';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

    }


    render() {
        return (
            <div className="base-container">
        <div className="content">
          <div className="image mt-5 ml-5">
            <img src={logo} />
          </div>
        <div className="header mr-4">CUCMS Login</div>
          <div className="form">
            <div className="form-group">
              <label for="username" className="">Username</label>
              <input type="email" name="username"
               value="" placeholder="Email address/Username" />
            </div>
            <div className="form-group">
              <label for="password" className="">Password</label>
              <input type="password" name="password"
              value="" placeholder="Password" /><p className="mt-2">Forgot?</p>
            </div>
            {/* <div className="form-group">
              <label for="remember" className="remember">
              <input type="checkbox" id="remember" name="remember"
                value="remember-me"/>Remember me?
                </label>
            </div> */}
          </div>
        </div>
          <button type="button" className="btn btn-lg btn-block">
            Login
          </button>
          <footer className="">
              Don't have an account? <Link to={SignUp}>Sign Up</Link> </footer>
      </div>
        );
    }

}


export default Login;