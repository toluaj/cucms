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

   onSubmit = (e) => {
        e.preventDefault();
     const {title, firstName, lastName, email, affiliation, password,
      phoneNumber, gender, alternate_phone, country, address} = this.state;
     const data = {title, firstName, lastName, email, affiliation,
        password, phoneNumber,gender,alternate_phone, country, address}
        console.log(data);
     const {history} = this.props;

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
              setTimeout(() => {
                  history.push('/login');
              }, 10000);
            // window.location.replace('/login');
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
      // title,
      conf_password
    } = this.state;

    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      phoneNumber.length > 0 &&
      address.length > 0 &&
      country.length > 0 &&
      password.length > 0 &&
      // title.length > 0 &&
      gender.length > 0 &&
      conf_password.length > 0
    );
  };

   onChange = (e) =>
   this.setState({
     [e.target.name]: e.target.value,
   });

   onCountryChange = (e) => {
    const { value } = e.target;
    this.setState({ country: value }, () => console.log(this.state.country));
  };

    render() {

      const {firstName, lastName, email,
         password, phoneNumber, alternate_phone, address, gender, country} = this.state;
      console.log(firstName, lastName, email,
          password, phoneNumber, alternate_phone, address, gender, country)

        const isEnabled = this.submitForm();

        return(
            // <div className="container-fluid">
        <div className="grid-container" >
            <div className="grid-item1">
                <img className="chair"
                    // src="https://res.cloudinary.com/dthdj5bkt/image/upload/c_scale,h_892,w_680/v1597236064/2xaF4TbjXT0.png"
                    src="https://res.cloudinary.com/dthdj5bkt/image/upload/c_scale,h_908,w_700/v1597277491/sign-up.png"
                    // src="../images/signup.png"
                    style={{marginTop: '-10px', marginLeft: '-1.85em', marginBottom: '-20px', }}
                />
                <img className="slogo" src={logo} />
                    <h3 className="text2">CUCMS</h3>
                    <h5 className="text">A solution to manage conferences in Covenant University</h5>
            </div>
          <div className="grid-item2">
              <div >
              <h5 className="" style={{marginRight: '24em', marginBottom: '-1.5em', fontFamily: 'Trebuchet MS'}}><b> Sign up for CUCMS </b></h5>

                  {/*<h6 style={{fontFamily: 'Trebuchet MS', }}>Fill the form below to continue</h6>*/}
                  <p style={{marginLeft: '20em',fontFamily: 'Trebuchet MS', marginBottom: '4em', marginTop: '3px'}}><b>
                      Already a member? <Link to="/login">Sign in</Link></b> </p>
              </div>
              <ToastContainer/>
              <form className="mr-5" style={{marginRight: '3em'}} onSubmit={this.onSubmit}>
                  <div className="form">
                      {/*<div className="form-group col-sm-6 ml-5">*/}
                      {/*    <label htmlFor="title" className="mr-2">Title <b style={{color: 'red'}}>*</b></label>*/}
                      {/*    <br/>*/}
                      {/*    <select*/}
                      {/*        name="title"*/}
                      {/*        onChange={this.onChange}>*/}
                      {/*        <option value=""></option>*/}
                      {/*        <option value="Prof">Prof</option>*/}
                      {/*        <option value="Dr">Dr</option>*/}
                      {/*        <option value="Ms">Ms</option>*/}
                      {/*        <option value="Mrs">Mrs</option>*/}
                      {/*        <option value="Mr">Mr</option>*/}
                      {/*    </select>*/}
                      {/*</div>*/}
                      <div className="row">
                          <div className="form-group col-sm-6">
                              <label htmlFor="firstName">First Name <b style={{color: 'red'}}>*</b></label>
                              <input
                                  type="text"
                                  name="firstName"
                                  value={firstName}
                                  onChange={this.onChange}/>
                          </div>
                          <div className="form-group col-sm-6">
                              <label htmlFor="lastName">Last Name <b style={{color: 'red'}}>*</b></label>
                              <input
                                  type="text"
                                  name="lastName"
                                  value={lastName}
                                  onChange={this.onChange}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="form-group col-sm-6">
                              <label htmlFor="address">Address <b style={{color: 'red'}}>*</b></label>
                              <input
                                  type="text"
                                  name="address"
                                  value={address}
                                  onChange={this.onChange}/>
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
                              <label htmlFor="country" className="ml-3">Country of Residence <b
                                  style={{color: 'red'}}>*</b></label>
                              {displayCountryDropdown(this.onCountryChange)}
                          </div>
                          <div className="form-group col-sm-3 gender">
                              <label htmlFor="gender">Gender <b style={{color: 'red'}}>*</b></label>
                              <select name="gender" onChange={this.onChange}>
                                  <option value=""></option>
                                  <option value="Female">Female</option>
                                  <option value="Male">Male</option>
                                  <option value="Other">Other</option>
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
                                  onChange={this.onChange}/>
                          </div>
                          <div className="form-group col-sm-6">
                              <label htmlFor="alternate_phone">Alternate Phone</label>
                              <input
                                  type="text"
                                  name="alternate_phone"
                                  value={alternate_phone}
                                  onChange={this.onChange}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="form-group col-sm-6">
                              <label htmlFor="password">Password <b style={{color: 'red'}}>*</b></label>
                              <input
                                  type="password"
                                  name="password"
                                  value={password}
                                  onChange={this.onChange}/>
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
                      <button type="submit" className="btn signupbutton "
                              disabled={!isEnabled}
                              style={{width: '16em', borderRadius: '7px', marginRight: '22em', marginTop: '1em'}}
                              // onClick={this.onSubmit}
                      >
                          Create Account
                      </button>
                  </div>
              </form>
          </div>
        </div>

      // </div>
        )
    }
}

export default SignUp;