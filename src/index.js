import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import history from './history'
import Welcome from './components/Welcome'
import * as serviceWorker from './serviceWorker';
import Landing from './components/Landing';
import Stories from './components/Stories';
ReactDOM.render(
<Router history={history}>
     <Switch>
        <Route exact path='/'  component={Welcome} />
        <Route path='/landing' component={Landing} />
        <Route path='/stories' component={Stories} />

          
              {/* <Route exact path='/' component={Dashboard} />
              <Route exact path='/dashboard' component={Dashboard}/>
              <Route exact path='/data-table' component={DataTable} />
            */}
          </Switch>
        </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
