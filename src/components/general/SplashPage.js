import React, {Component} from 'react';
import '../styles/home.css'
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import SplashSideBar from '../layouts/SplashSideBar';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import moment from 'moment';

class SplashPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            conferences: []

        }
        this.getConferences = this.getConferences.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }
    
    componentDidMount() {
        this.getUser();
        this.getConferences();
    }

    getUser() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/users/loggedOnUser',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.data) {
            console.log(res);
            this.setState({
                user: res.data
            })
            }
            else {
                console.log('user don\'t exist bitch')
            }
        })
        .catch(err => {
            console.log('No authorization');
            console.log(err.message);
            toast.info("Please log in again. getuserSession expired")
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
          console.log('no authorization');
          toast.info("Please log in again. fetchlogged Session expired")
        })
    }

    getConferences = () => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/conference/',
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.data) {
                console.log(res.data.data);
                this.setState({conferences: res.data.data});
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    render() {

        const {conferences} = this.state
        return(
            <div className="container-fluid">
                <ToastContainer/>
                <div className="row enter">
                    {/* <p className="mr-5"><Link to="/submitabstract">Login</Link></p>
                    <p><Link to="/sign-up">Sign Up</Link></p> */}
                </div>
                <div className="jumbotron">
                    <div className="image">
                        <img src={logo}/>
                    </div>
                    <div className="head"> 
                    <h1>CUCMS</h1>
                    <p>A solution to manage conferences in Covenant University</p>  
                    </div>
                    <div className="icons">
                        <a href="https://web.facebook.com/CovenantUniversity?_rdc=1&_rdr"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="/login"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                        <a href="/submitabstract"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    </div>
                </div>
                {/* <SideNav/> */}
                <SplashSideBar/>
                <div className="mt-3">
                        <h4>Latest Conferences</h4>
                    </div>
                <div className="mt-3">
                    <div className="table-responsive content">
                        <table className="table copy-font">
                            <thead style={{backgroundColor: 'teal'}}>
                                <tr>
                                    <th>Name</th>
                                    <th>Topic</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conferences.map((conf, i) => (
                                <tr key={i + 1}>
                                    <td>{conf.name}</td>
                                    <td>{conf.topic}</td>
                                    <td>{conf.description}</td>
                                    <td>{moment(conf.start_date).format('DD/MM/YYYY')}</td>
                                    <td>{moment(conf.end_date).format('DD/MM/YYYY')}</td>
                                    <td>{conf.location}</td>
                                    <td><i class="fa fa-eye" aria-hidden="true"></i></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer className=" ">
                <p>{new Date().getFullYear()} © Covenant University. All Rights Reserved</p>
            </footer>
            </div>
        )
    }
}

export default SplashPage