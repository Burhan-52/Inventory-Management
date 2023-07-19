import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Context, server } from '../App';
import spinner from "../assessts/spinner.gif"
import open from "../assessts/open.png"
import close from "../assessts/close.png"

const Login = () => {
    const [userlogin, setuserlogin] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const { isAuthenticated, setisAuthenticated, setUser, isloading, setisloading } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setisloading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: userlogin.email,
                    password: userlogin.password
                }),
            }

            const response = await fetch(`${server}/login`, requestOptions)
            const data = await response.json();
            setUser(data.existingUser)
            if (data.success) {
                toast.success(data.message);
                setisloading(false)
                setisAuthenticated(true)
                navigate("/")
            } else {
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error)
        }
        setisloading(false)

    }
    const handlePasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center ">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded p-8 shadow-md w-80">
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={userlogin.email}
                        onChange={(e) => setuserlogin({ ...userlogin, email: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-bold">Password:</label>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={userlogin.password}
                            onChange={(e) => setuserlogin({ ...userlogin, password: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 pr-10" // Added paddingRight for the icon
                        />
                        {showPassword ? <img
                            src={open}
                            alt="Toggle password visibility"
                            onClick={handlePasswordToggle}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 cursor-pointer"
                        /> :
                            <img
                                src={close}
                                alt="Toggle password visibility"
                                onClick={handlePasswordToggle}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 cursor-pointer"
                            />}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {isloading ? <img className='w-6 h-6' src={spinner} alt='spinner' /> : "Login"}
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
            </p>

        </div>
    );
}

export default Login