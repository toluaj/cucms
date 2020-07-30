import React, {Component} from 'react';


class SplashSideBar extends Component {


    render() {
        return(
            <div id="main">
        <div>
            <ul class="topnav">
            <li><a href="/">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        </div>
        {this.props.user ?
         <div className="dropdown">
           <a className="right" href="/editprofile"><i className="fa fa-user-circle user-icon" aria-hidden="true">
                </i></a>
            </div>
             : 
            <div className="dropdown">
            <a className="right"><i className="fa fa-user-circle user-icon" aria-hidden="true">
                 </i></a>
             <div className="dropdown-content">
             <li className=""><a href="login">Sign In</a></li>
             <li className=""><a href="sign-up">Sign Up</a></li>
             </div>
             </div> 
            } 
        </div>
        );
    }
}


export default SplashSideBar;