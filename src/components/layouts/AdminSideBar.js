import React, {Component, useRef} from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import  SideNav, { Toggle, Nav, ClickOutside, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from 'react-router-dom';
import logo from '../images/logo.png'

class AdminSideBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            navigate: false
        }

        this.logout = this.logout.bind(this);
    }

    logout = () => {
        sessionStorage.setItem('token', '')
        sessionStorage.clear('token');
        this.setState({navigate: true})
        toast.success('logged out');

    }

    render() {
        const {navigate} = this.state;
        const {role} = this.props.user;

        if(navigate) {
            return <Redirect to="/login" push={true} />
        }
        return (
            <div>
                <SideNav style={{backgroundColor: "#2E294E", height: '200%', paddingBottom  : '30px'}}>
                {/*<SideNav.Toggle style={{backgroundColor: "#2E294E", backgroundImage: {logo}}} />*/}
                    <Toggle componentClass={(obj) => { return ( <img className=""
                                                                             style={{ height: '40px', width: '60px', marginLeft: '7px',
                                                                                 marginTop: '10px', marginBottom: '10px'}}
                                                                             src={logo} /> ); }} />
                <SideNav.Nav  >
                    <NavItem eventKey="home">
                    <NavIcon><Link to="/" className="nav-link">
                            <i className="fa fa-fw fa-home" title="Home" style={{ fontSize: '2.2em'}} />
                            </Link>
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                        <i class="fa fa-server" title="Conferences" aria-hidden="true" style={{fontSize: '1.75em'}}></i>
                        </NavIcon>
                        <NavText>Conferences</NavText>
                    {role === "admin" ?
                        <NavItem>
                        <NavText><Link to="/createconference" className="nav-link"> Add Conference </Link></NavText>
                    </NavItem> : ""}
                    {role === "chair" || role === "admin" ?
                    <NavItem>
                        <NavText><Link to="/requests" className="nav-link"> Track Requests </Link></NavText>
                    </NavItem> : ""}
                    {/*{role === "chair" || role === "admin" ?*/}
                    {/*<NavItem>*/}
                    {/*    <NavText><Link to="" className="nav-link"> Edit Conference </Link></NavText>*/}
                    {/*</NavItem> : ""}*/}
                    {/*{role === "admin" ?*/}
                    {/*<NavItem>*/}
                    {/*    <NavText><Link to="/confprogram" className="nav-link"> Create Sessions </Link></NavText>*/}
                    {/*</NavItem> : ""}*/}
                    {role === "chair" ?
                    <NavItem>
                        <NavText><Link to="/confprogram" className="nav-link"> Create Sessions </Link></NavText>
                    </NavItem> : ""}
                    {role === "chair" || role === "admin"?
                    <NavItem>
                        <NavText><Link to="/parties" className="nav-link"> View Registered Parties </Link></NavText>
                    </NavItem> : ""}
                    {role === "chair" ?
                    <NavItem>
                         <NavText><Link to="/abstract-review" className="nav-link"> Accept/Reject Abstracts </Link></NavText>
                    </NavItem> : ""}
                    <NavItem>
                        <NavText><Link to="/submitabstract" className="nav-link">  Submit Abstract </Link></NavText>
                    </NavItem>
                    {role === "chair" || role === "admin" ?
                    <NavItem>
                        <NavText><Link to="/callforpaper" className="nav-link">  Call for papers </Link></NavText>
                    </NavItem> : ""}
                    {role === "chair" || role === "admin" ?
                     <NavItem>
                        <NavText><Link to="/make-request" className="nav-link">  Request Reviewer/Chair </Link></NavText>
                    </NavItem> : ""}
                   {role === "chair" || role === "admin" ?
                     <NavItem>
                        <NavText><Link to="/assign-abstract" className="nav-link">  Assign Abstracts to Reviewers </Link></NavText>
                    </NavItem> : ""}
                    {role === "chair" || role === "admin" ?
                    <NavItem>
                          <NavText><Link to="/abstract-review" className="nav-link">  Review Feedback </Link></NavText>
                    </NavItem> : ""}
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                        <i class="fa fa-user" title="Profile" aria-hidden="true" style={{fontSize: '1.75em'}}></i>
                        </NavIcon>
                        <NavText>Profile</NavText>
                        <NavItem>
                        <NavText><Link to="/editprofile" className="nav-link"> Edit Profile </Link></NavText>
                    </NavItem>
                      {role !== "user" ?
                        <NavItem>
                            <NavText><Link to="/assignedAbstracts" className="nav-link"> View Assigned Abstracts </Link></NavText>
                        </NavItem>: ""}
                        <NavItem>
                            <NavText><Link to="/track-abstract" className="nav-link">  Abstract Status </Link></NavText>
                        </NavItem>
                        <NavItem>
                            <NavText><Link to="/request" className="nav-link"> View Requests </Link></NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                        <i class="fa fa-sign-out"
                           title="Sign Out"
                           aria-hidden="true" 
                           onClick={this.logout}
                           style={{fontSize: '1.75em'}}></i></NavIcon>
                        <NavText>Logout</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            </div>
        )
    }
}


export default AdminSideBar;