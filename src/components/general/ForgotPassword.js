import React, {Component} from 'react';
import logo from "../images/logo.png";
import {Link} from "react-router-dom";
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {

            email: '',
            loading: false

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

     onSubmit(e) {
        e.preventDefault();
        this.setState({loading: true})
        const {history} = this.props;
        const {email} = this.state;
        const data = {email};

        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/users/forgotPassword',
            data: data

        }).then(res => {
            if(res.data.message === "Please check your email for your password reset link") {
                console.log(data);
                toast.success('Please check your email for your password reset link');

                setTimeout(() => {
                    history.push('/login');
                }, 3000);
            }
            else if (res.data.message === 'user not found') {
                toast.error("Email does not exist");
            }
            else {
                toast.info('Unable to send reset password link');
            }
        }).catch(err => {
            console.log(err.message);
        })
    }

    render() {
        const {email} = this.state;
        return (
            <div className="base-container">
                <div className="" style={{width: '9em', marginTop: '15em'}}><img src={logo}/></div>
                <div style={{marginTop: '1em'}}>
                    <label>Email address</label>
                    <br/>
                    <input type="text"
                           value={email}
                           name="email" onChange={this.onChange}
                           placeholder="Enter your email address" />
                </div>
                <div>
                    <button className="btn btn-block"
                            style={{backgroundColor: 'teal'}}
                            onClick={this.onSubmit}>SEND</button>
                </div>
                <Link to="/login"
                      style={{marginRight: '6em', marginTop: '1em', color: 'teal'}}
                >Remember Password? Login</Link>
            </div>
        )
    }
}

export default ForgotPassword;