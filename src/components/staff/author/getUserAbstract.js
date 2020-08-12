import React, {Component} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Side from '../../layouts/AdminSideBar';
import moment from "moment";
import UploadPaper from "./UploadPaper";

class getUserAbstract extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            abstracts: [],
            conference_id: '',
            logged: '',
            abstract: []
        }
        this.downloadFile = this.downloadFile.bind(this);
        this.getId = this.getId.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }

    componentDidMount() {
        this.getAbstracts();
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

    downloadFile(e) {
        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.abstracts[index]);
        console.log(this.state.abstracts[index].path);
        const path = this.state.abstracts[index].path;
        window.open(`http://localhost:8080/uploads/${path}`)
    }

    getAbstracts = () => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/abstract/upload',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then((res) => {
                if(res.data){
                    console.log(res.data.data);
                    this.setState({abstracts: res.data.data})
                    // window.open('http://localhost:8080/'+res.data.file);
                }
                else {
                    console.log('could not upload abstract!')
                }
            })
            .catch(err => {
                console.log("no authorization")
            })
    }

    getId = (e) => {

        let index = +e.currentTarget.getAttribute('data-index');
        console.log(this.state.abstracts[index]);
        this.setState({
            abstract: this.state.abstracts[index]
        }, () => console.log(this.state.abstract))

    }

    render() {

        const {user, abstracts, abstract} = this.state;

        return(

            <div className="container-fluid">
                <ToastContainer/>
                <Side user={user}/>
                <div className="mt-3 limiter container-table100">
                    <div className="table-responsive content ">
                        <table className="table copy-font wrap-table100"
                               style={{maxWidth: '50em', marginLeft: '22em'}}>
                            <thead style={{backgroundColor: 'white'}}>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Submission Date</th>
                                <th>Actions</th>
                                <th>Submit Paper</th>
                            </tr>
                            </thead>
                            <tbody style={{backgroundColor: '#F5F4F6', borderRadius: '3em'}} >
                            {abstracts.length > 0 ? abstracts.map((req, index) => (
                                <tr key={index} data-index={index} className="rowed">
                                    <td>{req.title}</td>
                                    <td>{req.status}</td>
                                    <td>{moment(req.created_at).format('DD/MM/YYYY')}</td>
                                    {req.path === "" ? "" : <td>
                                        <i className="fa fa-download"
                                           onClick={this.downloadFile}
                                           style={{cursor: 'pointer'}}
                                            data-index={index}
                                           aria-hidden="true"></i>
                                    </td>}
                                    {req.status === "accepted" ? <td>
                                        <i className="fa fa-upload"
                                           onClick={this.getId}
                                           style={{cursor: 'pointer'}}
                                           data-index={index}
                                           data-toggle="modal"
                                           data-target="#upload"
                                           aria-hidden="true"></i>
                                        <UploadPaper
                                            abstract={abstract}
                                            user={user}
                                        />
                                    </td>: 'N/A'}
                                </tr>
                            )): "You have not submitted any abstracts at this time"}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }

}
export default getUserAbstract;