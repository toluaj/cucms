import React,{Component} from 'react';
import SplashPage from './components/general/SplashPage';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Submit from './components/staff/author/submitAbs';
import createconference from './components/staff/program-chair/createConference';
import ChairHome from './components/staff/program-chair/programChairHome';
import EditProfile from './components/general/EditProfile';
import conferenceProgram from './components/staff/program-chair/conferenceProgram';
import Request from './components/staff/reviewer/Request';
import ChairRequest from './components/staff/program-chair/ChairRequest';
import GetRequest from './components/general/GetRequest';
import MakeRequest from './components/staff/admin/MakeRequest';
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
          <Route exact path="/chair-home" component={ChairHome}></Route>
          <Route exact path="/editprofile" component={EditProfile}></Route>
          <Route exact path="/confprogram" component={conferenceProgram}></Route>
          <Route exact path="/request/:token" component={Request}></Route>
          <Route exact path="/chairRequest/:token" component={ChairRequest}></Route>
          <Route exact path="/request" component={GetRequest}></Route>
          <Route exact path="/make-request" component={MakeRequest}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
