import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const Header = withRouter((props) => {
    const { auth, logout, history } = props;

    const onLogoutHandler = () => {
        logout();
        history.push('/');
    }

    if ( !auth ) return (
        <div>You are not logged in</div>
    )

    return <div>
        Wellcome!
        <Button variant="contained" color="primary" onClick={ onLogoutHandler }>
            Login out
        </Button>  
    </div>
})

export default Header;