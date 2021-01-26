import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { authContext } from './AuthProvider';
import useStore from '../store';
const ProtectedRoute = ({ path, component: Component, ...rest }) => {

    // const [user] = useContext(authContext);
    const user = useStore(state => state.user);
    return (
        <Route path={path} render={(props) => {
            if (user) {
                return (<Component {...props} />)
            }
            return (<Redirect to="/login" />)
        }} />
    )
}

export default ProtectedRoute