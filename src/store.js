import { initial } from 'lodash';
import create from 'zustand'
import useAuthHandler from './hooks/useAuthHandler';

const useStore = create((set, get, api) => {
    let initialUser = localStorage.getItem('user')
    return ({
        user: initialUser,
        login: (user) => { localStorage.setItem('user', user); api.setState(state => ({ user })) },
        logout: () => { localStorage.clear(); api.setState(state => ({ user: null })) }
    })
});

export default useStore;