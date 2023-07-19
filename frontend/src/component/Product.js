import React from 'react'
import Addproduct from './Addproduct'
import Header from './Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import Footer from './Footer'

const Product = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes >
            < Route path="/" element={<Addproduct />} exact />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default Product