import React, {Component} from 'react';
import Nav from '../../layouts/AdminSideBar';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

class conferenceProgram extends Component {


    constructor(props) {
        super(props);

        this.state = {
            acts: [{ name: "", date: "", start_time: "", end_time: "", room: ""}],
            program: "",
            //  user: {}, logged: '',
            spaces_available: "", conference_id: '2'
        }
        this.deleteSession = this.deleteSession.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.fetchLoggedOnUser();
    }

    handleChange = (e) => {
        if(["name","date","start_time", "end_time", "room"].includes(e.target.name)) {
            let acts = [...this.state.acts]
            acts[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    deleteSession = (record) => {
        this.setState({
            acts: this.state.acts.filter
            (r => r!== record),
        });
    }

    addNewSession = (e) => {
        // e.preventDefault();
        this.setState((prevState) => ({
            acts: [...prevState.acts, {
            name: "", date: "", start_time: "", end_time: "", room: ""}],
        }));
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
            // this.setState({user: res.data.data, logged: 'true'})
          }
          else {
            console.log('you are not logged in!')
            // this.setState({logged: 'false'});
            window.location.replace('/login')
          }
        }).catch(err => {
          console.log('no authorization');
          toast.info("Please log in again. fetchlogged Session expired")
        //   this.setState({logged: 'false'});
          window.location.replace('/login')
        })
    }

      onSubmit = (e) => {

        e.preventDefault();

        var formData = new FormData();
        formData = this.state;
        let data = {formData: this.state}
        console.log(data);
        console.log(formData);

        axios({

                method: 'post',
                url: `http://localhost:8080/api/cu/activity`,
                data: formData,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if(res.data){
                    console.log(res.data);
                }
            }).catch(err=> {
                console.log('something wen twornhf')
                console.log(err.message);
            })
        
        // const data1 = this.state.sessionList;
        // var datha = {};
        // var data = {};
        // const {spaces, program} = this.state;
        // // let data = {'spaces': spaces, 'program': program};
        // for(var i=0; i<data1.length; i++) {
        //     console.log(this.state.sessionList[i]);
        //     datha = this.state.sessionList[i];
            
        //     data = {
        //             name: datha.name, 
        //             date: datha.date,
        //             start_time: datha.start_time,
        //             end_time: datha.end_time, 
        //             room: datha.room, 
        //             spaces, 
        //             program,
        //             conference_id: '2'};
        
        //     console.log(data);
        
        // axios({

        //     method: 'post',
        //     url: `http://localhost:8080/api/cu/activity`,
        //     data: data,
        //     headers: {
        //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        //     }
        // })
        // .then((res) => {
        //     if(res.data){
        //         console.log(res.data);
        //     }
        // }).catch(err=> {
        //     console.log('something wen twornhf')
        //     console.log(err.message);
        // })
        
        // }

      }

    render() {

        const {acts, program, spaces_available} = this.state;
        return(
            <div className="container-fluid prog" style={{maxWidth: '90%'}}>
                {/* <Nav user={user}/> */}
                <form className="form"onSubmit={this.onSubmit} onChange={this.handleChange}>
                <h5>Conference Program (you can edit this later)</h5>
                <div className="row">
                    <div className="col-sm-6">
                    <p>Program Name</p>
                    <input type="program"
                            name="program"
                            value={program}
                            onChange={this.onChange} />
                    </div>
                    <div className="col-sm-3">
                    <p>Available Spaces</p>
                    <input type="number"
                            name="spaces_available"
                            value={spaces_available}
                            onChange={this.onChange} />
                    </div>
                </div>
                <div className="table-responsive content">
              {acts.map((val, i) => {
                let name = `name-${i}`, date = `date-${i}`,
                    start_time = `start_time-${i}`, end_time = `end_time-${i}`,
                    room = `room-${i}`
                return (
                  <div className="sessions" >
                    <table className="table copy-font">
                    <thead>
                    <tr>Activity {i+1}</tr>
                    <tr>
                    <th>Name</th>
                    <th >Room</th>
                    <th className="date">Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={val.index}>
 	                  <td>
                       <input type="text"
                        name="name" 
                        id={name} data-id={i} className="progput-name" />
                    </td>
                    <td>
                    <select name="room" id={room} data-id={i} className="progput-room" >
                    <option value=""></option>
                    <option value="chapel">Chapel</option>
                    <option value="conference">Conference Room</option>
                    <option value="cucrid">CUCRID</option>
                    </select>
                    </td>
                    <td>
                    <input type="date"
                           name="date"
                           id={date}
                           data-id={i}
                           className="progput-date" />
                    </td>
                    <td>
                    <input type="time" name="start_time" id={start_time} data-id={i} className="progput-time" />
                    </td>
                    <td>
                    <input type="time" name="end_time" id={end_time} data-id={i} className="progput-time"/>
                    </td>
                    <td>
                    {
                    i===0?<button onClick={()=>this.addNewSession()} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                    : <button className="btn btn-danger" onClick={(() => this.deleteSession(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                    }
                    </td>
                    </tr >
                    </tbody>
                    <tfoot>
                    <tr><td colSpan="4">
                    <button onClick={()=>this.addNewSession()} type="button"
                    className="btn btn-primary text-center"><i 
                    className="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                    </td></tr>
                    </tfoot>
                    </table>
                   </div>
                )
              })}
                </div>
                <button type="submit"
                  className="btn btn-block confbut"
                  style={{marginRight: '40em', marginTop: '2em'}}
                  >
            SUBMIT
          </button>
            </form>
            <div className="footer">
         
        </div>
            </div>
        )
    }
}

export default conferenceProgram;