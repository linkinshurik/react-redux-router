import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SimpleAction, Authenticate } from '../actions';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Navigation from './Navigation'
import PublicComponent from './Public';
import ProtectedComponent from './Protected';
import Login from './Login';
import Header from './Header';
import Home from './Home';
import PrivateRoute from './PrivateRoute';

export class Main extends Component {
    
    render() {
        const { auth, authenticate, profile } = this.props;

        return <div>
            <Router>
                <div>
                    <Header auth = { auth } logout = { () => authenticate(false) } profile = {profile} />
                    <Navigation />
                    <Route exact path="/" component={Home} />
                    <Route path="/public" component={PublicComponent} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/protected" component={ProtectedComponent} auth={auth} />
                </div>
            </Router>
        </div>
    }
}

export default connect( store => ({
    data: store.data,
    auth: store.auth,
    profile: store.profile,
}), dispatch => ({
    action: bindActionCreators(SimpleAction, dispatch),
    authenticate: bindActionCreators(Authenticate, dispatch)
}))(Main);