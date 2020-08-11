import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../layouts/AdminSideBar';
import AbstractAssign from "./AbstractAssign";

class AssignAbstract extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferences: [],
            name: '',
            user: {},
            logged: '',
            conference_id: '',
            abstracts: [],
            reviewers: []
        }
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.getConferences();

    }

    componentWillMount(){
        this.fetchLoggedOnUser();
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
            url: 'http://localhost:8080/api/cu/conference',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data){
                console.log(res.data.data);
                this.setState({
                    conferences: res.data.data
                })
            }
        })
    }

    getAbstracts(data) {

        axios({
            method: 'get',
            url: `http://localhost:8080/api/cu/abstract/view/${data}`,
        }).then(res => {
            console.log(res.data);
            this.setState({abstracts: res.data.data.rows}, () => console.log(this.state.abstracts))
        }).catch(err => {
            console.log(err.message)
        })
    }

    getReviewers(data) {

        axios({
            method: 'get',
            url: `http://localhost:8080/api/cu/parties/${data}`,
        }).then(res => {
            console.log(res.data);
            this.setState({reviewers: res.data.data}, () => console.log(this.state.reviewers))
        }).catch(err => {
            console.log(err.message);
        })

    }

    showModal(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.conferences[index]);
        console.log(this.state.conferences[index].id);
        this.setState({
            conference_id: this.state.conferences[index].id,
            name: this.state.conferences[index].name,
        }, () => {
            const {conference_id} = this.state;
            this.getAbstracts(conference_id);
            this.getReviewers(conference_id)
            console.log(this.state.conference_id)
        })

    }

    // async show(e) {
    //     let index = +e.currentTarget.getAttribute('data-index');
    //     console.log(this.state.conferences[index]);
    //     console.log(this.state.conferences[index].name);
    //     await this.setState({name: this.state.conferences[index].id})
    //     const {name} = this.state;
    //     const data = {name};
    //     console.log(data);
    //
    //     axios({
    //
    //         method: 'post',
    //         url: 'http://localhost:8080/api/cu/conference/',
    //         data: data,
    //         headers: {
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //
    //     }).then(res => {
    //         if(res.data) {
    //             toast.success("Emails sent!");
    //             console.log(res.data);
    //         }
    //     }).catch(err => {
    //         toast.error("Something went wrong. Try again!")
    //     })
    //
    // }

    render() {

        const {conferences, user, abstracts, reviewers, name, conference_id} = this.state;

        return (
            <div className="container-fluid ml-5">
                <div className="mt-3 limiter container-table100">
                    <Nav user={user}/>
                    <div className="table-responsive content">
                        <table className="table copy-font wrap-table100" style={{width: '40em', marginLeft: '25em'}}>
                            <thead style={{backgroundColor: 'white'}}>
                            <tr>
                                <th>Conference Name</th>
                                <th style={{marginLeft: '2em'}}>Assign Abstracts</th>
                            </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#F5F4F6', borderRadius: '3em'}}>
                            {conferences.map((req, index) => (
                                <tr key={index} data-index={index} className="rowed">
                                    <td>{req.name}</td>
                                    <td>
                                        <img
                                            className="reg"
                                            src="https://res.cloudinary.com/dthdj5bkt/image/upload/c_scale,w_15/v1597104154/assignment.svg"
                                           aria-hidden="true"
                                           onClick={this.showModal}
                                           data-index={index}
                                           data-toggle="modal"
                                           data-target="#assign"
                                           style={{cursor: 'pointer', width: '8em'}}
                                        />
                                            <AbstractAssign
                                                abstract={abstracts}
                                                reviewer={reviewers}
                                                conference_name={name}
                                                conference_id={conference_id}
                                            />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssignAbstract;