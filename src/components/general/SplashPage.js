import React, {Component} from 'react';
import '../styles/home.css'
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import SplashSideBar from '../layouts/SplashSideBar';
import SideNav from '../layouts/AuthorSideBar';

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
                        <a href="/sign-up"><i class="fa fa-facebook" aria-hidden="true"></i></a>
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
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td  nowrap="no-wrap">Human and Computer Interaction</td>
                                    <td nowrap="no-wrap">Human and Computer Interaction</td>
                                    <td>For faster mobile-friendly development, use responsive display classes for showing
                                        and hiding elements by device. Avoid creating entirely different versions of the 
                                        same site, instead hide element responsively for each screen size.</td>
                                    <td>9-10-2020</td>
                                    <td>7-10-2020</td>
                                    <td>Ikota</td>
                                    {/* <td><Link className="link" to="/sign-up"><i class="fa fa-address-card" aria-hidden="true">
                                    </i></Link></td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default SplashPage