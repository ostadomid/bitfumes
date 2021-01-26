import React, { useEffect, useState } from 'react'
import Quotes from './pages/Quotes'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './components/AuthProvider'
import create from 'zustand'
import GuestRoute from './components/GuestRoute'
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

const Home = () => {
  return (<h2>Welcome Home</h2>)
}



const App = () => {

  const [info, setInfo] = useState({ ammos: 0, guns: 0 });


  return (
    <div>
      <p>Ammo: {info.ammos}</p>
      <p>Guns: {info.guns}</p>
      <button onClick={() => { setInfo(pre => ({ ...pre, ammos: info.ammos + 1 })) }}>Inc Ammo</button>
      <button onClick={() => { setInfo(pre => ({ ...pre, guns: info.guns + 1 })) }}>Inc Guns</button>
    </div>
    // <Router>
    //   {/* <AuthProvider> */}
    //   <Navbar>
    //     <Route path="/" exact={true} component={Home} />
    //     <ProtectedRoute isAuth={true} path="/quotes" component={Quotes} />
    //     <GuestRoute path="/login" component={Login} />
    //   </Navbar>
    //   {/* </AuthProvider> */}
    // </Router>
  )
}

export default App