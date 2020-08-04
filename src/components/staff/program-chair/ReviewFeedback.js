import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import Nav from '../../layouts/AdminSideBar';
import FeedbackModal from "./FeedbackModal";

class ReviewFeedback extends Component {

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
            name: ''
        }
        this.getReviews = this.getReviews.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.acceptAbstract = this.acceptAbstract.bind(this);
        this.declineAbstract = this.declineAbstract.bind(this);
    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    componentWillMount() {
        this.fetchLoggedOnUser();
    }

    componentDidMount() {
        this.getConferences();
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
                            style={{width: '15em', backgroundColor: '#d1bebe'}} name="conference_id">
                        <option value=""></option>
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
                <label className="label2 copy-font">Conference</label>
                <small>No Conferences to display</small>
            </div>
        );
    }

    getReviews(e) {
        e.preventDefault();
        const {conference_id} = this.state;
        const data = {conference_id};

        axios({
            method: 'post',
            url: `http://localhost:8080/api/cu/review/get`,
            data: data
        }).then(res => {
            console.log(this.state.conference_id);
            console.log(res.data);
            this.setState({
                reviews: res.data.data
            }, () => console.log(this.state.reviews))
        }).catch(err => {
            console.log(err.message)
        })
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

    async acceptAbstract(e) {
        e.preventDefault();
        let index = +e.currentTarget.getAttribute('data-index');
        // console.log(this.state.reviews[index]);
        // console.log(this.state.reviews[index].abstract.id);
        // console.log(this.state.reviews[index].abstract.email);
        // console.log(this.state.reviews[index].abstract.conference.name);
        await this.setState({id: this.state.reviews[index].abstract.id,
                            email: this.state.reviews[index].abstract.email,
                            name: this.state.reviews[index].abstract.conference.name},
            () => console.log(this.state.id));
        var status = "accepted";
        const {id, email, name} = this.state;
        const data = {id, status, email, name};
        console.log(data);

        axios({
            method: 'put',
            url: 'http://localhost:8080/api/cu/abstract/upload',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {
                console.log(res.data);
            }
        })
    }

    async declineAbstract(e) {
        e.preventDefault();
        let index = +e.currentTarget.getAttribute('data-index');
        // console.log(this.state.reviews[index]);
        // console.log(this.state.reviews[index].abstract.id);
        // console.log(this.state.reviews[index].abstract.email);
        // console.log(this.state.reviews[index].abstract.conference.name);
        await this.setState({id: this.state.reviews[index].abstract.id,
                email: this.state.reviews[index].abstract.email,
                name: this.state.reviews[index].abstract.conference.name},
            () => console.log(this.state.id));
        var status = "declined";
        const {id, email, name} = this.state;
        const data = {id, status, email, name};
        console.log(data);

        axios({
            method: 'put',
            url: 'http://localhost:8080/api/cu/abstract/upload',
            data: data,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data) {
                console.log(res.data);
            }
        })
    }

    render() {
            const {user, reviews, abstract, path, feedback} = this.state;
        //     console.log(this.state.conference_id);
        // console.log(this.state.id);
        return(
          <div className="container-fluid" style={{marginLeft: '10em'}}>
              <Nav user={user}/>
              <h1>Choose conference </h1>
              <form className="wrapper">
                  <div className="row">
                      <div>
                          <label className="label2 copy-font mt-3" htmlFor="conference" aria-labelledby="conference">
                              Choose Conference
                          </label>
                          {this.showConferences()}
                      </div>
                  </div>
                  <button className="btn btn-dark" type="submit" onClick={this.getReviews}>
                      CHECK ABSTRACTS
                  </button>
              </form>
                  <div className="mt-3 limiter container-table100">
                      <div className="table-responsive content">
                          <table className="table copy-font wrap-table100" style={{width: '50em', marginLeft: '10em'}}>
                              <thead style={{backgroundColor: 'teal'}}>
                              <tr>
                                  <th>Main Author</th>
                                  <th>Abstract</th>
                                  {/*<th>Feedback</th>*/}
                                  <th style={{marginLeft: '2em'}}>Recommendation</th>
                                  <th>Status</th>
                                  <th>Response</th>
                              </tr>
                              </thead>
                              <tbody style={{backgroundColor: '#ebf5f3', borderRadius: '3em'}}>
                              {reviews.map((rev, index) => (
                                  <tr key={index} data-index={index} className="rowed">
                                      <td>{rev.abstract.firstName} {rev.abstract.lastName}</td>
                                      {/*<td>{rev.abstract.abstract_text}</td>*/}
                                      <td>
                                          <i className="fa fa-level-down"
                                             aria-hidden="true"
                                              onClick={this.showModal}
                                             data-index={index}
                                              data-toggle="modal"
                                              data-target="#feedback"
                                             style={{marginLeft: '3em',cursor: 'pointer', width: '8em'}}></i>
                                          <FeedbackModal
                                            feedback={feedback}
                                            abstract={abstract}
                                            path={path}
                                          />
                                      </td>
                                      <td>{rev.recommendation}</td>
                                      <td>{rev.abstract.status}</td>
                                      {rev.abstract.status === "pending" ? <td>
                                          {/*<button>*/}
                                          <i className="fa fa-check"
                                             onClick={this.acceptAbstract}
                                             aria-hidden="true"
                                             style={{cursor: 'pointer'}}
                                             data-index={index}>.</i>
                                          {/*</button>*/}
                                          {/*<button>*/}
                                          <i className="fa fa-times"
                                             aria-hidden="true"
                                             onClick={this.declineAbstract}
                                             data-index={index}
                                             style={{marginLeft: '1em', cursor: 'pointer'}}>.</i>
                                          {/*</button>*/}
                                      </td>: ""}
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

export default ReviewFeedback;