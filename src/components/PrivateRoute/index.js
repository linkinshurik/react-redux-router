import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...props}) => {
    return <Route {...props} render={ (props) => (
        auth === true ? 
            <Component {...props} /> 
            : <Redirect to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }} />
    )
    } />
}

export default PrivateRoute;