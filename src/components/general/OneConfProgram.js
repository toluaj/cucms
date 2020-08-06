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
                    <div className="modal-content" style={{ width: '45em', marginRight: '3em' }}>
                        <div className="modal-header">
                            <h4 className="modal-title text-center" id="myModalLabel">
                                Program for {name}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body" style={{backgroundColor: 'rgb(200,200,200)'}}>
                            <div className="mt-3 limiter container-table100">
                                <div className="table-responsive content ">
                                    <table className="table copy-font " style={{minWidth: '50em'}}>
                                        <thead>
                                        {program.map((prog, i)  => (
                                            <tr key={i} >
                                            <td>{prog.program}</td>
                                                <br/>
                                                <br/>
                                                <thead style={{width: '70px', marginRight: '4px'}}>
                                                <tr>
                                                    <th nowrap="nowrap">Name</th>
                                                    <th nowrap="nowrap">Room</th>
                                                    <th nowrap="nowrap">Date</th>
                                                    <th nowrap="nowrap">Start Time</th>
                                                    <th nowrap="nowrap">End Time</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                            {prog.acts.map((act, i) => (
                                                <tr key={i} >
                                                    <td style={{width: '70px'}}><nobr>{act.name}</nobr></td>
                                                    <td style={{width: '70px'}}>{act.room}</td>
                                                    <td style={{width: '70px'}}>{moment(act.date).format('DD/MM/YYYY')}</td>
                                                    <td style={{width: '70px'}}>{act.start_time}</td>
                                                    <td style={{width: '70px'}}>{act.end_time}</td>
                                                </tr>
                                            ))}
                                                </tbody>
                                            </tr>
                                    ))}
                                        </thead>
                                    </table>
                                </div>
                            </div>
                                {/*</div>*/}
                            {/*</form>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default OneConfProgram;