import React, {Component} from 'react';
import '../../styles/program-chair/createconf.css';
import logo from '../../images/logo.png';
import Nav from '../../layouts/AdminSideBar';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class createConference extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      location: '',
      topic: '',
      start_date: '',
      end_date: '',
      seats_available: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    this.fetchLoggedOnUser();
  }

  onChange = (e) =>
   this.setState({
     [e.target.name]: e.target.value,
   });

   submitForm = () => {
    const {
      name,
      description,
      location,
      topic,
      start_date,
      end_date,
      seats_available
    } = this.state;

    return (
      name.length > 0 &&
      description.length > 0 &&
      location.length > 0 &&
      topic.length > 0 &&
      start_date.length > 0 &&
      end_date.length > 0 &&
      seats_available > 0
    );
  };

  onSubmit = () => {

    const {name, description, location, topic, start_date, end_date,seats_available} = this.state;
    const data = {name, description, location, topic, start_date, end_date,seats_available}
    console.log(data);

    axios({
      method: 'post',
      url: 'http://localhost:8080/api/cu/conference',
      data: data,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if(res.data) {
        console.log(res.data);
        toast.success("Conference created successfully!")
      }
      else {
        toast.error('Something went wrong');
      }
    })
    .catch(err => {
      console.log('You have to be logged in');
      toast.error("you have to be logged in");
      window.location.replace('/login')
    })

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
        console.log(res.data);
      }
      else {
        console.log('you are not logged in!')
      }
    }).catch(err => {
      console.log('no atowizason');
    })
  }
    render() {

      const {name, description, location, topic, start_date, end_date, seats_available} = this.state;

      const isEnabled = this.submitForm();

        return(
            <div className="container-fluid confcont">
              <ToastContainer/>
        <div className="content">
          <Nav/>
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
              <textarea rows="3"
                        cols="32"
                        name="name"
                        value={name}
                        onChange={this.onChange}></textarea>
            </div>
            <div className="form-group col-sm-6 loc">
              <label for="topic">Conference Topic <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="topic" /> */}
              <textarea rows="3"
                        cols="32"
                        name="topic"
                        value={topic}
                        onChange={this.onChange}></textarea>
            </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6 desc">
              <label for="username">Description <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="username" /> */}
              <textarea rows="3"
                        cols="32"
                        name="description"
                        value={description}
                        onChange={this.onChange}></textarea>
            </div>
            <div className="form-group col-sm-6 loc">
              <label for="location">Location <b style={{color: 'red'}}>*</b></label>
              {/* <input type="text" name="location" placeholder="" /> */}
              <textarea rows="3"
                        cols="32"
                        name="location"
                        value={location}
                        onChange={this.onChange}></textarea>
            </div>
            </div>
            <div className="row">
            <div className="form-group col-sm-6">
                <label for="start_date">Start Date <b style={{color: 'red'}}>*</b></label>
                <input type="date"
                 name="start_date"
                 value={start_date}
                 onChange={this.onChange}  />
            </div>
            <div className="form-group col-sm-3">
              <label for="end_date">End Date <b style={{color: 'red'}}>*</b></label>
              <input type="date"
               name="end_date"
               value={end_date}
               onChange={this.onChange} />
            </div>
            </div>
          </div>
          </form>
        </div>
        <div className="footer">
          <button type="button"
           className="btn btn-block confbut"
           disabled={!isEnabled}
           onClick={this.onSubmit}>
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