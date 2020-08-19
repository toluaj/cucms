import React, {Component} from 'react';


class SplashSideBar extends Component {


    render() {
        const {user} = this.props;
        console.log(user);
        return(
            <div id="">
        <div>
            <ul class="topnav">
            {/*<li><a href="/">Home</a></li>*/}
            {/*<li><a href="#news">News</a></li>*/}
            {/*<li><a href="/contact">Contact Us</a></li>*/}

            </ul>
        </div>

        {user.firstName ?
            <div>
                <div className="dropdown" style={{marginRight: '6em', fontFamily: 'Trebuchet MS'}}><b>Hi, {user.firstName}</b></div>
         <div className="dropdown" >
           <a className="right" href="/editprofile"><i className="fa fa-user-circle user-icon" aria-hidden="true">
                </i></a>
            </div>
            </div>
             :

            <div>
                <div className="dropdown" >
                    <a className="right"><i className="fa fa-user-circle user-icon" aria-hidden="true">
                    </i></a>
                    <div className="dropdown-content">
                        <li className=""><a href="login">Sign In</a></li>
                        <li className=""><a href="sign-up">Sign Up</a></li>
                    </div>
                </div>
            </div>
            } 
        </div>
        );
    }
}


export default SplashSideBar;