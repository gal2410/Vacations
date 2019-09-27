import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Posts from './components/Posts/Posts';
import App2 from './app2';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/chart" component={App2} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
