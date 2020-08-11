import React, {Component} from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import SideNav from '../layouts/AdminSideBar';
import { data } from 'jquery';

class EditProfile extends Component {

  constructor(props){
    super(props);
    this.state = {

      user: {},
      logged: '',
      alternate_phone: '',
      lastName: ''

    }
    this.onChange = this.onChange.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  componentWillMount() {
    this.fetchLoggedOnUser();
}

fetchLoggedOnUser() {
    axios({

      method: 'get',
      url: `http://localhost:8080/api/cu/users/logged`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then((res) => {
      if(res.data) {
        console.log(res.data.data);
        this.setState({user: res.data.data, logged: 'true'})
      }
      else {
        console.log('you are not logged in!')
        this.setState({logged: 'false'});
        window.location.replace('/login')
      }
    }).catch(err => {
      console.log('no authorization');
      toast.info("Please log in again. fetchlogged Session expired")
      this.setState({logged: 'false'});
      window.location.replace('/login')
    })
}

  onChange = (e) =>
      this.setState({
        [e.target.name]: e.target.value,
      });

editProfile = (e) => {
    e.preventDefault();
    const {alternate_phone, lastName} = this.state;
    const data = {alternate_phone, lastName};

  axios({
    method: 'put',
    url: 'http://localhost:8080/api/cu/users/edit',
    data: data,
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  }).then(res => {
    console.log(res.data);
  })
}

    render() {

      const {user, logged} = this.state;
      console.log(user.role);
      console.log(logged)

        return(
            <div className="container-fluid">
              <ToastContainer/>
        <div className="content mr-5">
          <div className="header" style={{marginRight: '23em', marginTop: '2em'}}><b>Edit Your Profile</b></div>
          <div style={{marginLeft: '25em', marginTop: '1em', marginBottom: '-1em'}}><p>Update your details below</p></div>
          <form className="wrapper">
              <SideNav user={user}/>
          <div className="form">
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="username">First Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="firstname" placeholder={user.firstName} readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Last Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="lastName" placeholder={user.lastName} onChange={this.onChange}
                     value={this.state.lastName}/>
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
              <label for="gender">Gender <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="gender" placeholder={user.gender} readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Email <b style={{color: 'red'}}>*</b></label>
              <input type="email" name="email" placeholder={user.email} readOnly/>
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="phone">Phone Number <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="phoneNumber" placeholder={user.phoneNumber} readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="altphone">Alternate Phone</label>
              <input type="text" name="alternate_phone" value={this.state.alternate_phone}
                     placeholder={user.alternate_phone} onChange={this.onChange} />
            </div> 
            </div>
            <div className="row">
            <div className="form-group col-sm-6 loc">
                <label for="country">Country of Residence <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="country" placeholder={user.country} readOnly/>
                {/* <textarea rows="3" cols="32" name=""></textarea> */}
            </div>
            <div className="form-group col-sm-6 desc">
              <label for="address">Address <b style={{color: 'red'}}>*</b></label>
               <input type="text" name="address" placeholder={user.address} />
              {/*<textarea rows="3" cols="32" name="" placeholder={user.address} readOnly></textarea>*/}
            </div>
            </div>
          </div>
          </form>
        </div>
        <div className="footer">
          <button type="submit" className="btn btn-block" onClick={this.editProfile}
                  style={{width: '17em', marginLeft: '26em', borderRadius: '7px', color: 'white', backgroundColor: '#0c081d'}}>
            UPDATE
          </button>
        </div>
      </div>
        )
    }
}


export default EditProfile;