import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../layouts/AdminSideBar';

class Session extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferences: [],
            name: '',
            user: {},
            loading: '',
            sessions: ''
        }
        this.chooseSession = this.chooseSession.bind(this);
        this.getConferences = this.getConferences.bind(this);
        // this.showSession = this.showSession.bind(this);
    }

    componentDidMount() {
        this.getConferences();

    }

    componentWillMount(){
        this.fetchLoggedOnUser();
    }

    fetchLoggedOnUser() {
        axios({

            method: 'get',
            url: `http://localhost:8080/api/cu/users/logged`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.data) {
                console.log(res.data.data);
                this.setState({user: res.data.data, logged: 'true'})
            }
            else {
                console.log('you are not logged in!')
                this.setState({logged: 'false'});
                window.location.replace('/login')
            }
        }).catch(err => {
            console.log('no authorization');
            toast.info("Please log in again. fetchlogged Session expired")
            this.setState({logged: 'false'});
            window.location.replace('/login')
        })
    }

    async getConferences(e) {
        // let index = +e.currentTarget.getAttribute('data-index');
        // console.log(this.state.conferences[index]);
        // console.log(this.state.conferences[index].name);
        // await this.setState({name: this.state.conferences[index].name})
        // const {name} = this.state;
        // const data = {name};
        // console.log(data);
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/conference',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data){
                console.log(res.data.data);
                this.setState({
                    conferences: res.data.data
                })
            }
        })
    }

    async chooseSession(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.conferences[index]);
        console.log(this.state.conferences[index].sessions);
        await this.setState({sessions: this.state.conferences[index].sessions})
        const {sessions} = this.state;
        // const data = {sessions};
        console.log(sessions);

        window.location.replace('/confprogram');
        // this.showSession();

        // axios({
        //     method: 'get',
        //     url: 'http://localhost:8080/api/cu/conference',
        //     headers: {
        //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        //     }
        //
        // }).then(res => {
        //     if(res.data) {
        //         toast.success("Emails sent!");
        //         console.log(res.data);
        //     }
        // }).catch(err => {
        //     toast.error("Something went wrong. Try again!")
        // })

    }

    // showSession() {
    //     console.log(this.state.sessions);
    //     let rows = parseInt(this.state.sessions)
    //     for(let i=1; i<rows; i++) {
    //         return (
    //             <div>
    //                 <p>Session {i}</p>
    //                 <button>Edit Session</button>
    //             </div>
    //         )
    //     }
    // }

    render() {

        const {conferences, user} = this.state;

        return (
            <div className="container-fluid ml-5">
                <div className="mt-3 limiter container-table100">
                    <Nav user={user}/>
                    <div className="table-responsive content">
                        <table className="table copy-font wrap-table100" style={{width: '30em', marginLeft: '30em'}}>
                            <thead style={{backgroundColor: 'teal'}}>
                            <tr>
                                <th>Conference Name</th>
                                <th style={{marginLeft: '2em'}}>Sessions</th>
                                <th>Edit Sessions</th>
                            </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#ebf5f3', borderRadius: '3em'}}>
                            {conferences.map((req, index) => (
                                <tr key={index} data-index={index} className="rowed">
                                    <td>{req.name}</td>
                                    <td>{req.sessions}</td>
                                    <td><button data-index={index} onClick={this.chooseSession}></button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/*{this.showSession()}*/}
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Session;