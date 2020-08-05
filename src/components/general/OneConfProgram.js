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
                    <div className="modal-content" style={{ width: '40em', marginRight: '3em' }}>
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
                                    {/*<label htmlFor="recipient-name" className="col-form-label">*/}
                                    {/*    <p style={{ textAlign: 'left' }}>*/}
                                    {/*        /!*{user.extra ? user.extra[0].account_ref : null}*!/*/}
                                    {/*        /!*Sessions for {name}*!/*/}
                                    {/*    </p>*/}
                                    {/*</label>*/}
                                    <table>
                                        {/*<thead>*/}
                                        {/*<tr>*/}
                                        {/*    <th>Sessions</th>*/}
                                        {/*    /!*<th>Start Time</th>*!/*/}
                                        {/*</tr>*/}
                                        {/*</thead>*/}
                                        <thead>
                                        {program.map((prog, i)  => (
                                            <tr key={i} >
                                            <td>{prog.program}</td>
                                            {/*<td>{prog.acts}</td>*/}
                                            {/*    <thead>*/}
                                                <tr>
                                                    <th nowrap="no-wrap">Name</th>
                                                    <th nowrap="no-wrap">Room</th>
                                                    <th nowrap="no-wrap">Date</th>
                                                    <th nowrap="no-wrap">Start Time</th>
                                                    <th nowrap="no-wrap">End Time</th>
                                                </tr>
                                                {/*</thead>*/}
                                                <tbody>
                                            {prog.acts.map((act, i) => (
                                                <tr key={i}>
                                                    <td>{act.name}</td>
                                                    <td>{act.room}</td>
                                                    <td>{moment(act.date).format('DD/MM/YYYY')}</td>
                                                    <td>{act.start_time}</td>
                                                    <td>{act.end_time}</td>
                                                </tr>
                                            ))}
                                                </tbody>
                                            </tr>
                                    ))}
                                        </thead>
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