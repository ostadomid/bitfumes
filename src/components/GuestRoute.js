import { Redirect, Route } from 'react-router-dom'
import useStore from '../store'

const GuestRoute = ({ component: Component, ...rest }) => {
    const user = useStore(state => state.user);
    return (
        <Route {...rest} render={(props) => {
            console.log(props);
            return !user ? (<Component {...props} />) : (<Redirect to="/" />)
        }} />
    )

}

export default GuestRoute;