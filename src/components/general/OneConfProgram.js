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
                            <h4 className="modal-title text-center" id="myModalLabel"  style={{ fontFamily: 'Trebuchet MS'}}>
                                Program for {name}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body" style={{backgroundColor: 'white'}}>
                            <div className="mt-3 limiter container-table100" style={{marginLeft: '3em'}}>
                                <div className="table-responsive content ">
                                    <table className="table copy-font"
                                           style={{minWidth: '30em', fontFamily: 'Open Sans'}}>
                                        {/*<thead>*/}
                                        {program.map((prog, i)  => (
                                            <tr key={i}>
                                                <tr><b>{prog.program.toUpperCase()}</b></tr>
                                                <br/>
                                                <thead >
                                                <tr style={{marginLeft: '2em', backgroundColor: '#F2f2f2',}}>
                                                    <th nowrap="nowrap">NAME</th>
                                                    <th nowrap="nowrap">ROOM</th>
                                                    <th nowrap="nowrap">DATE</th>
                                                    <th nowrap="nowrap">START TIME</th>
                                                    <th nowrap="nowrap">END TIME</th>
                                                </tr>
                                                </thead>
                                                <tbody style={{backgroundColor: '#F5F4F6',borderRadius: '3em'}} >
                                            {prog.acts.map((act, i) => (
                                                <tr key={i} >
                                                    <td style={{paddingRight: '1em'}}><nobr>{act.name}</nobr></td>
                                                    <td style={{paddingRight: '1em'}}>{act.room}</td>
                                                    <td style={{paddingRight: '1em'}}>{moment(act.date).format('DD/MM/YYYY')}</td>
                                                    <td style={{paddingRight: '1em'}}>{act.start_time}</td>
                                                    <td style={{paddingRight: '1em'}}>{act.end_time}</td>
                                                </tr>
                                            ))}
                                                </tbody>
                                            </tr>
                                    ))}
                                        {/*</thead>*/}
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