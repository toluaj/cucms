import React, {Component, useState, useRef} from 'react';
import '../../styles/styles.css';
import '../../styles/author/submit.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import SideBar from '../../layouts/AdminSideBar';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import FileDownload from 'js-file-download';

class submitAbs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // authorList: [{ index: Math.random(), firstName: "", lastName: "", email: ""}],
            expanded: true,
            topic: '',
            abstract_text: '',
            affiliation: '',
            abstract: '',
            firstName: "", 
            lastName: "", 
            email: "",
            conference_id: '',
            conferences: [],
            user: {}
            
        }
        this.deleteAuthor = this.deleteAuthor.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handelChange = this.handelChange.bind(this);
        // this.downloadFile = this.downloadFile.bind(this);
    }

    componentWillMount() {
        this.fetchLoggedOnUser();
    }

    componentDidMount() {
        this.getConferences();
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
            console.log(res.data.data);
            this.setState({user: res.data.data,
                                firstName: res.data.data.firstName,
                                lastName: res.data.data.lastName,
                                email: res.data.data.email,
                                logged: 'true'})
          }
          else {
            console.log('you are not logged in!')
            this.setState({logged: 'false'});
            window.location.replace('/login')
          }
        }).catch(err => {
          console.log('no authorization');
          toast.info("Please log in again. fetchlogged Session expired")
          this.setState({logged: 'false'});
          window.location.replace('/login')
        })
    }


    onChange = (e) =>
   this.setState({
     [e.target.name]: e.target.value,
   });

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

    onSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();
        const {topic, affiliation,
          abstract_text, abstract, conference_id} = this.state;
        const {firstName, lastName, email,} = this.state.user;
        console.log(firstName, lastName, email);
        console.log(this.state.user);

           formData.append('abstract', abstract);
           formData.append('title', topic);
           formData.append('firstName', firstName);
           formData.append('lastName', lastName);
           formData.append('email', email);
           formData.append('affiliation', affiliation);
           formData.append('abstract_text', abstract_text);
           formData.append('status', 'pending');
           formData.append('conference_id', conference_id)
           console.log(formData.values());

           // axios({
           //   method: 'post',
           //   url: `http://localhost:8080/api/cu/abstract/upload`,
           //   data: formData,
           //   headers: {
           //       'Authorization': `Bearer ${sessionStorage.getItem('token')}`
           //   }
           // }).then((res) => {
           //   if(res.data) {
           //     console.log(res.data);
           //     toast.success("Successful upload");
           //   }
           //   else {
           //     toast.error('Something went wrong. Try again')
           //   }
           // }).catch(err => {
           //   console.log(err.message);
           // })
           
      }

    handelChange = (e) => {
        const abstract = e.target.files[0]; // accesing file
        console.log(abstract);
        this.setState({
            abstract: abstract
        })
    }

    getConferences() {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/cu/conference',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.data){
                console.log(res.data);
                this.setState({
                    conferences: res.data.data
                })
            }
        })
    }

    // downloadFile = () => {
    //
    //     axios({
    //         method: 'get',
    //         url: 'http://localhost:8080/api/cu/abstract/upload',
    //         headers: {
    //             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //         }
    //     })
    //     .then((res) => {
    //         if(res.data){
    //             console.log(res.data);
    //             // window.open(`${res.data.file}`);
    //             window.open('http://localhost:8080/'+res.data.file);
    //             // FileDownload('data', res.data.file);
    //             console.log(window.location.pathname);
    //         }
    //         else {
    //             console.log('could not upload abstract!')
    //           }
    //     })
    //     .catch(err => {
    //         console.log("no authorization")
    //     })
    // }

    render() {

        let {authorList, conferences, user} = this.state;
        console.log(conferences)
        const {topic, affiliation, firstName, lastName, abstract_text, abstract, email} = this.state;

        return(
            <div className="container-fluid">
                <ToastContainer/>
                <div className="jumbotron">
                    <div className="image">
                        <img className="img" src={logo}/>
                    </div>
                    <br/>
                    <h1 className=" head mr-5">CUCMS</h1>
                </div>
                <SideBar user={user}/>
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
                        <li>Please submit abstract you authored in.</li>
                    </ol>  
                    </div>
                    {/* <button type="submit" className="btnsub btn btn-block"
                            onClick={this.downloadFile}
                            name="eper"> 
                            <p className="sign">Download</p></button> */} 
                </div>
                <div className="form-group col-sm-9" style={{marginLeft: '22em'}}>
              <label for="conference_id">Select Conference <b style={{color: 'red'}}>*</b></label>
                <select name="conference_id" onChange={this.onChange}>
                    <option value=""></option>
                    {conferences.map((conf, i) => (
                        <option value={conf.id}>{conf.name}</option>
                    ))}
                </select>
            </div>
                <div className="row">
                    <div className="simp">
                    <p>NEW SUBMISSION</p>
                    </div>
                </div>
                    <div className="submission">
                        <form className="ml-4" id="wrapper"
                        onSubmit={this.onSubmit} encType="multipart/form-data">
                        <h5><u>Abstract Title<b style={{color: 'red'}}>*</b></u></h5>
                        <p>Title must not exceed 200 characters</p>
                        <textarea className="ta-title" name="topic" onChange={this.onChange}
                                  cols="50" rows="3" value={topic}></textarea>
                        <h5><u>Abstract Text<b style={{color: 'red'}}>*</b></u></h5>
                        <p>Text must not exceed 5000 characters</p>
                        <textarea className="ta-abstract" onChange={this.onChange}
                                  name="abstract_text" value={abstract_text}
                                  cols="90" rows="20"></textarea>
                        <div>
                        {/* {authorList.map((val, i) => {
                            let firstName = `firstName-${i}`, lastName = `lastName-${i}`, email = `email-${i}`
                            return ( 
                                <div className="authors" key={val.index}> */}
                                <h5 className="ml-2"><u>Author
                                     {/* {i+1} */}
                                     <b style={{color: 'red'}}>*</b></u></h5>
                                <hr className="linethrough"></hr>
                                <p>First Name</p>
                                <input type="text"
                                //  id={firstName} data-id={i}
                                  name="firstName"
                                  value={firstName}
                                       placeholder={firstName}
                                  onChange={this.onChange} readOnly/>
                                <p>Last Name</p>
                                <input type="text"
                                //  id={lastName} data-id={i}
                                  name="lastName"
                                  value={lastName}
                                       placeholder={lastName}
                                  onChange={this.onChange} readOnly/>
                                <p>Email Address</p>
                                <input type="email"
                                //  id={email} data-id={i}
                                  name="email"
                                  value={email}
                                       placeholder={email}
                                  onChange={this.onChange} readOnly/>
                                  {/*<div>*/}
                                  {/*    */}
                                  {/*</div>*/}
                                {/* { */}
                                {/* i===0 ?  */}
                                {/* <button id="submit" type="button" className="add btn btn-primary"
                                name="submit"
                                 onClick={()=>this.addNewAuthor()}
                                 >
                                <h5 className="sign">+</h5></button> */}
                                {/* : */}
                                {/* <button id="submit" type="button" className="remove btn btn-danger"
                                name="submit"
                                 onClick={()=>this.deleteAuthor(val)}
                                 >
                                <h5 className="sign">-</h5></button> */}
                                {/* }    */}
                          {/* </div>
                            );
                         })} */}
                            {/* <button id="submit" type="button" className="add2 btn btn-primary"
                            name="submit" onClick={()=>this.addNewAuthor()}>
                            <h5 className="sign">+</h5></button> */}
                            <div>
                            <h5 className="mt-3"><u>Affiliation<b style={{color: 'red'}}>*</b></u></h5>
                            <textarea name="affiliation" onChange={this.onChange}
                            value={affiliation} cols="50" rows="3"></textarea>
                        </div>
                        <h5 className="mt-3"><u>Upload Extended Abstract<b style={{color: 'red'}}>*</b></u></h5>
                        <input type="file" name="abstract" onChange={this.handelChange} className="mt-2"/>
                        </div>
                            <button id="submit" type="submit"
                                    className="btnsub btn btn-block"
                                    style={{fontFamily: 'Times New Roman'}}
                                    name="submit">
                            <p className="sign">Submit</p></button>
                        </form>
                    </div>
            </div>
            
        )
    }
}

export default submitAbs;