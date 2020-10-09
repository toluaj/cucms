import React, {Component} from 'react';
import '../styles/home.css'
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import SplashSideBar from '../layouts/SplashSideBar';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import moment from 'moment';
import OneConfProgram from './OneConfProgram';
import Payment from '../staff/participant/Payment';
import {API_URL} from "../../utils/config";

class SplashPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            conferences: [],
            logged: false,
            id: '',
            name: '',
            conference_id: '',
            programs: [],
            acts: []

        }
        this.getConferences = this.getConferences.bind(this);
        this.viewProgram = this.viewProgram.bind(this);
        this.register = this.register.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }
    
    componentDidMount() {
        this.getConferences();
        // this.viewProgram();
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
            url: `${API_URL}/conference/`,
           
        }).then((res) => {
            if(res.data) {
                console.log(res.data.data);
                this.setState({conferences: res.data.data});
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    getProgram(data) {
        console.log(JSON.stringify(data))
        axios({
            method: 'get',
            url: `${API_URL}/activity/program/${data}`,
            // data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {
                console.log(res.data);
                this.setState(
                    {programs: res.data.program}, () => console.log(this.state.programs))
            }
        }).catch(err => {
            console.log(err)
        })
    }

    viewProgram(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.conferences[index]);
        console.log(this.state.conferences[index].id);
        console.log(this.state.user);
        this.setState({
            conference_id: this.state.conferences[index].id,
            name: this.state.conferences[index].name
        }, () => {
            const {conference_id} = this.state;
            // const data = {conference_id};
            // console.log(JSON.stringify(data));
            this.getProgram(conference_id);
            console.log(this.state.conference_id)
        })

    }

    register(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.conferences[index]);
        console.log(this.state.conferences[index].id);
        console.log(this.state.user);
        this.setState({
            conference_id: this.state.conferences[index].id,
            name: this.state.conferences[index].name
        }, () => {
            const {conference_id} = this.state;
            // const data = {conference_id};
            // console.log(JSON.stringify(data));
            this.getProgram(conference_id);
            console.log(this.state.conference_id)
        })
    }

    render() {

        const {conferences, user, logged, id, name, programs, conference_id} = this.state
        console.log(this.state.conference_id);
        console.log(this.state.programs);
        console.log(user);
        return(
            <div className="container-fluid">
                <ToastContainer/>
                {/*<OneConfProgram id={id}/>*/}
                <div className="row enter">
                </div>
                <div className="jumb">
                    <div className="image">
                        <img src={logo}/>
                    </div>
                    <div className="head"> 
                    <h1 style={{ fontFamily: 'Trebuchet MS', display: 'inline' }}><b>CUCMS</b></h1>
                    {/*<a*/}
                    {/*    style={{ fontFamily: 'Trebuchet MS', display: 'inline',*/}
                    {/*        marginRight: '2em', color: 'black', fontSize: '15px' }}*/}
                    {/*    href="/contact-us"*/}
                    {/*>Contact Us</a>*/}
                    </div>
                </div>
                <SplashSideBar user = {user}/>
                <div className="mt-3">
                    <h5 style={{marginLeft: '5em'}}><b>Upcoming Conferences</b></h5>
                    </div>
                <div className="mt-3 limiter container-table100">
                    <div className="table-responsive content ">
                        <table className="table copy-font wrap-table100"
                               style={{width: '80em', marginLeft: '6em', fontFamily: 'TimesNewRoman'}}>
                            <thead style={{backgroundColor: 'white'}}>
                                <tr>
                                    <th>NAME</th>
                                    <th>TOPIC</th>
                                    <th>DESCRIPTION</th>
                                    <th>START DATE</th>
                                    <th>END DATE</th>
                                    <th>LOCATION</th>
                                    <th>VIEW</th>
                                    {user.firstName ? <th>REGISTER</th> : ""}
                                </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#F5F4F6', borderRadius: '3em'}}>
                                {conferences.map((conf, index) => (
                                <tr key={index + 1} data-index={index} className="rowed">
                                    <td data-index={index} >{conf.name}</td>
                                    <td>{conf.topic}</td>
                                    <td>{conf.description}</td>
                                    <td>{moment(conf.start_date).format('DD/MM/YYYY')}</td>
                                    <td>{moment(conf.end_date).format('DD/MM/YYYY')}</td>
                                    <td>{conf.location}</td>
                                    <td><i style={{cursor: 'pointer'}}
                                           className="fa fa-eye ml-3"
                                           aria-hidden="true"
                                           data-index={index}
                                           data-toggle="modal"
                                           data-target="#program"
                                           onClick={this.viewProgram}
                                            ></i>
                                        <OneConfProgram id={id}
                                                        name={name}
                                                        program={programs}/>
                                    </td>
                                    {user.firstName ? <td>
                                        <img style={{cursor: 'pointer'}}
                                                   className="reg"
                                                   // aria-hidden="true"
                                                   src="https://res.cloudinary.com/dthdj5bkt/image/upload/c_scale,w_10/v1597096139/forward.svg"
                                                   data-index={index}
                                             // alt="pic bitch"
                                             //       width="400" height="400"
                                                   data-toggle="modal"
                                                   data-target="#payment"
                                                   onClick={this.register}
                                        />
                                        <Payment
                                            program={programs}
                                            name={name}
                                            id={conference_id}/>
                                    </td> : ""}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="icons footer_social_list">
                    <a href="https://web.facebook.com/CovenantUniversity?_rdc=1&_rdr" target="_blank">
                        <i className="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="https://www.linkedin.com/school/covenant-university/" target="_blank">
                        <i className="fa fa-linkedin" aria-hidden="true"></i></a>
                    <a href="https://twitter.com/CUHEBRON?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                       target="_blank">
                        <i className="fa fa-twitter" aria-hidden="true"></i></a>
                    {/*{logged ? <div style={{marginTop: '1em', marginLeft: '0.5em', fontWeight: 'bold'}}*/}
                    {/*    >Hi, {user.firstName}</div> :*/}
                    {/*    ""}*/}
                </div>
                <div className="footer">
                <p>{new Date().getFullYear()} © Covenant University. All Rights Reserved</p>
            </div>
            </div>
        )
    }
}

export default SplashPage