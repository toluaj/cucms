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
            user: {},
            loading: '',
            type: ''

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

        const {history} = this.props;

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
                toast.success('Request made');
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        }).catch(err => {
            console.log(err.message);
        })

    }

   // async  onSubmit(){
   //
   //      const name = await this.getName();
   //      console.log("The conference name is below")
   //      console.log(name);
   //      console.log("The user mail is below")
   //     const mail = await this.getId();
   //     console.log(mail);
   //
   //      // console.log(this.state.conference_id);
   //       console.log(this.state);
   //
   //      console.log(this.state.conference_name);
   //      //SetState and make MakeRequest The call back of the set state
   //      this.setState({
   //          conference_name: name,
   //          email: mail
   //         }, () => {
   //          const {user_id,conference_id, email, conference_name, type} = this.state;
   //          const data = {user_id, conference_id, email, conference_name, type};
   //          this.makeRequest(data);
   //         console.log(this.state.conference_name, 'conference_name');
   //         console.log(data)
   //     })
   //
   //
   //
   //
   //  }

    async onSubmit ()  {
        const name = await this.getName();
        console.log("The conference name is below")
        console.log(name);
        this.setState({conference_name: name})
        const {email, conference_id, conference_name, type} = this.state;
        console.log(email, conference_id, conference_name, type);
        const data = {email, conference_id, conference_name, type};
        console.log(data);
        this.makeRequest(data);
    }

    showUsers() {
        const { users } = this.state;

        if (users && users.length) {
          return (
            <div>
              {/* <label className="label2 copy-font">Users</label> */}
              <select className="form-control" onChange={this.onChange}
               style={{width: '15em', backgroundColor: '#e2e2e2'}} name="user_id">
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
              {/* <label className="label2 copy-font">Conference</label> */}
              <select className="form-control" onChange={this.onChange}
               style={{width: '15em', backgroundColor: '#e2e2e2'}} name="conference_id">
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
            <h6 style={{marginBottom: '1em'}}>No Conferences to display</h6>
          </div>
        );
    }

    submitForm = () => {
        const {
            conference_id,
            email,
            type
        } = this.state;

        return (
            conference_id.length > 0 &&
            email.length > 0 &&
            type.length > 0
        );
    };

render() {
    console.log(this.state.conference_name);
    console.log(this.state.conference_id.length);
    console.log(this.state.type.length);
    console.log(this.state.email);
    const {user, email} = this.state;
    const isEnabled = this.submitForm();

    return(
       <div className="container-fluid mt-5" 
            style={{ width: '25em', border: '4px solid #e5e5e5', boxShadow: '5px 5px grey', backgroundColor: '#e5e5e5',
                marginLeft: '37em', borderRadius: '2em'}}>
           <Nav user={user}/>
           <form className="wrapper" onSubmit={e => e.preventDefault()} 
          //  style={{marginLeft: '30em'}}
           >
           <div className="ml-5">
           <div>
           <label className="label2 copy-font mt-3" htmlFor="conference" aria-labelledby="conference">
                {/*Choose Conference*/}
              </label>
               {this.showConferences()}
               </div>
           <div>
           <label className="label2 copy-font" htmlFor="user" aria-labelledby="user">
                {/*Choose User*/}
              </label>
               {/*{this.showUsers()}*/}
               <input
                   type="email"
                   name="email"
                   value={email}
                   onChange={this.onChange  }
                   className="mr-2"
                   placeholder="Enter email"
                   style={{backgroundColor: ''}}/>
               </div>
              <div>
              <label className="label2 copy-font" htmlFor="user" aria-labelledby="user">
                {/*Request Type*/}
                <select name="type" onChange={this.onChange}>
                  <option value="">Request Type</option>
                  <option value="Reviewer">Reviewer</option>
                  <option value="Chair">Program Chair</option>
                </select>
              </label>
              </div>
           </div>
           <button onClick={this.onSubmit}
                   className="btn btn-block"
                   disabled={!isEnabled}
                   style={{backgroundColor: '#0c081d', width: '15em', color: 'white',
                    marginLeft: '3em', marginBottom: '2em', fontFamily: 'Trebuchet MS'}}>MAKE REQUEST</button>
           </form>
       </div>
    );

}

}
export default MakeReviewerRequest;