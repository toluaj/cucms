import React, {Component} from 'react';
import '../../styles/program-chair/createconf.css';
import logo from '../../images/logo.png';

class createConference extends Component {

    render() {
        return(
            <div className="container-fluid">
        <div className="content">
            <div className="logo d-none d-sm-block"><img src={logo} width="10px"/></div>
          <div className="header mt-5"> SET UP CONFERENCE </div>
          <form className="wrapper">
          <div className="form">
            {/* <div className="form-group col-sm-6 ml-5">
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
            </div> */}
            <div className="row">
              <div className="form-group col-sm-6 desc">
              <label for="conf_name">Conference Name <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="conf_name" /> */}
              <textarea rows="3" cols="32" name="conf_name"></textarea>
            </div>
            <div className="form-group col-sm-6 loc">
              <label for="topic">Conference Topic <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="topic" /> */}
              <textarea rows="3" cols="32" name="topic"></textarea>
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6 desc">
              <label for="username">Description <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="username" /> */}
              <textarea rows="3" cols="32" name="description"></textarea>
            </div>
            <div className="form-group col-sm-6 loc">
              <label for="location">Location <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="location" placeholder="" /> */}
              <textarea rows="3" cols="32" name="location"></textarea>
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
                <label for="start_date">Start Date <b style={{color: 'red'}}>*</b></label>
                <input type="date" name="start_date" placeholder="" />
            </div>
            <div className="form-group col-sm-3">
              <label for="end_date">End Date <b style={{color: 'red'}}>*</b></label>
              <input type="date" name="end_date" placeholder="" />
            </div>
            </div>
{/*             
            <div className="row">
            <div className="form-group col-sm-6">
                <label for="">Country of Residence <b style={{color: 'red'}}>*</b></label>
                <input type="text" name="country" placeholder="" />
            </div>
            <div className="form-group col-sm-6">
              <label for="address">Address <b style={{color: 'red'}}>*</b></label>
              <input type="text" name="address" placeholder="" />
            </div>
            </div> */}
          </div>
          </form>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            CREATE
          </button>
        </div>
        {/* <footer className="">
              Already have an account? <Link to="/login">Sign in</Link> </footer> */}
      </div>
        )
    }
}


export default createConference;