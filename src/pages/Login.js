import React, { useState, useContext } from 'react';
import firebase from '../config/firebase';
import { authContext } from '../components/AuthProvider';
import { useHistory } from 'react-router-dom';
import useStore from '../store'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthing, setIsAuthing] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    // const [user, login, logout] = useContext(authContext);
    const user = useStore(state => state.user);
    const login = useStore(state => state.login);
    const logout = useStore(state => state.logout);
    const history = useHistory();
    // function handleLogin(e) {
    //     setIsAuthing(true)
    //     console.info("Clicked!")
    //     firebase
    //         .auth()
    //         .signInWithEmailAndPassword(user, pass)
    //         .then(res => { console.log(res); setIsAuthing(false) })
    //         .catch(err => { console.log(err); setIsAuthing(false) })
    // }
    function handleLogin() {
        setIsAuthing(true);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch('http://127.0.0.1:5000/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: username, password: password }) })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setIsAuthing(false);
                    return setFetchError(data.message);
                }
                setIsAuthing(false);
                login({ token: data.token });
                history.push('/quotes');
            })
            .catch(err => {
                setIsAuthing(false);
                return setFetchError(err.message);
            })
    }
    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="w-1/3 rounded-xl shadow-md px-8 py-16 bg-gradient-to-b from-indigo-300 to-indigo-800">
                <h4 className="mb-4 text-white text-4xl text-center">Login</h4>
                <div>
                    <input className="w-full rounded border shadow mb-3 p-2" type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input className="w-full rounded border shadow mb-6 p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button disabled={isAuthing} className="w-full rounded border p-2 bg-yellow-400 text-indigo-800 text-md" onClick={handleLogin}>

                        {isAuthing && (<i className="fas fa-circle-notch fa-spin mr-3"></i>)}
                        {isAuthing ? "Wait..." : "Login"}
                    </button>
                </div>
                {fetchError && (<p className="text-red-500">{fetchError}</p>)}
            </div>

        </div>
    )
}

export default Login;