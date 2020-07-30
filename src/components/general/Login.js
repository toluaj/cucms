import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/login.css';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            userDetails: {},
            navigate: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange = (e) =>
        this.setState({

         [e.target.name]: e.target.value,

      });

    onSubmit = () => {

      const {email, password} = this.state;
      const data = {email, password};
      console.log(data);

      axios({
        method: 'post',
        url: `http://localhost:8080/api/cu/users/login`,
        data: data
      }).then((res) => {
        if(res.data.status === 'success' && res.data.data.active === true) {
          console.log(res.data);
          sessionStorage.setItem('token', res.data._token);
          this.setState({navigate: true});
          toast.success("Login success");
          try {
            axios({
              method: 'get',
              url: `http://localhost:8080/api/cu/users/logged`,
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
            }).then((res) => {
              if(res.data.status === 'success'){
                console.log(res.data);
              this.setState({
                userDetails: res.data,
                navigate: true
              })
            }
            else {
              console.log("verify your email");
              toast.info("Invalid parameters")
            }
            }) 
          } catch(e) {
            console.log(e);
          }
        }
        else if(res.data.message === "Invalid password!") {
            console.log('password aint right');
            toast.error('Invalid Password. Check again');
        }
        else {
          toast.error('Invalid email!');
          console.log('problem');
        }
      }).catch(err => {
        console.log(err.message);
        console.log('her i am')
      })
    } 


    render() {

        const {email, password, navigate, userDetails} = this.state;
        console.log(userDetails);

        if(navigate){return <Redirect to="/" push={true}/>}
        return (
            <div className="base-container">
        <div className="content">
          <div className="image mt-5 ml-5">
            <img src={logo} />
          </div>
          <ToastContainer/>
        <div className="header mr-4">CUCMS Login</div>
          <form onSubmit={this.onSubmit}>
          <div className="form">
            <div className="form-group">
              <label for="email" className="">Email Address</label>
              <input type="email"
               name="email"
               value={email}
               onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label for="password" className="">Password</label>
              <input type="password" name="password"
              value={password}
              onChange={this.onChange} /><p className="mt-2">Forgot Password?</p>
            </div>
            {/* <div className="form-group">
              <label for="remember" className="remember">
              <input type="checkbox" id="remember" name="remember"
                value="remember-me"/>Remember me?
                </label>
            </div> */}
          </div>
          </form>
        </div>
          <button type="button" className="btn loginbtn" onClick={this.onSubmit}>
            Login
          </button>
          <footer className="">
              Don't have an account? <Link to="/sign-up">Sign Up</Link> </footer>
      </div>
        );
    }

}


export default Login;