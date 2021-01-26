import { useState } from 'react';

const useAuthHandler = (initialUser = null) => {
    const [user, setUser] = useState(initialUser);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', user);
    }
    const logout = () => {
        setUser(null);
        localStorage.clear();
    }
    return [user, login, logout];
}

export default useAuthHandler;