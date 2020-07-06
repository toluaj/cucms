import React, {Component} from 'react';
import '../../styles/styles.css';
import '../../styles/author/submit.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';

class submitAbs extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
        this.duplicate = this.duplicate.bind(this);
    }

    duplicate = (e) => {
        e.preventDefault();
        var i = 0;
        var original = document.getElementById('duplicater');
        var clone = original.cloneNode(true); // "deep" clone
        clone.id = "duplicater" + ++i;
    // or clone.id = ""; if the divs don't need an ID
        original.parentNode.appendChild(clone);
    }


    render() {

        const {duplicate} = this.state;

        return(
            <div className="container-fluid">
                <div className="row enter col-2">
                    <p className="mr-5"><Link to="/login">Login</Link></p>
                    <p><Link to="/sign-up">Sign Up</Link></p>
                </div>
                <div className="jumbotron">
                    <div className="image">
                        <img src={logo}/>
                    </div>
                    <div className="head"> 
                        <h1>CUCMS</h1>
                        <p>A solution to manage conferences in Covenant University</p>  
                    </div>
                </div>
                <div className="row">
                    <h5 className="submit mt-3 mb-3 col-12">SUBMIT ABSTRACT</h5>
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
                        <div className="row">
                        <form className="ml-4">
                        <h5>Abstract Title<b>*</b></h5>
                        <p>Title must not exceed 200 characters</p>
                        <textarea name="title" cols="50" rows="3"></textarea>
                        <h5>Abstract Text <b>*</b></h5>
                        <p>Text must not exceed 5000 characters</p>
                        <textarea name="abstract" cols="90" rows="20"></textarea>
                        <div className="authors" id="duplicater">
                          <h5 className="ml-2">Authors <b>*</b></h5>
                          <hr className="linethrough"></hr>
                          <p>First Name</p>
                          <input type="text" name="firstname"/>
                          <p>Last Name</p>
                          <input type="text" name="lastname"/>
                          <p>Email Address</p>
                          <input type="email" name="email"/>
                          <br />
                          <button className="btn btn-block" onClick={duplicate}>Add author</button>
                        </div>
                        </form>
                        </div>
                    </div>
            </div>
        )
    }
}

export default submitAbs;