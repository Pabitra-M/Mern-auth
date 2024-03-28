import { useState } from 'react'

import { Route,BrowserRouter, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'


function App() {
  
  return (

    <BrowserRouter>
    <Header/>

      <Routes>
        <Route path="/" element ={<Home />}/>
        <Route path="/Sign-in" element ={<Signin />}/>
        <Route path="/Sign-up" element ={<Signup />}/>
        <Route path="/about" element={<About />}/>
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element ={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
