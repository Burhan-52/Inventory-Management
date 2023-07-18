import React, { useContext, useEffect, useState } from 'react';
import { Context, server } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';
import spinner from "../assessts/spinner.gif"
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { isAuthenticated, setisAuthenticated, isloading, setisloading } = useContext(Context);

    const [userprofile, setUserProfile] = useState(null);

    const [isspin, setisspin] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async (e) => {
        try {
            setisloading(true)
            const requestOptions = {
                method: 'DELETE',
                credentials: 'include'
            }

            const response = await fetch(`${server}/deleteuser`, requestOptions)
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setisloading(false)
                navigate("/login")
            } else {
                toast.error(data.error);
            }

        } catch (error) {
            console.log(error)
        }
        setisloading(false)

    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setisspin(true)
                const requestOptions = {
                    method: 'GET',
                    credentials: 'include'
                }

                const response = await fetch(`${server}/profile`, requestOptions)
                const data = await response.json()
                setisspin(false)
                if (data.success) {
                    setUserProfile(data.user);

                } else {
                    setisAuthenticated(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (isAuthenticated) {
            fetchProfile();

        }
    }, [isAuthenticated, setisAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {isspin ?
                <div className="flex justify-center mt-5">
                    <img className="w-10 h-10" src={spinner} alt="spinner" />
                </div>
                : userprofile && (<div className="flex flex-col items-center mt-6">
                    <img
                        src={userprofile?.img || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
                        alt="User Profile"
                        className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                    />
                    <div className="text-2xl font-semibold text-gray-800 mb-2 ">
                        {userprofile.name}
                    </div>
                    <div className="text-lg text-gray-600">{userprofile.email}</div>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        onClick={handleDelete}
                    >
                        {isloading ? <img className='w-6 h-6' src={spinner} alt='spinner' /> : "Delete my account"}

                    </button>

                </div>
                )}
        </>
    );
};

export default Profile;


