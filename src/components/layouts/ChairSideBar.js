import React, {Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import  SideNav, { Toggle, Nav, ClickOutside, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom';

class ChairSideBar extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <SideNav style={{backgroundColor: "teal", height: '100%'}}>
                <SideNav.Toggle style={{backgroundColor: "#d1bebe"}} />
                <SideNav.Nav  >
                    <NavItem eventKey="home">
                    <NavIcon><Link to="/" className="nav-link">
                            <i className="fa fa-fw fa-home" title="Home" style={{ fontSize: '2.2em' }} />
                            </Link>
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                        <i class="fa fa-server" title="Conferences" aria-hidden="true" style={{fontSize: '1.75em'}}></i>
                        </NavIcon>
                        <NavText>Conferences</NavText>
                        <NavItem>
                        <NavText><Link to="" className="nav-link"> Edit Conference </Link></NavText>
                    </NavItem>
                    <NavItem>
                        <NavText><Link to="" className="nav-link">  Call for papers </Link></NavText>
                    </NavItem>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                        <i class="fa fa-user" title="Profile" aria-hidden="true" style={{fontSize: '1.75em'}}></i>
                        </NavIcon>
                        <NavText>Profile</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                        <i class="fa fa-sign-out" title="Sign Out" aria-hidden="true" style={{fontSize: '1.75em'}}></i></NavIcon>
                        <NavText>Logout</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            </div>
        )
    }
}


export default ChairSideBar;