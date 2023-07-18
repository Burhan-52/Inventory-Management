import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context, server } from '../App';
import spinner from "../assessts/spinner.gif"

const Signup = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [usersignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const { setisAuthenticated, setUser, isloading, setisloading } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setisloading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: usersignup.name,
                    email: usersignup.email,
                    password: usersignup.password,
                    img: selectedImage && selectedImage.myFile
                }),
               
            }

            const response = await fetch(`${server}/signup`, requestOptions)
            const data = await response.json();
            console.log(data)
            setUser(data.newUser)

            if (data.success) {
                toast.success(data.message);
                setisloading(false)
                navigate("/")
                setisAuthenticated(true)
            } else {
                toast.error(data.error);
            }

        } catch (error) {
            toast.error(error.message)
        }
        setisloading(false)

    }
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setSelectedImage({ myFile: base64 })
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center ">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded p-8 shadow-md w-80">
                <div className="mb-4">
                    <label htmlFor="Name" className="block mb-2 font-bold">Name:</label>
                    <input
                        type="text"
                        value={usersignup.name}
                        onChange={(e) => setUserSignup({ ...usersignup, name: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
                    <input
                        type="email"
                        value={usersignup.email}
                        onChange={(e) => setUserSignup({ ...usersignup, email: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-bold">Password:</label>
                    <input
                        type="password"
                        value={usersignup.password}
                        onChange={(e) => setUserSignup({ ...usersignup, password: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="profile-image" className="block mb-2 font-bold">Profile Image:</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {isloading ? <img className='w-6 h-6' src={spinner} alt='spinner' /> : "Sign Up"}
                </button>
            </form>
            <Link to={"/login"}>
                <p className="mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </Link>

        </div>
    );
};

export default Signup;
