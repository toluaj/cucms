import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../layouts/AdminSideBar';

class showConferences extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferences: [],
            name: '',
            user: '',
            loading: ''
        }
        this.callForPaper = this.callForPaper.bind(this);
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

    getConferences() {

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

    async chooseConference(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.conferences[index]);
        console.log(this.state.conferences[index].name);
       await this.setState({name: this.state.conferences[index].name})
       const {name} = this.state;
       const data = {name};
       console.log(data);

    }

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
                        <th style={{marginLeft: '2em'}}>View</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#ebf5f3', borderRadius: '3em'}}>
                        {conferences.map((req, index) => (
                            <tr key={index} data-index={index} className="rowed">
                                <td>{req.name}</td>
                                <td><i style={{cursor: 'pointer'}} class="fa fa-eye" aria-hidden="true"></i></td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            <ToastContainer/>
            </div>
            </div>
            </div>
        )
    }
}

export default showConferences;