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
            conferences: [],
            logged: false

        }
        this.getConferences = this.getConferences.bind(this);
        // this.isLogged = this.isLogged.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }
    
    componentDidMount() {
        this.getConferences();
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
            this.setState({
                user: res.data.data,
                logged: true
            })
          }
          else {
            console.log('you are not logged in!');
            this.setState({logged: false})
          }
        }).catch(err => {
          console.log('no authorization');
          this.setState({logged: false})
        })
    }

    getConferences = () => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/conference/',
           
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

        const {conferences, user, logged} = this.state
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
                        <a href="https://web.facebook.com/CovenantUniversity?_rdc=1&_rdr" target="_blank">
                            <i class="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="https://www.linkedin.com/school/covenant-university/" target="_blank">
                            <i class="fa fa-linkedin" aria-hidden="true"></i></a>
                        <a href="https://twitter.com/CUHEBRON?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">
                            <i class="fa fa-twitter" aria-hidden="true"></i></a>
                            {logged ? <div style={{marginTop: '2em', marginLeft: '0.5em'}}>Hi, {user.firstName}</div> :
                            ""}
                    </div>
                </div>
                {/* <SideNav/> */}
                 {/* {this.isLogged ? : ""} */}
                <SplashSideBar user = {logged}/>
                <div className="mt-3">
                        <h4 style={{marginLeft: '27em'}}>UPCOMING CONFERENCES</h4>
                    </div>
                <div className="mt-3 limiter container-table100">
                    <div className="table-responsive content ">
                        <table className="table copy-font wrap-table100">
                            <thead style={{backgroundColor: 'teal'}}>
                                <tr>
                                    <th>Name</th>
                                    <th>Topic</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Location</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#C7CED4', borderRadius: '3em'}}>
                                {conferences.map((conf, i) => (
                                <tr key={i + 1} className="rowed">
                                    <td>{conf.name}</td>
                                    <td>{conf.topic}</td>
                                    <td>{conf.description}</td>
                                    <td>{moment(conf.start_date).format('DD/MM/YYYY')}</td>
                                    <td>{moment(conf.end_date).format('DD/MM/YYYY')}</td>
                                    <td>{conf.location}</td>
                                    <td><i style={{cursor: 'pointer'}} class="fa fa-eye" aria-hidden="true"></i></td>
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