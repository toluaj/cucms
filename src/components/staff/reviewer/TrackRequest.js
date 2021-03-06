import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Side from '../../layouts/AdminSideBar';

class MakeRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            requests: [],
            conference_id: '',
            logged: ''
        }
        this.getRequests = this.getRequests.bind(this);
        
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


    getRequests = () => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/request/requests',
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

    // async getRequests (e) {
    //     let index = +e.currentTarget.getAttribute('data-index');
    //     console.log(this.state.requests[index]);
    //     console.log(this.state.requests[index].conference_id);
    //    await this.setState({conference_id: this.state.requests[index].conference_id})
    //    const {conference_id} = this.state;
    //     var reply = "accepted";
    //     const data = {reply, conference_id};
    //     console.log(data);
    //     axios({

    //         method: 'post',
    //         url: 'http://localhost:8080/api/cu/request/reply',
    //         data: data,
    //         headers: {
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
            
    //     }).then((res) => {
    //         console.log(res);
    //         if(res.data) {
    //             console.log(res.data);
    //         }
    //     }).catch(err => {
    //         console.log(err.message);
    //         console.log('something\'s up')
    //     })
    // }
    

render() {

    const {requests, user} = this.state;
    console.log(requests);
    console.log(user);
    console.log(this.state.conference_id);

    return(

       <div className="container-fluid">
           <ToastContainer/>
           <Side user={user}/>
           <div className="mt-3 limiter container-table100">
                    <div className="table-responsive content ">
                        <table className="table copy-font wrap-table100"
                         style={{maxWidth: '50em', marginLeft: '23em'}}>
                    <thead style={{backgroundColor: 'white'}}>
                    <tr>
                        <th>Conference Name</th>
                        <th>User Email</th>
                        <th>Request Type</th>
                        <th>Request Status</th>
                        {/*<th>Action</th>*/}
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#F5F4F6', borderRadius: '3em'}} >
                        {requests.length > 0 ? requests.map((req, index) => (
                            <tr key={index} data-index={index} className="rowed">
                                <td>{req.conference_name}</td>
                                <td>{req.email}</td>
                                <td>{req.type}</td>
                                <td>{req.reply}</td>
                                {/*{req.reply === "accepted" || req.reply === "rejected" ? "" : <td> <button>*/}
                                {/*    <i className="fa fa-check"*/}
                                {/*        onClick={this.accept}*/}
                                {/*        aria-hidden="true"></i>*/}
                                {/*    </button>*/}
                                {/*    <button>*/}
                                {/*     <i className="fa fa-times"*/}
                                {/*        aria-hidden="true" */}
                                {/*        onClick={this.decline}*/}
                                {/*        style={{marginLeft: '1em'}}></i>*/}
                                {/*    </button>*/}
                                {/*</td>}*/}
                            </tr>
                        )): "You have not made any requests at this time"}
                    </tbody>
            </table>
            </div>
            </div>
       </div>
    );

}

}
export default MakeRequest;