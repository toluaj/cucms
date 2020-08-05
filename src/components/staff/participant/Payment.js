import React, {Component} from 'react';
import moment from 'moment';
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {PAYSTACK_TEST_KEY_URL, API_URL} from "../../../utils/config";

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            logged: '',
            email: '',
            amount: 0,
            firstName: '',
            lastName: '',
            conference_id: '',
            conference_name: '',
            affiliation: '',
            program_id: [],
            ref: ''
        }
        this.pay = this.pay.bind(this);
        this.onChange = this.onChange.bind(this);
        this.dummy = this.dummy.bind(this);
    }

    dummy() {
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            amount: ''
        });
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
                console.log(res.data);
                this.setState({
                    user: res.data.data,
                    logged: true
                })
            }
            else {
                console.log('you are not logged in!');
                this.setState({logged: false})
            }
        }).catch(err => {
            console.log('no authorization');
            this.setState({logged: false})
        })
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

   async pay(e)  {
        e.preventDefault();

       let {amount} = this.state;
       var array = [];
       var array2 = [];
       var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
       console.log(array);
       for (var i = 0; i < checkboxes.length; i++) {
           array.push(parseInt(checkboxes[i].value, 10));
           console.log(checkboxes.length);
           array2.push(parseInt(checkboxes[i].getAttribute('data-valuetwo'), 10))
       }

        for(let i in array) {
            amount += array[i];
            console.log(amount);
            amount = amount;
        }

        const {user} = this.state;
      await  this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            conference_id: this.props.id,
            conference_name: this.props.name,
            affiliation: this.state.affiliation,
            program_id: array2.toString(),
            email: user.email,
            amount: amount
        }, () => console.log(this.state));
      console.log(this.state);
       const {firstName, lastName, email, conference_id, conference_name, program_id, affiliation} = this.state;
        amount = this.state.amount * 100;
        let handler = window.PaystackPop.setup({

            key: `${PAYSTACK_TEST_KEY_URL}`,
            email: this.state.email,
            amount: Math.round(amount),
            ref: 'T' + Math.floor((Math.random() * 100000000000) + 1),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            metadata: {
                custom_fields: [
                    {
                        email: this.state.email,
                        amount: this.state.amount
                    }
                ]
            },
            callback (response) {
                console.log(this.state);
                if(response.reference) {
                    console.log(response.reference);
                    // console.log(firstName)
              //      const {firstName, lastName, email, conference_id, conference_name, program_id, affiliation} = this.state;
                  const data = {
                        ref: response.reference,
                        firstName,
                        lastName,
                        email,
                        conference_id,
                        conference_name,
                        program_id,
                        affiliation
                    };
                    console.log(data);
                 axios({
                     method: 'post',
                     url: `${API_URL}/pay`,
                     data: data,
                     headers: {
                         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                     }
                 }).then(res => {
                     if(res.data) {
                         console.log(res.data);
                         toast.success('Payment successful!')
                     }
                 })

                }
                else {
                    toast.info('Could not submit transaction');
                    // console.log();
                }
            },
            onClose: function() {
                alert('window was closed');
            }
        });
       console.log(this.state);
       handler.openIframe();
        this.dummy();
    }

    render() {
        const {program, name} = this.props;
        const {affiliation} = this.state;
        console.log(this.state);
        return (
            <div
                id="payment"
                className="modal fade in"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
            >
                <ToastContainer/>
                <div className="modal-dialog" style={{width: '600px'}}>
                    <div className="modal-content" style={{width: '40em', marginRight: '3em'}}>
                        <div className="modal-header">
                            <h4 className="modal-title text-center" id="myModalLabel">
                                Program for {name}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5 style={{marginBottom: '1em'}}>Choose Session</h5>
                            <form onSubmit={this.pay}>
                            {program.map((prog, index) => (
                                <div key={index} data-index={index}  className="container-fluid">
                                    <div className="row">
                                        <label style={{maxWidth: '2em'}} data-index={index}>{prog.program}</label>
                                        <input type="checkbox" name="id" value={prog.amount} data-valuetwo={prog.id}
                                               style={{width: '3px', height: '1em', marginRight: '2px'}}
                                               />
                                        <div style={{marginLeft: '11em'}}>
                                            <p data-index={index}>N{Number(prog.amount).toFixed(2)}</p>
                                        </div>
                                        <hr></hr>
                                    </div>
                                </div>
                            ))}
                            <label>Affiliation</label>
                            <input type="text" name="affiliation" onChange={this.onChange} value={affiliation}/>
                            <button className="modal-footer btn btn-block"
                                    style={{marginRight: '10em'}}
                                    type="submit"
                            >PAY</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;