import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';


class MakeRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            requests: []
        }
        this.getRequests = this.getRequests.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }
    
    componentDidMount() {
        this.getUser();
        this.getRequests();
    }

    getUser() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/users/loggedOnUser',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if(res.data) {
            console.log(res.data);
            this.setState({
                user: res.data
            })
            }
            else {
                console.log('user don\'t exist bitch')
            }
        })
        .catch(err => {
            console.log('No authorization');
            console.log(err.message);
            toast.info("Please log in again. getuserSession expired")
        })
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
    


render() {

    const {requests} = this.state;
    console.log(requests);

    return(

       <div className="container-fluid">
           <ToastContainer/>
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
                        {requests.map((req, i) => (
                            <tr key={i + 1}>
                                <td>{req.conference_name}</td>
                                <td>{req.reply}</td>
                                <td> <i className="fa fa-check" aria-hidden="true"></i>
                                <i className="fa fa-times" aria-hidden="true" style={{marginLeft: '9em'}}></i></td>
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