import React, {Component} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import  SideNav, { Toggle, Nav, ClickOutside, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom';

class AuthorSideBar extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <SideNav style={{backgroundColor: "teal", height: "100%"}}>
                <SideNav.Toggle style={{backgroundColor: "rgb(201,182,182)"}} />
                <SideNav.Nav  >
                    <NavItem eventKey="home">
                    <NavIcon><Link to="/" className="nav-link">
                            <i className="fa fa-fw fa-home" title="Home" style={{ fontSize: '2.2em' }} />
                            </Link>
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    {/* <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>Charts</NavText>
                        <NavItem eventKey="charts/linechart">
                        <NavText><Link to="/" className="nav-link">Line Chart</Link></NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText><Link to="/sign-up" className="nav-link">Bar Chart</Link></NavText>
                        </NavItem>
                    </NavItem> */}
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
export default AuthorSideBar;