import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useWindowScrollY from '../hooks/useWindowScrollY'
import useStore from '../store';
import { authContext } from './AuthProvider'
const { debounce } = require('../lodash.custom.js');


const Navbar = ({ children }) => {

    const [isFixed, setIsFixed] = useState(false);
    const refNavbar = useRef(null);
    //const [user, login, logout] = useContext(authContext);
    const user = useStore(state => state.user);
    const login = useStore(state => state.login);
    const logout = useStore(state => state.logout);

    const getClassNames = () => {
        const base = "fixed flex justify-between w-full text-white  transition-all duration-500 ease-in-out";
        return isFixed ? base + " bg-indigo-500 py-2" : base + " bg-indigo-700 py-5";
    }

    useEffect(() => {
        const handler = debounce(() => {
            console.log(`Scrolled - Current=${window.scrollY} , Height=${refNavbar.current.scrollHeight}`);
            if (window.scrollY >= refNavbar.current.clientHeight) {
                setIsFixed(true);
                console.log('Applied!')
            } else {
                setIsFixed(false);
            }
        }, 200);

        window.addEventListener('scroll', handler);
        return () => {
            window.removeEventListener('scroll', handler);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div ref={refNavbar} className={getClassNames()}>
                <span>
                    <NavLink exact={true} activeClassName="text-yellow-500" className="mx-2 text-md" to="/">Home</NavLink>|
                    <NavLink activeClassName="text-yellow-500" className="mx-2 text-md" to="/quotes">Quotes</NavLink>
                </span>
                {user ? (<NavLink to="/" onClick={() => { logout() }} className="mr-2">Logout</NavLink>) : (<NavLink to="/login" className="mr-2">Login</NavLink>)}
            </div>
            <div className="mt-20">
                {children}
            </div>
        </div>
    )
}

export default Navbar