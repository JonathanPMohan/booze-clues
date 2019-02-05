import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
// import { Button } from 'reactstrap';
import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Clues from '../components/pages/Clues/Clues';
import NewClue from '../components/pages/NewClue/NewClue';
import EditClue from '../components/pages/EditClue/EditClue';
import ClueDetail from '../components/ClueDetail/ClueDetail';
import LocationDetail from '../components/LocationDetail/LocationDetail';
import Locations from '../components/pages/Locations/Locations';
import NewLocation from '../components/pages/NewLocation/NewLocation';
import EditLocation from '../components/pages/EditLocation/EditLocation';
import CollectionDetail from '../components/CollectionDetail/CollectionDetail';
import Collections from '../components/pages/Collections/Collections';
import NewCollection from '../components/pages/NewCollection/NewCollection';
import EditCollection from '../components/pages/EditCollection/EditCollection';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import authRequests from '../helpers/data/authRequests';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      pendingUser,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <div className='container'>
              <div className='row'>
                <Switch>
                  <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                  <PrivateRoute exact path='/clues' component={Clues} authed={this.state.authed} />
                  <PrivateRoute path='/clues/new' component={NewClue} authed={this.state.authed} />
                  <PrivateRoute exact path='/clues/:id/' component={ClueDetail} authed={this.state.authed} />
                  <PrivateRoute path='/clues/:id/edit' component={EditClue} authed={this.state.authed} />
                  <PrivateRoute exact path='/locations' component={Locations} authed={this.state.authed} />
                  <PrivateRoute path='/locations/new' component={NewLocation} authed={this.state.authed} />
                  <PrivateRoute exact path='/locations/:id/' component={LocationDetail} authed={this.state.authed} />
                  <PrivateRoute path='/locations/:id/edit' component={EditLocation} authed={this.state.authed} />
                  <PrivateRoute exact path='/collections' component={Collections} authed={this.state.authed} />
                  <PrivateRoute path='/collections/new' component={NewCollection} authed={this.state.authed} />
                  <PrivateRoute exact path='/collections/:id/' component={CollectionDetail} authed={this.state.authed} />
                  <PrivateRoute path='/collections/:id/edit' component={EditCollection} authed={this.state.authed} />
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
