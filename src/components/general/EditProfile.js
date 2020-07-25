import React, {Component} from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import SideNav from '../layouts/AdminSideBar';

class EditProfile extends Component {

  constructor(props){
    super(props);
    this.state = {

      user: {}

    }
  }

  componentWillMount() {
    this.fetchLoggedOnUser();
    // this.getUser();
}

// componentDidMount() {
// }

// getUser() {
//     axios({
//         method: 'get',
//         url: 'http://localhost:8080/api/cu/users/loggedOnUser',
//         headers: {
//             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//         }
//     }).then((res) => {
//         if(res.data) {
//         console.log(res.data.data);
//         // this.setState({
//         //     user: res.data
//         // })
//         }
//         else {
//             console.log('user don\'t exist bitch')
//         }
//     })
//     .catch(err => {
//         console.log('No authorization');
//         console.log(err.message);
//         toast.info("Please log in again. getuserSession expired")
//     })
// }

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
        this.setState({user: res.data.data})
      }
      else {
        console.log('you are not logged in!')
      }
    }).catch(err => {
      console.log('no authorization');
      toast.info("Please log in again. fetchlogged Session expired")
    })
}

    render() {

      const {user} = this.state;

        return(
            <div className="container-fluid">
        <div className="content mr-5">
          <div className="header mt-4 mr-5"> Edit Your Profile</div>
          <form className="wrapper">
              <SideNav/>
          <div className="form">
            {/* <div className="form-group col-sm-6">
                <label for="title" className="mr-2 mb-1">Title <b style={{color: 'red'}}>*</b></label>
                <br />
                <select name="title" placeholder={user.title} className="mb-3">
                    <option value=""></option>
                    <option value="prof">Prof</option>
                    <option value="dr">Dr</option>
                    <option value="ms">Ms</option>
                    <option value="mrs">Mrs</option>
                    <option value="mr">Mr</option>
                </select>
            </div> */}
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="username">First Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="firstname" value={user.firstName} readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Last Name <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="lastname" placeholder={user.lastName} />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
              <label for="gender">Gender <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="gender" value={user.gender} readOnly/>
            </div>
            <div className="form-group col-sm-6">
              <label for="email">Email <b style={{color: 'red'}}>*</b></label>
              <input type="email" name="email" placeholder={user.email} />
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
              <label for="phone">Phone Number <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="phoneNumber" value={user.phoneNumber}/>
            </div>
            <div className="form-group col-sm-6">
              <label for="altphone">Alternate Phone</label>
              <input type="text" name="alternate_phone" placeholder="" />
            </div> 
            </div>
            <div className="row">
            <div className="form-group col-sm-6 loc">
                <label for="country">Country of Residence <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="country" value={user.country} readOnly/>
                {/* <textarea rows="3" cols="32" name=""></textarea> */}
            </div>
            <div className="form-group col-sm-6 desc">
              <label for="address">Address <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="address" placeholder="" /> */}
              <textarea rows="3" cols="32" name="" value={user.address} readOnly></textarea>
            </div>
            </div>
          </div>
          </form>
        </div>
        <div className="footer">
          <button type="submit" className="btn btn-block" style={{width: '60px', marginLeft: '30em', backgroundColor: 'teal'}}>
            Save
          </button>
        </div>
      </div>
        )
    }
}


export default EditProfile;