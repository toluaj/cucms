import React, {Component} from 'react';
import '../../styles/styles.css';
import '../../styles/author/submit.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import SideBar from '../../layouts/AuthorSideBar';

class submitAbs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authorList: [{ index: Math.random(), firstName: "", lastName: "", email: ""}],
            expanded: true,
        }
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }   

    handleChange = (e) => {
        if(["firstName", "lastName", "email"].includes(e.target.name)) {
            let authorList = [...this.state.authorList]
            authorList[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    addNewAuthor = (e) => {
        // e.preventDefault();
        this.setState((prevState) => ({
            authorList: [...prevState.authorList, { index: Math.random(), 
            firstName: "", lastName: "", email: ""}],
        }));
    }

    deleteAuthor = (record) => {
        this.setState({
            authorList: this.state.authorList.filter
            (r => r!== record),
        });
    }

    
    render() {

        let {authorList, onSelectNav} = this.state;
        return(
            <div className="container-fluid">
                <div className="jumbotron">
                    <div className="image">
                        <img className="img" src={logo}/>
                    </div>
                    <br/>
                    <h1 className=" head mr-5">CUCMS</h1>
                </div>
                <SideBar/>
                <div className="row">
                    <h5 className="submit mt-5 mb-3 col-12">SUBMIT ABSTRACT</h5>
                    {/* <br/> */}
                </div>
                <div className="row">
                    <div className="instructions col-12">
                    <h6><u>Instructions for the submission of an abstract</u></h6>
                    <ol>
                        <li>The conference language is English and all abstracts and full papers must be submitted in English.</li>
                        <li>Abstracts must be submitted online. Do not fax, mail or email your abstract as it will not be considered.</li>
                        <li>In order to give a presentation at the conference, please submit a short abstract first.</li>
                        <li>The full, camera-ready paper should be submitted shortly after you have received a message, accepting your contribution,
                        from the Programme Committee.</li>
                        <li>Please note that papers can only be accepted if at least one author has registered for participation at the conference.</li>
                    </ol>  
                    </div>
                </div>
                <div className="row">
                    <div className="simp">
                    <p>NEW SUBMISSION</p>
                    </div>
                </div>
                    <div className="submission">
                        <form className="ml-4" id="wrapper">
                        <h5><u>Abstract Title<b style={{color: 'red'}}>*</b></u></h5>
                        <p>Title must not exceed 200 characters</p>
                        <textarea className="ta-title" name="title" cols="50" rows="3"></textarea>
                        <h5><u>Abstract Text<b style={{color: 'red'}}>*</b></u></h5>
                        <p>Text must not exceed 5000 characters</p>
                        <textarea className="ta-abstract" name="abstract" cols="90" rows="20"></textarea>
                        <div>
                        {authorList.map((val, i) => {
                            let firstName = `firstName-${i}`, lastName = `lastName-${i}`, email = `email-${i}`
                            return ( 
                                <div className="authors" key={val.index}>
                                <h5 className="ml-2"><u>Authors<b style={{color: 'red'}}>*</b></u></h5>
                                <hr className="linethrough"></hr>
                                <p>First Name</p>
                                <input type="text" id={firstName} data-id={i} name="firstName"/>
                                <p>Last Name</p>
                                <input type="text" id={lastName} data-id={i} name="lastName"/>
                                <p>Email Address</p>
                                <input type="email" id={email} data-id={i} name="email"/>
                                {
                                i===0 ? 
                                <button id="submit" type="button" className="add btn btn-primary"
                                name="submit" onClick={()=>this.addNewAuthor()}>
                                <h5 className="sign">+</h5></button>
                                :
                                <button id="submit" type="button" className="remove btn btn-danger"
                                name="submit" onClick={()=>this.deleteAuthor(val)}>
                                <h5 className="sign">-</h5></button>
                                }   
                          </div>
                            );
                         })}
                            <button id="submit" type="button" className="add2 btn btn-primary"
                            name="submit" onClick={()=>this.addNewAuthor()}>
                            <h5 className="sign">+</h5></button>
                            <div>
                            <h5 className="mt-3"><u>Affiliation<b style={{color: 'red'}}>*</b></u></h5>
                            <textarea cols="50" rows="3"></textarea>
                        </div>
                        </div>
                            <button id="submit" type="button" className="btnsub btn btn-block"
                            name="submit">
                            <p className="sign">Submit</p></button>
                        </form>
                    </div>
            </div>
            
        )
    }
}

export default submitAbs;