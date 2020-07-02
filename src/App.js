import React,{Component} from 'react';
import Login from './components/general/Login';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Login}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
