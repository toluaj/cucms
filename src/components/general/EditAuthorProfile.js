import React, {Component} from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';

class EditAuthorProfile extends Component {


    render() {

        return(
            <div className="container-fluid">
        <div className="content mr-5">
          <div className="header mt-4 mr-5"> Edit Your Profile</div>
          <form className="wrapper">
              {/* <SideNav/> */}
          <div className="form">
            <div className="form-group col-sm-6">
                <label for="title" className="mr-2 mb-1">Title <b style={{color: 'red'}}>*</b></label>
                <br />
                <select name="title" className="mb-3">
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
              <input type="text" name="firstname" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Last Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="lastname" readOnly/>
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
            <div className="form-group col-sm-6">
                <label for="affiliation">Affiliation <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="affiliation" placeholder="" />
            </div>
            <div className="form-group col-sm-6">
              <label for="gender">Gender <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="gender" placeholder="" readOnly/>
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
            {/* if alternate phone, put this, else, remove   */}
            </div>
            {/* <div className="row">
              <div className="form-group col-sm-6">
              <label for="password">Password <b style={{color: 'red'}}>*</b></label>
              <input type="password" name="password" placeholder="" readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="conf_password">Confirm Password <b style={{color: 'red'}}>*</b></label>
              <input type="password" name="confirm_password" placeholder="" rea/>
            </div>
            </div> */}
            <div className="row">
            <div className="form-group col-sm-6 loc">
                <label for="country">Country of Residence <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="country" placeholder="" />
                {/* <textarea rows="3" cols="32" name=""></textarea> */}
            </div>
            <div className="form-group col-sm-6 desc">
              <label for="address">Address <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="address" placeholder="" /> */}
              <textarea rows="3" cols="32" name=""></textarea>
            </div>
            </div>
          </div>
          </form>
        </div>
        <div className="footer">
          <button type="button" className="btn" style={{width: '60px'}}>
            Save
          </button>
        </div>
      </div>
        )
    }
}


export default EditAuthorProfile;