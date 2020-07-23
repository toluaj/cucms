import React, {Component} from 'react';
import Nav from '../../layouts/ChairSideBar';
import axios from 'axios';

class conferenceProgram extends Component {


    constructor(props) {
        super(props);

        this.state = {
            sessionList: [{ name: "", date: "", start_time: "", end_time: "", room: ""}]
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
            let sessionList = [...this.state.sessionList]
            sessionList[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    deleteSession = (record) => {
        this.setState({
            sessionList: this.state.sessionList.filter
            (r => r!== record),
        });
    }

    addNewSession = (e) => {
        // e.preventDefault();
        this.setState((prevState) => ({
            sessionList: [...prevState.sessionList, {
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
            console.log(res.data);
          }
          else {
            console.log('you are not logged in!')
          }
        }).catch(err => {
          console.log('no atowizason');
        })
      }

      onSubmit = (e) => {

        e.preventDefault();
        
        const data1 = this.state.sessionList;
        var datha = {};
        let data= {};
        for(var i=0; i<data1.length; i++) {
            console.log(this.state.sessionList[i]);
            datha = this.state.sessionList[i];
            
            data = {name: datha.name, date: datha.date,
                    start_time: datha.start_time, end_time: datha.end_time, 
                    room: datha.room};
            console.log(data);
        axios({

            method: 'post',
            url: `http://localhost:8080/api/cu/activity`,
            data: data,
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
        
        }

      }

    render(){

        const {sessionList} = this.state;
        return(
            <div className="container-fluid prog">
                {/* <Nav/> */}
                <form className="form"onSubmit={this.onSubmit} onChange={this.handleChange}>
                <h5>Conference Program (you can edit this later)</h5>
                <div className="table-responsive content">
              {sessionList.map((val, i) => {
                let name = `name-${i}`, date = `date-${i}`,
                    start_time = `start_time-${i}`, end_time = `end_time-${i}`,
                    room = `room-${i}`
                return (
                  <div className="sessions">
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