import React, {Component} from 'react';
import axios from 'axios';

class Request extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // reply: ''
        }
        this.markCorrect = this.markCorrect.bind(this);
        this.markWrong = this.markWrong.bind(this);
    }

    // componentDidMount(){
    //     this.markCorrect();
    // }

    markCorrect() {

        // e.preventDefault();

        // this.setState({reply: "accepted"})
        var reply = "accepted";
        const { token } = this.props.match.params;
        const data = {reply, token};
        console.log(data);
        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/reply',
            data: data
            
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

    markWrong = (e) => {
        // e.preventDefault();
        // this.setState({reply: "rejected"})

        const reply = "rejected";
        const data = {reply};
        console.log(data);
        axios({

            method: 'post',
            url: 'http://localhost:8080/api/cu/request/reply',
            data: data

        }).then((res) => {
            if(res.data) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err.message);
        })

    }

    render() {
        return(
            <div className="text-align-center" style={{marginLeft: '40em'}}>
                <textarea cols="20" rows="3" placeholder="Do you accept this request?" readOnly></textarea>
                <br/>
                <button type="submit" onClick={this.markCorrect}>
                    {/* <i className="fa fa-check" aria-hidden="true"> */}
                        </button>
                <i onClick={this.markWrong} className="fa fa-times" aria-hidden="true" style={{marginLeft: '9em'}}></i>
            </div>
        )
    }

}

export default Request;