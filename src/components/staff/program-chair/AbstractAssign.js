import React, {Component} from 'react';
import axios from 'axios';

class AbstractAssign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            abstract_id: '',
            reviewer_id: ''
        }
        this.onChange = this.onChange.bind(this);
        this.showAbstracts = this.showAbstracts.bind(this);
        this.showReviewers = this.showReviewers.bind(this);
        this.assignAbstract = this.assignAbstract.bind(this);
    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    showAbstracts() {
        const { abstract } = this.props;
        console.log(abstract);
        if (abstract && abstract.length) {
            return (
                <div>
                    <select className="form-control" onChange={this.onChange}
                            style={{width: '15em', backgroundColor: '#e2e2e2'}} name="abstract_id">
                        <option>Select User</option>
                        {abstract.map((abs) => {
                            return (
                                <option value={abs.id} key={abs.id}>
                                    {abs.firstName} {abs.lastName} {abs.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        }
        return (
            <div>
                {/*<label className="label2 copy-font">User</label>*/}
                <small>No Abstracts to display</small>
            </div>
        );
    }

    showReviewers() {
        const { reviewer } = this.props;
        console.log(reviewer);
        if (reviewer && reviewer.length) {
            return (
                <div>
                    <select className="form-control" onChange={this.onChange}
                            style={{width: '15em', backgroundColor: '#e2e2e2'}} name="reviewer_id">
                        <option>Select Reviewer</option>
                        {reviewer.map((rev) => {
                            return (
                                <option value={rev.user_id} key={rev.user_id}>
                                    {rev.firstName} {rev.lastName} {rev.email}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        }
        return (
            <div>
                {/*<label className="label2 copy-font">User</label>*/}
                <small>No Abstracts to display</small>
            </div>
        );
    }

    assignAbstract(e) {
        e.preventDefault();
        const {reviewer_id, abstract_id} = this.state;
        const {conference_name, conference_id} = this.props;
        const data = {reviewer_id, abstract_id, conference_id, conference_name};
        // console.log(this.props.name);
        // console.log(this.props.conference_id);
        console.log(data);
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/cu/assign',
            data: data
        }).then(res => {
            console.log(res.data);
            window.location.reload();

        }).catch(err => {
            console.log(err.message);
        })
    }

    render() {
        console.log(this.props);
        const {conference_name} =this.props;
        return(
            <div
                id="assign"
                className="modal fade in"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" style={{ width: '600px' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center" id="myModalLabel">
                                Assign Abstracts for "{conference_name}"
                            </h4>
                            <button type="button" className="close" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        <p style={{ textAlign: 'left' }}>
                                            Assign an Abstract to a Reviewer
                                        </p>
                                    </label>
                                     {/*<label htmlFor="recipient-name" className="col-form-label">Name:</label>*/}
                                    <label className="col-form-label copy-font" htmlFor="abstract_id" aria-labelledby="abstract_id">
                                        Select Abstract
                                    </label>
                                    {this.showAbstracts()}
                                    <label className="col-form-label copy-font" htmlFor="abstract_id" aria-labelledby="abstract_id">
                                        Select Reviewer
                                    </label>
                                    {this.showReviewers()}
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-block"
                                            style={{marginLeft: '7em', position: 'left', backgroundColor: '#0c081d', color: 'white'}}
                                            onClick={this.assignAbstract}
                                        >
                                            ASSIGN ABSTRACT
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AbstractAssign;