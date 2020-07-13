import React, {Component} from 'react';
import '../styles/login.css';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            conf_password: '',
            country: '',
            address: ''
        }
   }

    render() {

        return(
            <div className="container-fluid">
        <div className="content">
            <div className="logo"><img src={logo} width="10px"/></div>
          <div className="header mt-4"> SIGN UP FOR CUCMS</div>
          <div className="form">
            <div className="formgroup col-sm-4">
                <label for="title" className="mr-5">Title</label>
                <br />
                <select name="title">
                    <option value=""></option>
                    <option value="prof">Prof</option>
                    <option value="dr">Dr</option>
                    <option value="ms">Ms</option>
                    <option value="mrs">Mrs</option>
                    <option value="mr">Mr</option>
                </select>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="username">First Name</label>
              <input type="text" name="firstname" />
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Last Name</label>
              <input type="text" name="lastname" />
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="username">Username</label>
              <input type="text" name="username" />
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Email</label>
              <input type="email" name="email" placeholder="" />
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="username">Password</label>
              <input type="password" name="password" placeholder="" />
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Confirm Password</label>
              <input type="password" name="confirm_password" placeholder="" />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
                <label for="">Country of Residence</label>
                <input type="text" name="country" placeholder="" />
            </div>
            <div className="form-group col-sm-6">
              <label for="address">Address</label>
              <input type="text" name="address" placeholder="" />
            </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            REGISTER
          </button>
        </div>
        <footer className="">
              Already have an account? <Link to="/login">Sign in</Link> </footer>
      </div>
        )
    }
}

export default SignUp;