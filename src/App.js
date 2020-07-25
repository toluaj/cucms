import React,{Component} from 'react';
import SplashPage from './components/general/SplashPage';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Submit from './components/staff/author/submitAbs';
import createconference from './components/staff/program-chair/createConference';
import ChairHome from './components/staff/program-chair/programChairHome';
import EditProfile from './components/general/EditProfile';
import conferenceProgram from './components/staff/program-chair/conferenceProgram';
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
