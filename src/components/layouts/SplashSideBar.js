import React, {Component} from 'react';


class SplashSideBar extends Component {


    render() {
        return(
        <div>
            <ul class="topnav">
            <li><a href="/">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="right"><a href="#about">About</a></li>
        </ul>
        </div>
        
        );
    }
}


export default SplashSideBar;