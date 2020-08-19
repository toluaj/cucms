import React, {Component} from 'react';
import axios from 'axios';



class UploadPaper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            conference_id: '',
            paper: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.upload = this.upload.bind(this);
    }

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    handleChange = (e) => {
        const paper = e.target.files[0]; // accesing file
        console.log(paper);
        this.setState({
            paper: paper
        }, () => console.log('paper'))
    }

    upload = (e) => {

        e.preventDefault();
        const formData = new FormData();
        const {conference_id} = this.props.abstract;
        const {title, paper} = this.state;

        console.log(conference_id);
        formData.append('paper', paper);
        formData.append('title', title);
        formData.append('conference_id', conference_id);

        axios({
            method: 'post',
            url: `http://localhost:8080/api/cu/paper/upload`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data);
        })

    }

    render() {
        console.log(this.props.abstract);
        console.log(this.props.user);
        const {abstract} = this.props;
        const {title} = this.state;
        return(
            <div
                id="upload"
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
                                SUBMIT PAPER
                            </h4>
                            <button type="button" className="close" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.upload}>
                                <div className="form-group">
                                    {/*<label htmlFor="recipient-name" className="col-form-label">*/}
                                    {/*    <h3 style={{ textAlign: 'left' }}>*/}
                                    {/*        Upload your paper*/}
                                    {/*    </h3>*/}
                                    {/*</label>*/}
                                    {/*<label>Title of paper</label>*/}
                                    <input type="text"
                                           name="title"
                                           onChange={this.onChange}
                                           value={title}
                                           placeholder="Title of paper"/>
                                    <h4 className="mt-3"><u>Upload Paper</u></h4>
                                    <input type="file" name="abstract" onChange={this.handleChange} className="mt-2"/>
                                    {/*<label htmlFor="recipient-name" className="col-form-label">Name:</label>*/}

                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            className="btn btn-block"
                                            style={{marginLeft: '7em', position: 'left', backgroundColor: '#0c081d', color: 'white'}}
                                        >
                                            UPLOAD PAPER
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadPaper;