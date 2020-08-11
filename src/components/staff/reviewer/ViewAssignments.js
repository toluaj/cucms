import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../layouts/AdminSideBar';
import OneConfProgram from "../../general/OneConfProgram";
import ReviewAbstract from "./ReviewAbstract";

class ViewAssignments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            user: {},
            loading: '',
            abstracts: [],
            abstract_id: '',
            abstract: []
        }
        this.getAbstractDetails = this.getAbstractDetails.bind(this);
    }

    componentDidMount() {
        this.getAbstracts();
    }

    componentWillMount(){
        this.fetchLoggedOnUser();
    }

    async getAbstractDetails(e){
        e.preventDefault();
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.abstracts[index]);
        await this.setState({
            abstract_id: this.state.abstracts[index].abstract_id,
            name: this.state.abstracts[index].conference_name
        })
        const {abstract_id, name} = this.state;
        // const data = {id};
        console.log(abstract_id, name);

        axios({

            method: 'get',
            url: `http://localhost:8080/api/cu/abstract/${abstract_id}`,

        }).then(res => {
            if(res.data) {
                console.log(res.data);
                this.setState({abstract: res.data.data}, () => console.log(this.state.abstract))
            }
        }).catch(err => {
            toast.error("Something went wrong. Try again!")
        })
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

    getAbstracts() {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/assign/viewAssign',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data.data);
            this.setState({abstracts: res.data.data})
        }).catch(err => {
            console.log(err.message);
        })
    }

    render() {

        const {user, abstracts, name, abstract} = this.state;

        return (
            <div className="container-fluid ml-5">
                <ToastContainer/>
                <div className="mt-3 limiter container-table100">
                    <Nav user={user}/>
                    <div className="table-responsive content">
                        <table className="table copy-font wrap-table100" style={{width: '30em', marginLeft: '30em'}}>
                            <thead style={{backgroundColor: 'white'}}>
                            <tr>
                                <th>Conference Name</th>
                                <th style={{marginLeft: '2em'}}>View Abstract</th>
                            </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#F5F4F6', borderRadius: '3em'}}>
                            {abstracts.length > 0 ? abstracts.map((req, index) => (
                                <tr key={index} data-index={index} className="rowed">
                                    <td>{req.conference_name}</td>
                                    <td>
                                        <i className="fa fa-envelope"
                                           aria-hidden="true"
                                           data-toggle="modal"
                                           data-target="#review"
                                           onClick={this.getAbstractDetails}
                                           data-index={index}
                                           style={{marginLeft: '3em',cursor: 'pointer', width: '8em'}}></i>
                                        <ReviewAbstract name={name}
                                                        abstract={abstract} />
                                    </td>
                                </tr>
                            )): <tr style={{width: '50em'}}>You have not been assigned any abstracts to review</tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewAssignments;