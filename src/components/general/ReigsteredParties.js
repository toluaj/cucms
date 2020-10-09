import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import Nav from '../layouts/AdminSideBar';
import {API_URL} from "../../utils/config";

class ReigsteredParties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            logged: '',
            conference_id: '',
            conferences: [],
            reviews: [],
            feedback: '',
            abstract: '',
            path: '',
            id: '',
            email: '',
            name: '',
            parties: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.getParties = this.getParties.bind(this);

    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    componentWillMount() {
        this.fetchLoggedOnUser();
        this.getConferences();
    }

    // componentDidMount() {
    //     this.fetchLoggedOnUser();
    //     this.getConferences();
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
                this.setState({user: res.data.data, logged: 'true'}, () => console.log(this.state.user))
            }
            else {
                console.log('you are not logged in!')
                this.setState({logged: 'false'});
                window.location.replace('/login')
            }
        }).catch(err => {
            console.log('no authorization');
            toast.info("Please log in again. Session expired")
            this.setState({logged: 'false'});
            window.location.replace('/login')
        })
    }

    getConferences() {
            axios({
                method: 'get',
                url: 'http://localhost:8080/api/cu/parties',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                if(res.data){
                    console.log(res.data.data);
                    this.setState({
                        conferences: res.data.data
                        // }, () => {
                        //     this.getReviews(this.state.conference_id)
                    })
                    console.log(this.state.conference_id);
                }
            }).catch(err => {
                console.log(err.message);
            })

    }
    showConferences() {
        const { conferences } = this.state;

        if (conferences && conferences.length) {
            return (
                <div>
                    <select className="form-control" onChange={this.onChange}
                            style={{width: '15em',marginLeft: '1em',borderRadius: '7px',backgroundColor: '#e1e1e1'}} name="conference_id">
                        <option value="">Select Conference</option>
                        {conferences.map((conference) => {
                            return (
                                <option value={conference.conference_id}  key={conference.conference_id}>
                                    {conference.conference_name} </option>
                            );
                        })}
                    </select>
                </div>

            );
        }
        return (
            <div>
                <label className="label2 copy-font">Conference</label><br/>
                <small>No Conferences to display</small>
            </div>
        );
    }

    onSubmit = (e) => {

        e.preventDefault();

        const { reviews } = this.state;

        if (reviews && reviews.length) {
            return (
                <div>
                    <div className="container-fluid ml-5">
                        <div className="mt-3 limiter container-table100">
                            <div className="table-responsive content">
                                <table className="table copy-font wrap-table100" style={{width: '40em', marginLeft: '25em'}}>
                                    <thead style={{backgroundColor: 'teal'}}>
                                    <tr>
                                        <th>Conference Name</th>
                                        <th style={{marginLeft: '2em'}}>Assign Abstracts</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{backgroundColor: '#ebf5f3', borderRadius: '3em'}}>
                                    {reviews.map((rev, index) => (
                                        <tr key={index} data-index={index} className="rowed">
                                            {/*<td>{rev.name}</td>*/}
                                            <td>
                                                <i className="fa fa-level-down"
                                                   aria-hidden="true"
                                                    // onClick={this.showModal}
                                                   data-index={index}
                                                    // data-toggle="modal"
                                                    // data-target="#assign"
                                                   style={{marginLeft: '3em',cursor: 'pointer', width: '8em'}}></i>
                                                {/*<AbstractAssign*/}
                                                {/*    abstract={abstracts}*/}
                                                {/*    reviewer={reviewers}*/}
                                                {/*    conference_name={name}*/}
                                                {/*    conference_id={conference_id}*/}
                                                {/*/>*/}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <ToastContainer/>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }

    getParties = (e) => {
        e.preventDefault();
        const {conference_id} = this.state;
        const data = {conference_id}
        console.log(conference_id);
        axios({
            method: 'post',
            url: `${API_URL}/parties`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: data
        }).then(res => {

            console.log(res.data);
            this.setState({parties: res.data.data});

        }).catch(err => {
            console.log(err.message);
        })

    }

    showModal(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.reviews[index]);
        console.log(this.state.reviews[index].id);
        this.setState({
            feedback: this.state.reviews[index].feedback,
            abstract: this.state.reviews[index].abstract.abstract_text,
            path: this.state.reviews[index].abstract.path
        }, () => {
            console.log(this.state.feedback);
            console.log(this.state.abstract);
            console.log(this.state.path);
        })

    }

    render() {
        const {user, reviews, parties} = this.state;
        console.log(user);
        //     console.log(this.state.conference_id);
        // console.log(this.state.id);
        return(
            <div className="container-fluid" >
                <Nav user={user}/>
                <form className="wrapper">
                    <div className="row" style={{marginLeft: '5em'}}>
                        <div>
                            <label className="label2 copy-font mt-5" htmlFor="conference" aria-labelledby="conference">
                                <b> Select a Conference </b>
                            </label>
                            {this.showConferences()}
                        </div>
                        {user.firstName ?
                            <div className="" style={{marginLeft: '58em'}}><b>Hi, {user.firstName}</b></div>
                            : "" }
                    </div>
                    <button className="btn btn-block"
                            style={{backgroundColor: '#777777',
                                width: '15em', marginLeft: '6em', color: 'white',
                                borderRadius: '7px'}}
                            type="submit" onClick={e => this.getParties(e)}>
                        VIEW PARTIES
                    </button>
                </form>
                <div className="mt-3 limiter container-table100">
                    <div className="table-responsive content">
                        <table className="table copy-font wrap-table100"
                               style={{width: '50em', marginLeft: '30em'}}>
                            <thead style={{backgroundColor: 'white'}}>
                            <tr>
                                <th>FIRST NAME</th>
                                <th>LAST NAME</th>
                                {/*<th>Feedback</th>*/}
                                <th style={{marginLeft: '2em'}}>ROLE</th>
                                <th>AFFILIATION</th>
                                <th>EMAIL</th>
                            </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#F5F4F6', borderRadius: '3em'}}>
                            {parties.map((rev, index) => (
                                <tr key={index} data-index={index} className="rowed">
                                    <td>{rev.firstName}</td>
                                    <td>{rev.lastName}</td>
                                    <td>{(rev.role).toUpperCase()}</td>
                                    <td>{rev.affiliation}</td>
                                    <td>{rev.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReigsteredParties;