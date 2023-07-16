import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import toast from 'react-hot-toast';
import logo from '../assessts/logo.png'

const Header = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      };

      const response = await fetch('http://localhost:8000/logout', requestOptions);
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setisAuthenticated(false);
        navigate('/login');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center justify-between w-full  px-6 py-4 bg-white shadow">
       <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Inventory Management Logo" className="w-10 h-10" />
      
      </Link>
      <nav>
        <ul className="flex space-x-4">
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
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </li>
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

