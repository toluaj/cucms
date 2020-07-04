import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/login.css';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }


    }

    onChange = (e) =>
        this.setState({

         [e.target.name]: e.target.value,

      });


    render() {

        const {email, password} = this.state;

        return (
            <div className="base-container">
        <div className="content">
          <div className="image mt-5 ml-5">
            <img src={logo} />
          </div>
        <div className="header mr-4">CUCMS Login</div>
          <div className="form">
            <div className="form-group">
              <label for="email" className="">Email Address</label>
              <input type="email"
               name="email"
               value={email}
               onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label for="password" className="">Password</label>
              <input type="password" name="password"
              value={password}
              onChange={this.onChange} /><p className="mt-2">Forgot Password?</p>
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
              Don't have an account? <Link to="/sign-up">Sign Up</Link> </footer>
      </div>
        );
    }

}


export default Login;