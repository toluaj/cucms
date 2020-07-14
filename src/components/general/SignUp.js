import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/signup.css';
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
            affiliation: '',
            password: '',
            phoneNumber: '',
            alternate_phone: '',
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
          <form className="wrapper">
          <div className="form">
            <div className="form-group col-sm-6 ml-5">
                <label for="title" className="mr-2">Title <b style={{color: 'red'}}>*</b></label>
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
              <label for="username">First Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="firstname" />
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Last Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="lastname" />
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="username">Username</label>
              <input type="text" name="username" />
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Email <b style={{color: 'red'}}>*</b></label>
              <input type="email" name="email" placeholder="" />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6 aff">
                <label for="">Affiliation <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="affiliation" placeholder="" />
            </div>
            <div className="form-group col-sm-3 gender">
              <label for="gender">Gender <b style={{color: 'red'}}>*</b></label>
                <select name="gender">
                    <option value=""></option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="phone">Phone Number <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="phoneNumber" />
            </div>
            <div className="form-group col-sm-6">
              <label for="altphone">Alternate Phone</label>
              <input type="text" name="alternate_phone" placeholder="" />
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="password">Password <b style={{color: 'red'}}>*</b></label>
              <input type="password" name="password" placeholder="" />
            </div>
            <div className="form-group col-sm-6">
              <label for="conf_password">Confirm Password <b style={{color: 'red'}}>*</b></label>
              <input type="password" name="confirm_password" placeholder="" />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
                <label for="">Country of Residence <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="country" placeholder="" />
            </div>
            <div className="form-group col-sm-6">
              <label for="address">Address <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="address" placeholder="" />
            </div>
            </div>
          </div>
          </form>
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