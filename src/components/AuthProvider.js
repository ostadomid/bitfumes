import { createContext } from 'react';
import useAuthHandler from '../hooks/useAuthHandler';


export const authContext = createContext(null);


const AuthProvider = ({ children }) => {

    const [user, login, logout] = useAuthHandler(localStorage.getItem('user'));

    return (
        <authContext.Provider value={[user, login, logout]}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;