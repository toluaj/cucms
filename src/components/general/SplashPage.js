import React, {Component} from 'react';
import '../styles/styles.css';
import '../styles/home.css'
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';

class SplashPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return(
            <div className="container-fluid">
                <div className="row enter">
                    <p className="mr-5"><Link to="/submitabstract">Login</Link></p>
                    <p><Link to="/sign-up">Sign Up</Link></p>
                </div>
                <div className="jumbotron">
                    <div className="image">
                        <img src={logo}/>
                    </div>
                    <div className="head"> 
                    <h1>CUCMS</h1>
                    <p>A solution to manage conferences in Covenant University</p>  
                    </div>
                </div>
                <div className="row">
                    <nav className="d-flex col-lg-12">
                    <ul>
                        <li className="menu_item mr-5"><a href="">Home</a></li>
                        <li className="menu_item mr-5"><a href="">Events</a></li>
                        <li className="menu_item mr-5"><a href="">News</a></li>
                        <li className="menu_item mr-5"><a href="">Contact Us</a></li>
                    </ul>
                    </nav>
                </div>
                <div className="row">

                </div>
            </div>
        )
    }
}

export default SplashPage