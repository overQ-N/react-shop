import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import './App.less';
import React, { Component} from 'react';
import Login from './pages/login/index'
import NotFound from './pages/notFound'
import Admin from '@/pages/admin/index'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
     );
  }
}
 
export default App;
