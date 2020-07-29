import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Nav from '../../layouts/AdminSideBar'

class MakeReviewerRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            conferences: [],
            email: '',
            conference_name: '',
            user_id: '',
            conference_id: '',

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) =>
        this.setState({
     [e.target.name]: e.target.value,
   });

    componentWillMount() {
        this.fetchLoggedOnUser();

    }
    
    componentDidMount() {
        this.getUsers();
        this.getConferences();
    }


    // getUser() {
    //     axios({
    //         method: 'get',
    //         url: 'http://localhost:8080/api/cu/users/loggedOnUser',
    //         headers: {
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //     }).then((res) => {
    //         if(res.data) {
    //         console.log(res.data);
    //         this.setState({
    //             // user: res.data
    //         })
    //         }
    //         else {
    //             console.log('user don\'t exist bitch')
    //         }
    //     })
    //     .catch(err => {
    //         console.log('No authorization');
    //         console.log(err.message);
    //         toast.info("Please log in again. getuserSession expired")
    //     })
    // }

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

    //Return User Details

    getUsers() {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/users',

        }).then(res => {
            if(res.data){
                console.log(res.data);
                this.setState({users: res.data.data});
                console.log(this.state.users);
            }
        })
    }

  async  getName() { //Return Conference Name
    return    axios({
            method: 'get',
            url: `http://localhost:8080/api/cu/conference/conference/${this.state.conference_id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {
                console.log(res.data.data);
                console.log(this.state.conference_name);
                return res.data.data.name
            }
        }).catch(err =>{
            console.log(err.message);
        })

   

    }

     getId()  {
        return axios({

            method: 'get',
            url: `http://localhost:8080/api/cu/users/${this.state.user_id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {
                console.log(res.data.data.email);
                return res.data.data.email;
                
            }
        })
    }

    makeRequest(data) {

        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err.message);
        })

    }

   async  onSubmit(){

        const name = await this.getName();
        console.log("The conference name is below")
        console.log(name);
        console.log("The user mail is below")
       const mail = await this.getId();
       console.log(mail);
       
        // console.log(this.state.conference_id);
         console.log(this.state);

        console.log(this.state.conference_name);
        //SetState and make MakeRequest The call back of the set state
        this.setState({
            conference_name: name,
            email: mail
           }, () => {
            const {user_id,conference_id, email, conference_name} = this.state;
            const data = {user_id, conference_id, email, conference_name};
            this.makeRequest(data);
           console.log(this.state.conference_name, 'conference_name');
       })
    

        
        
    }

    showUsers() {
        const { users } = this.state;
    
        if (users && users.length) {
          return (
            <div>
              <label className="label2 copy-font">Users</label>
              <select className="form-control" onChange={this.onChange} style={{width: '15em'}} name="user_id">
                <option>Select User</option>
                {users.map((user) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {user.firstName} {user.lastName.toUpperCase()} {user.email}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }
        return (
          <div>
            <label className="label2 copy-font">User</label>
            <small>No Users to display</small>
          </div>
        );
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
                console.log(res.data);
                this.setState({
                    conferences: res.data.data
                })
            }
        })
    }

    showConferences() {
        const { conferences } = this.state;
    
        if (conferences && conferences.length) {
          return (
            <div>
              <label className="label2 copy-font">Conference</label>
              <select className="form-control" onChange={this.onChange} style={{width: '15em'}} name="conference_id">
                <option>Select Conference</option>
                {conferences.map((conference) => {
                  return (
                    <option value={conference.id}  key={conference.id}>
                      {conference.name}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }
        return (
          <div>
            <label className="label2 copy-font">Conference</label>
            <small>No Conferences to display</small>
          </div>
        );
    }

render() {
    console.log(this.state.conference_name)
    return(
       <div className="container-fluid ml-5">
           <Nav/>
           <form className="wrapper" onSubmit={e => e.preventDefault()}>
           <div className="ml-5">
           <div>
           <label className="label2 copy-font" htmlFor="conference" aria-labelledby="conference">
                Choose Conference
              </label>
               {this.showConferences()}
               </div>
           <div>
           <label className="label2 copy-font" htmlFor="user" aria-labelledby="user">
                Choose User
              </label>
               {this.showUsers()}
               </div>
           </div>
           <button onClick={this.onSubmit}
                   className="btn btn-block"
                   style={{backgroundColor: 'teal'}}>MAKE REQUEST</button>
           </form>
       </div>
    );

}

}
export default MakeReviewerRequest;