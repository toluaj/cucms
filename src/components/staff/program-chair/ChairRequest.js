import React, {Component} from 'react';
import axios from 'axios';

class ChairRequest extends Component {


    constructor(props) {
        super(props);

        this.state = {
            reply: ''
        }
        this.markCorrect = this.markCorrect.bind(this);
        this.markWrong = this.markWrong.bind(this);
    }

    markCorrect = (e) => {

        // e.preventDefault();

        this.setState({reply: "accepted"})

        const reply = "accepted";
        const { token } = this.props.match.params;
        const data = {reply, token};
        console.log(data);
        axios({

            method: 'get',
            url: 'http://localhost:8080/api/cu/request/chair/reply',
            data: data

        }).then((res) => {
            if(res.data) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err.message);
            console.log(err);
        })

    }

    markWrong = (e) => {
        // e.preventDefault();
        this.setState({reply: "rejected"})

        const {reply} = this.state;
        const { token } = this.props.match.params;
        const data = {reply, token};
        console.log(data);
        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/chair/reply',
            data: data

        }).then((res) => {
            if(res.data) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err.message);
            console.log(err);
        })

    }

    render() {
        return(
            <div className="text-align-center" style={{marginLeft: '40em'}}>
                <textarea cols="20" rows="3" placeholder="Do you accept this request?" readOnly></textarea>
                <br/>
                <i onClick={() => this.markCorrect()} className="fa fa-check" aria-hidden="true"></i>
                <i onClick={() => this.markWrong()} className="fa fa-times" aria-hidden="true" style={{marginLeft: '9em'}}></i>
            </div>
        )
    }

}

export default ChairRequest;