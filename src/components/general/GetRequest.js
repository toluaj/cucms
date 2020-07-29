import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Side from '../layouts/AuthorSideBar';

class MakeRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            requests: [],
            conference_id: ''
        }
        this.getRequests = this.getRequests.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }
    
    componentDidMount() {
        this.getRequests();
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

    getRequests = () => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/request',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {

                console.log(res.data.data);
                this.setState({
                    requests: res.data.data       
                })

            } 
        }).catch(err => {
            console.log(err.message);
        })
    }

    async accept  (e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.requests[index]);
        console.log(this.state.requests[index].conference_id);
       await this.setState({conference_id: this.state.requests[index].conference_id})
       const {conference_id} = this.state;
        var reply = "accepted";
        const data = {reply, conference_id};
        console.log(data);
        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/reply',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            
        }).then((res) => {
            console.log(res);
            if(res.data) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err.message);
            console.log('something\'s up')
        })
    }

    decline = (e) => {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.requests[index]);
        console.log(this.state.requests[index].conference_id);
        this.setState({conference_id: this.state.requests[index].conference_id})
        const {conference_id} = this.state;
        var reply = "rejected";
        const data = {reply, conference_id};
        console.log(data);
        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/reply',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            
        }).then((res) => {
            console.log(res);
            if(res.data) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err.message);
            console.log('something\'s up')
        })
    }
    

render() {

    const {requests} = this.state;
    console.log(requests);
    console.log(this.state.conference_id);

    return(

       <div className="container-fluid">
           <ToastContainer/>
           <Side/>
           <div className="mt-3">
            <div className="table-responsive content">
                <table className="table copy-font">
                    <thead style={{backgroundColor: 'teal'}}>
                    <tr>
                        <th>Conference Name</th>
                        <th>Request Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, index) => (
                            <tr key={index} data-index={index}>
                                <td>{req.conference_name}</td>
                                <td>{req.reply}</td>
                                <td> <button>
                                    <i className="fa fa-check"
                                        onClick={this.accept}
                                        aria-hidden="true"></i>
                                    </button>
                                     <i className="fa fa-times"
                                        aria-hidden="true" 
                                        onClick={this.decline}
                                        style={{marginLeft: '9em'}}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>
            </div>
       </div>
    );

}

}
export default MakeRequest;