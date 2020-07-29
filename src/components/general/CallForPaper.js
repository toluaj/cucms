import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import Nav from '../layouts/AdminSideBar';

class CallForPaper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferences: [],
            name: ''
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
            console.log(res.data);
          }
          else {
            console.log('you are not logged in!')
          }
        }).catch(err => {
          console.log('no authorization');
          toast.info("Please log in again. fetchlogged Session expired")
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

    async callForPaper(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.conferences[index]);
        console.log(this.state.conferences[index].name);
       await this.setState({name: this.state.conferences[index].name})
       const {name} = this.state;
       const data = {name};
       console.log(data);

       axios({

        method: 'post',
        url: 'http://localhost:8080/api/cu/conference/papercall',
        data: data,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }

       }).then(res => {
           console.log(res.data);
       })

    }

    render() {

        const {conferences} = this.state;

        return (
            <div className="container-fluid ml-5">
                <Nav/> 
                <div className="mt-3">
            <div className="table-responsive content">
                <table className="table copy-font" style={{width: '30em', marginLeft: '30em'}}>
                    <thead style={{backgroundColor: 'teal'}}>
                    <tr>
                        <th>Conference Name</th>
                        <th style={{marginLeft: '2em'}}>Call For Paper</th>
                    </tr>
                    </thead>
                    <tbody>
                        {conferences.map((req, index) => (
                            <tr key={index} data-index={index}>
                                <td>{req.name}</td>
                                <td> 
                                     {/* <button style={{}}> */}
                                     <i className="fa fa-bell"
                                        aria-hidden="true" 
                                        onClick={this.callForPaper}
                                        style={{marginLeft: '3em',cursor: 'pointer', width: '8em'}}></i>
                                     {/* </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>
            </div>
            </div>
        )
    }
}

export default CallForPaper;