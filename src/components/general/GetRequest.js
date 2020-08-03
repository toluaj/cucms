import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Side from '../layouts/AdminSideBar';

class MakeRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            requests: [],
            conference_id: '',
            logged: '',
            conference_name: ''
        }
        this.getRequests = this.getRequests.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
        this.acceptChair = this.acceptChair.bind(this);
        this.declineChair = this.declineChair.bind(this);
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

    async acceptChair (e) {
        let ind = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.requests[ind]);
        console.log(this.state.requests[ind].conference_id);
        console.log(this.state.requests[ind].conference_name);
        await this.setState({conference_id: this.state.requests[ind].conference_id, conference_name: this.state.requests[ind].conference_name})
        const {conference_id, conference_name} = this.state;
        const {email, firstName, lastName} = this.state.user;
        console.log(email, firstName, lastName);
        var reply = "accepted";
        const data = {reply, conference_id, email, firstName, lastName, conference_name};
        console.log(data);
        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/chair/reply',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }

        }).then((res) => {
            console.log(res);
            if(res.data) {
                console.log(res.data);
                window.location.reload();
            }
        }).catch(err => {
            console.log(err.message);
            console.log('something\'s up')
        })
    }

    async accept (e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.requests[index]);
        console.log(this.state.requests[index].conference_id);
       await this.setState({conference_id: this.state.requests[index].conference_id,
           conference_name: this.state.requests[index].conference_name})
       const {conference_id, conference_name} = this.state;
        const {email, firstName, lastName} = this.state.user;
        console.log(email, firstName, lastName);
        var reply = "accepted";
        const data = {reply, conference_id, email, firstName, lastName, conference_name};
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
                window.location.reload();
            }
        }).catch(err => {
            console.log(err.message);
            console.log('something\'s up')
        })
    }

    async declineChair (e) {
        let dex = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.requests[dex]);
        console.log(this.state.requests[dex].conference_id);
        await this.setState({conference_id: this.state.requests[dex].conference_id})
        const {conference_id} = this.state;
        var reply = "rejected";
        const data = {reply, conference_id};
        console.log(data);

        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/chair/reply',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }

        }).then((res) => {
            console.log(res);
            if(res.data) {
                console.log(res.data);
                // window.location.reload();
            }
        }).catch(err => {
            console.log(err.message);
            console.log('something\'s up')
        })
    }

    async decline (e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.requests[index]);
        console.log(this.state.requests[index].conference_id);
       await this.setState({conference_id: this.state.requests[index].conference_id})
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
                window.location.reload();
            }
        }).catch(err => {
            console.log(err.message);
            console.log('something\'s up')
        })
    }
    

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
                         style={{maxWidth: '40em', marginLeft: '25em'}}>
                    <thead style={{backgroundColor: 'teal'}}>
                    <tr>
                        <th>Conference Name</th>
                        <th>Request Type</th>
                        <th>Request Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#C7CED4', borderRadius: '3em'}} >
                        {requests.length > 0 ? requests.map((req, index) => (
                            <tr key={index} data-index={index} className="rowed">
                                <td  data-index={index} >{req.conference_name}</td>
                                <td>{req.type}</td>
                                <td>{req.reply}</td>
                                {/*{req.reply === "accepted" || req.reply === "rejected" ? "" :*/}
                                {/*    <td> */}
                                {/*    <button>*/}
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
                                {req.type === "chair" && req.reply === "pending" ?
                                    <td>
                                        {/*<button>*/}
                                            <i className="fa fa-check"
                                               onClick={this.acceptChair}
                                               aria-hidden="true"
                                                style={{cursor: 'pointer'}}
                                                data-index={index}>.</i>
                                        {/*</button>*/}
                                        {/*<button>*/}
                                            <i className="fa fa-times"
                                               aria-hidden="true"
                                               onClick={this.declineChair}
                                               data-index={index}
                                               style={{marginLeft: '1em', cursor: 'pointer'}}>.</i>
                                        {/*</button>*/}
                                    </td> :
                                    req.type === "reviewer" && req.reply === "pending" ?
                                        <td>
                                            {/*<button>*/}
                                                <i className="fa fa-check"
                                                   onClick={this.accept}
                                                   aria-hidden="true"
                                                   data-index={index}
                                                   style={{cursor: 'pointer'}}>.</i>
                                            {/*</button>*/}
                                            {/*<button>*/}
                                                <i className="fa fa-times"
                                                   aria-hidden="true"
                                                   onClick={this.decline}
                                                   data-index={index}
                                                   style={{marginLeft: '1em', cursor: 'pointer'}}>.</i>
                                            {/*</button>*/}
                                        </td> : ""}
                            </tr>
                        )): "You do not have any requests at this time"}
                    </tbody>
            </table>
            </div>
            </div>
       </div>
    );

}

}
export default MakeRequest;