import React,{Component} from 'react';
import SplashPage from './components/general/SplashPage';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Submit from './components/staff/author/submitAbs';
import createconference from './components/staff/admin/createConference';
import EditProfile from './components/general/EditProfile';
import conferenceProgram from './components/staff/program-chair/conferenceProgram';
import Request from './components/staff/reviewer/TrackRequest';
import GetRequest from './components/general/GetRequest';
import MakeRequest from './components/staff/admin/MakeReviewerRequest';
import CallForPaper from './components/general/CallForPaper';
import showconferences from './components/staff/admin/showConferences';
import ReviewAbstract from './components/staff/reviewer/ReviewAbstract';
import Program from './components/general/OneConfProgram';
import AssignAbstract from "./components/staff/program-chair/AssignAbstract";
import ViewAssignments from "./components/staff/reviewer/ViewAssignments";
import getUserAbstract from "./components/staff/author/getUserAbstract";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={SplashPage}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/sign-up" component={SignUp}></Route>
          <Route exact path="/submitabstract" component={Submit}></Route>
          <Route exact path="/createconference" component={createconference}></Route>
          <Route exact path="/editprofile" component={EditProfile}></Route>
          <Route exact path="/confprogram" component={conferenceProgram}></Route>
          <Route exact path="/requests" component={Request}></Route>
          <Route exact path="/request" component={GetRequest}></Route>
          <Route exact path="/make-request" component={MakeRequest}></Route>
          <Route exact path="/callforpaper" component={CallForPaper}></Route>
          <Route exact path="/showconferences" component={showconferences}></Route>
          <Route exact path="/review-abstract" component={ReviewAbstract}></Route>
          <Route exact path="/program" component={Program}></Route>
          <Route exact path="/assign-abstract" component={AssignAbstract}></Route>
          <Route exact path="/assignedAbstracts" component={ViewAssignments}></Route>
          <Route exact path="/track-abstract" component={getUserAbstract}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
