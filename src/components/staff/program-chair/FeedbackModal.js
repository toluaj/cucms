import React, {Component} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
// import '../../styles/review.css'

class FeedbackModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {},
            logged: '',
            feedback: '',
            recommendation: '',
            abstract_id: ''
        }
        this.downloadFile = this.downloadFile.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
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
            toast.info("Please log in again. Session expired")
            this.setState({logged: 'false'});
            window.location.replace('/login')
        })
    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    downloadFile() {
        console.log(this.props.path);
        const {path} = this.props;
        console.log(path);
        window.open(`http://localhost:8080/uploads/${path}`);
    }

    // onSubmit(e) {
    //     e.preventDefault();
    //     const {id, conference_id} = this.props.abstract;
    //     const {feedback, recommendation} = this.state;
    //     const user_id = this.state.user.id;
    //     const abstract_id = id;
    //     console.log(abstract_id);
    //     console.log(conference_id);
    //     console.log(feedback);
    //     console.log(recommendation);
    //     console.log(user_id);
    //     const data = {abstract_id, conference_id, feedback, recommendation, user_id}
    //
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:8080/api/cu/review',
    //         data: data,
    //         headers: {
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //
    //     }).then(res => {
    //         console.log(res.data)
    //         window.location.reload();
    //     }).catch(err => {
    //         console.log(err);
    //     })
    //
    // }

    render() {
        const {user} = this.state;
        const {name, abstract, feedback} = this.props;
        console.log(abstract);
        return (
            <div
                id="feedback" className="modal fade in"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true">

                <div className="modal-dialog" style={{ width: '50em' }}>
                    <div className="modal-content" style={{ width: '50em', marginRight: '3em' }}>
                        <div className="modal-header">
                            <h4 className="modal-title text-center" id="myModalLabel">
                                {/*Review " {abstract.title} " by {abstract.firstName} {abstract.lastName}*/}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            {/*{abstract.abstract ?*/}
                                <div>
                                    <label htmlFor="text">Download Extended Paper</label>
                                    <i className="fa fa-download"
                                       aria-hidden="true"
                                       onClick={this.downloadFile}
                                       style={{width: '3em', cursor: 'pointer'}}></i> </div>
                                {/*: ""}*/}
                            <div>
                                <label htmlFor="text">Abstract Text</label>
                                <textarea name="text" id="text" value={abstract}
                                          cols="80" rows="10" className="form-control" readOnly></textarea>
                            </div>
                            <form>
                                <div className="container-rev">
                                    <div>
                                        <label htmlFor="feedback">Feedback</label>
                                        <textarea name="feedback" id="feedback"
                                                  value={feedback}
                                                  onChange={this.onChange}
                                                  cols="50" rows="10" className="form-control"></textarea>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <label className="mt-4">Do you recommend the publishing of this abstract?</label>*/}
                                    {/*    <div className="radio">*/}
                                    {/*        <input id="radio-1" className="rad" name="recommendation"*/}
                                    {/*               value="yes" type="radio" onChange={this.onChange}/>*/}
                                    {/*        <label for="radio-1" className="radio-label">Yes</label>*/}
                                    {/*    </div>*/}

                                    {/*    <div className="radio">*/}
                                    {/*        <input id="radio-2" name="recommendation" className="rad"*/}
                                    {/*               value="no" type="radio" onChange={this.onChange}/>*/}
                                    {/*        <label  for="radio-2" className="radio-label">No</label>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="modal-footer">*/}
                                    {/*    <button*/}
                                    {/*        type="button"*/}
                                    {/*        className="btn btn-primary"*/}
                                    {/*        style={{marginRight: '18em'}}*/}
                                    {/*        onClick={this.onSubmit}*/}
                                    {/*    >SUBMIT REVIEW</button>*/}
                                    {/*</div>*/}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default FeedbackModal;