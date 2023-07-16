import React from 'react'
import Addproduct from './Addproduct'
import Header from './Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'

const Product = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          < Route path="/" element={<Addproduct />} exact />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Product