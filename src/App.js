import React,{Component} from 'react';
import SplashPage from './components/general/SplashPage';
import Login from './components/general/Login';
import SignUp from './components/general/SignUp';
import Submit from './components/staff/author/submitAbs';
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
