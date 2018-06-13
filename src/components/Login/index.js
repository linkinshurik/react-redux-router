import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';

import { Authenticate } from '../../actions';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            pass: ''
        }
    }

    onSubmitHandler = () => {
        const { login, pass } = this.state;
        this.props.authenticate(login, pass);
    }

    onLoginHandler(e) {
        this.setState({
            login: e.target.value
        })
    }
    onPassHandler(e) {
        this.setState({
            pass: e.target.value
        })
    }

    render() {
        const { auth, location } = this.props;
        const { login, pass } = this.state;
        const { from } = location.state || { from: { pathname: '/'} };
        if ( auth ) return <Redirect to={ from } />

        return <div>
            You should login to view this page at {from.pathname}
            <Input onChange = { (e) => this.onLoginHandler(e)} value = {login}/>
            <Input onChange = { (e) => this.onPassHandler(e)} value = {pass}/>
            <Button variant="contained" color="primary" onClick={ () => this.onSubmitHandler() }>
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