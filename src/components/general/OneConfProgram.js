import React, {Component} from 'react';
import moment from 'moment';

const OneConfProgram = ({name, id, program}) => {

        // console.log(this.props.id);
        // console.log(this.state.conference_id);
        // const {name, id, program} = this.props;
        // const {acts} = this.props.program;
        // console.log(acts);
        return(
            <div
                id="program"
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
                                Program for {name}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        <p style={{ textAlign: 'left' }}>
                                            {/*{user.extra ? user.extra[0].account_ref : null}*/}
                                        </p>
                                    </label>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Activity</th>
                                            <th>Start Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {program.map((prog, i)  => (
                                            <tr key={i} className="rowed">
                                            <td>{prog.name}</td>
                                            <td></td>
                                            </tr>
                                    ))}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default OneConfProgram;