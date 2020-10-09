import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/signup.css';
import logo from '../images/logo.png';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ContactUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            firstName: '',
            lastName: '',
            email: '',
            user: [],
            logged: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit = (e) => {
        e.preventDefault();
        const {firstName, lastName, email, message} = this.state;
        const data = {firstName, lastName, email, message}
        console.log(data);
        const {history} = this.props;

            axios({
                method: 'post',
                url: `${API_URL}/contact`,
                data: data,
            }).then((res) => {
                if(res.data) {
                    console.log(res.data);
                    toast.success("Message sent successfully");
                    setTimeout(() => {
                        history.push('/');
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

    submitForm = () => {
        const {
            firstName,
            lastName,
            email,
            message
        } = this.state;

        return (
            firstName.length > 0 &&
            lastName.length > 0 &&
            email.length > 0 &&
            message.length > 0
        );
    };

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    render() {

        const {firstName, lastName, email, message, user} = this.state;
        console.log(firstName, lastName, email, message, user.email)

        const isEnabled = this.submitForm();

        return(
            // <div className="container-fluid">
            <div className="grid-container" >
                <div className="grid-item1">
                    <img className="chair"
                        // src="https://res.cloudinary.com/dthdj5bkt/image/upload/c_scale,h_892,w_680/v1597236064/2xaF4TbjXT0.png"
                         src="https://res.cloudinary.com/dthdj5bkt/image/upload/c_scale,h_908,w_700/v1597277491/sign-up.png"
                         style={{marginTop: '-10px', marginLeft: '-1.85em', marginBottom: '-20px', }}
                    />
                    <img className="slogo" src={logo} />
                    <h3 className="text2">CUCMS</h3>
                    <h5 className="text">A solution to manage conferences in Covenant University</h5>
                </div>
                <div className="grid-item2">
                    <div >
                        <h5 className="" style={{marginRight: '6em', marginBottom: '-1em', fontFamily: 'Trebuchet MS'}}><b>
                            CONTACT US </b></h5>

                        {/*<h6 style={{fontFamily: 'Trebuchet MS', }}>Fill the form below to continue</h6>*/}
                        {/*<p style={{marginLeft: '20em',fontFamily: 'Trebuchet MS', marginBottom: '4em', marginTop: '3px'}}><b>*/}
                        {/*    Already a member? <Link to="/login">Sign in</Link></b> </p>*/}
                    </div>
                    <ToastContainer/>
                    <form className="mr-5" style={{marginRight: '3em'}} onSubmit={this.onSubmit}>
                        <div className="form">
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
                                    <label htmlFor="address">Email <b style={{color: 'red'}}>*</b></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        style={{marginRight: '21em'}}
                                        onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label htmlFor="address">Message <b style={{color: 'red', marginRight: '2em'}}>*</b></label>
                                    <textarea
                                        name="message"
                                        value={message}
                                        style={{backgroundColor: 'rgba(225, 225, 225, 1)', marginRight: '9em'}}
                                        rows="9"
                                        cols="50"
                                        onChange={this.onChange}>X</textarea>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn signupbutton "
                                    disabled={!isEnabled}
                                    style={{width: '16em', borderRadius: '7px', marginRight: '10em', marginTop: '1em', fontFamily: 'Trebuchet MS'}}
                                // onClick={this.onSubmit}
                            >
                                SEND MESSAGE
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default ContactUs;