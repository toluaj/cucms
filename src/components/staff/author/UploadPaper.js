import React, {Component} from 'react';
import axios from 'axios';



class UploadPaper extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        console.log(this.props.abstract);
        console.log(this.props.user);
        const {abstract} = this.props;
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
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        <p style={{ textAlign: 'left' }}>
                                            Upload your paper
                                        </p>
                                    </label>
                                    {/*<label htmlFor="recipient-name" className="col-form-label">Name:</label>*/}

                                    <div className="modal-footer">
                                        <button
                                            type="button"
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