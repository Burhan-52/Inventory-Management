import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context, server } from '../App';
import toast from 'react-hot-toast';
import logo from '../assessts/logo.png'
import spinner from "../assessts/spinner.gif"

const Header = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(Context);
  const [isloading, setisloading] = useState(false)

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setisloading(true)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      };

      const response = await fetch(`${server}/logout`, requestOptions);
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setisAuthenticated(false);
        setisloading(false)
        navigate('/login');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
    setisloading(false)
  };

  return (
    <header className="flex items-center justify-between w-full  px-6 py-4 bg-white shadow">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Inventory Management Logo" className="w-10 h-10" />

      </Link>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Profile
              </Link>
            </li>
          )}
          {isAuthenticated ? (

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isloading ? <img className='w-6 h-6' src={spinner} alt='spinner' /> : "Logout"}
            </button>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

