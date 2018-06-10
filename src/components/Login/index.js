import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Authenticate } from '../../actions';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    onLoginHandler = (e) => {
        this.props.authenticate(true);
    }

    render() {
        const { auth, location } = this.props;
        const { from } = location.state || { from: { pathname: '/'} };
        if ( auth ) return <Redirect to={ from } />

        return <div>
            You should login to view this page at {from.pathname}
            <Button variant="contained" color="primary" onClick={ () => this.onLoginHandler() }>
                Login
            </Button>           
            </div>
    }
}

export default connect( store => ({
    auth: store.auth
}), dispatch => ({
    authenticate: bindActionCreators(Authenticate, dispatch)
}))(Login)