import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { isAuthenticated, setisAuthenticated } = useContext(Context);

    const [userprofile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    credentials: 'include'
                }

                const response = await fetch(`http://localhost:8000/profile`, requestOptions)
                const data = await response.json()
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
            {userprofile && (<div className="flex flex-col items-center mt-6">
                <img
                    src={userprofile?.img || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                />
                <div className="text-2xl font-semibold text-gray-800 mb-2 ">
                    {userprofile.name}
                </div>
                <div className="text-lg text-gray-600">{userprofile.email}</div>
            </div>
            )}
        </>
    );
};

export default Profile;


