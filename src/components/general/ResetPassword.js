import React, {Component} from 'react';
import logo from "../images/logo.png";
import {toast, ToastContainer} from "react-toastify";
import axios from 'axios';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm_password: ''
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
    });

    submitForm = (e) => {
        e.preventDefault();
        const { token } = this.props.match.params;
        const { password, confirm_password } = this.state;
        const { history } = this.props;
        const data = {password, confirm_password, token}

        if (password !== confirm_password) {
            toast.info('passwords do not match');
        }

        else {
            axios({

                method: 'post',
                url: 'http://localhost:8080/api/cu/users/reset',
                data: data

            }).then(res => {
                if (res.data.message === 'Password reset successful, please login') {
                    toast.success(res.data.message);

                    setTimeout(() => {
                        history.push('/login');
                    }, 3000);
                }
                else {
                    toast.info('Unable to reset password');
                }
            }).catch(err => {
                console.log(err.message);
                toast.info(err.message);
            })
        }

    }


    render() {
        const {password, confirm_password} = this.state;
        return (
            <div className="base-container">
                <div className="" style={{width: '9em', marginTop: '11em'}}><img src={logo}/></div>
                <div className="form-horizontal">
                    <div className="form-group col-sm-6">
                        <label htmlFor="password">Password <b style={{color: 'red'}}>*</b></label>
                        <input type="password"
                               name="password"
                               value={password}
                               onChange={this.onChange}
                               placeholder=""/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="conf_password">Confirm Password <b style={{color: 'red'}}>*</b></label>
                        <input type="password"
                               name="confirm_password"
                               value={confirm_password}
                               onChange={this.onChange}
                               placeholder=""/>
                    </div>
                </div>
                <div>
                    <button className="btn btn-block"
                            style={{backgroundColor: 'teal'}}
                            onClick={this.submitForm}
                    >RESET</button>
                </div>
            </div>
        )
    }

}

export default ResetPassword;
