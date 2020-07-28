import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/signup.css';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import {displayCountryDropdown} from '../../utils/helper';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            gender: '',
            affiliation: '',
            password: '',
            phoneNumber: '',
            alternate_phone: '',
            conf_password: '',
            country: '',
            address: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
   }

   componentDidMount(){

   }

   onSubmit = () => {

     const {title, firstName, lastName, email, affiliation, password,
      phoneNumber, gender, alternate_phone, country, address} = this.state;
     const data = {title, firstName, lastName, email, affiliation,
        password, phoneNumber,gender,alternate_phone, country, address}
        console.log(data);

      if(this.state.password !== this.state.conf_password) {
          toast.error("passwords not match")
        }
      else {
        
        axios({
          method: 'post',
          url: `http://localhost:8080/api/cu/users`, 
          data: data,
        }).then((res) => {
          if(res.data) {
            console.log(res.data);
            toast.success("Successful registration. Verify your email address");
          }
          else {
            toast.error('Something went wrong. Try again')
          }
        }).catch(err => {
          console.log(err.message);
        })
        }
   }

   submitForm = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      country,
      password,
      gender,
      title,
    } = this.state;

    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      phoneNumber.length > 0 &&
      address.length > 0 &&
      country.length > 0 &&
      password.length > 0 &&
      title.length > 0 &&
      gender.length > 0 
    );
  };

   onChange = (e) =>
   this.setState({
     [e.target.name]: e.target.value,
   });

   onCountryChange = (e) => {
    const { value } = e.target;
    this.setState({ country: value });
  };

    render() {

      const {firstName, lastName, email,
         password, phoneNumber, alternate_phone, address, gender} = this.state;

        const isEnabled = this.submitForm();

        return(
            <div className="container-fluid">
        <div className="content">
            <div className="signlogo"><img src={logo}/></div>
          <div className="header mt-4"> SIGN UP FOR CUCMS</div>
          <ToastContainer/>
          <form className="wrapper" onSubmit={this.onSubmit}>
          <div className="form">
            <div className="form-group col-sm-6 ml-5">
                <label for="title" className="mr-2">Title <b style={{color: 'red'}}>*</b></label>
                <br />
                <select
                 name="title"
                 onChange={this.onChange}>
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
              <label htmlFor="firstName">First Name <b style={{color: 'red'}}>*</b></label>
              <input
               type="text" 
               name="firstName"
               value={firstName}
               onChange={this.onChange} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="lastName">Last Name <b style={{color: 'red'}}>*</b></label>
              <input
               type="text"
              name="lastName"
              value={lastName}
              onChange={this.onChange} />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="address">Address <b style={{color: 'red'}}>*</b></label>
              <input 
              type="text"
              name="address"
              value={address}
              onChange={this.onChange} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="email">Email <b style={{color: 'red'}}>*</b></label>
              <input
               type="email"
              name="email" 
              placeholder=""
              value={email} 
              onChange={this.onChange}/>
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6 aff">
            <label htmlFor="country" className="ml-3">Country of Residence <b style={{color: 'red'}}>*</b></label>
            {displayCountryDropdown (this.onCountryChange)}
            </div>
            <div className="form-group col-sm-3 gender">
              <label for="gender">Gender <b style={{color: 'red'}}>*</b></label>
                <select name="gender" onChange={this.onChange}>
                    <option value=""></option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label htmlFor="phoneNumber">Phone Number <b style={{color: 'red'}}>*</b></label>
              <input
               type="text" 
               name="phoneNumber"
               value={phoneNumber}
               onChange={this.onChange} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="alternate_phone">Alternate Phone</label>
              <input 
              type="text" 
              name="alternate_phone"
              value={alternate_phone}
              onChange={this.onChange} />
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label htmlFor="password">Password <b style={{color: 'red'}}>*</b></label>
              <input
               type="password"
              name="password"
              value={password}
              onChange={this.onChange} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="conf_password">Confirm Password <b style={{color: 'red'}}>*</b></label>
              <input
               type="password"
              name="conf_password"
              onChange={this.onChange}/>
            </div>
            </div>
            <div className="row">
            {/* <div className="form-group col-sm-6">
                <label htmlFor="affiliation">Affiliation <b style={{color: 'red'}}>*</b></label>
                <input
                 type="text"
                name="affiliation"
                value={affiliation}
                onChange={this.onChange} />
            </div> */}
            
            </div>
          </div>
          <div className="text-center">
          <button type="button" className="btn signupbutton "
           disabled={!isEnabled}
           onClick={this.onSubmit}>
            REGISTER
          </button>
        </div>
          </form>
        </div>
        <footer className="sign-in-footer">
              Already have an account? <Link to="/login">Sign in</Link> </footer>
      </div>
        )
    }
}

export default SignUp;