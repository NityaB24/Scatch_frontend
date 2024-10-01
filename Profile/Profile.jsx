import React, { useState, useEffect } from 'react';
import HeaderShop from '../partials/Header';
import Footer from '../partials/Footer';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Ensure cookies (e.g., for sessions) are included in the request
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setFullname(data.fullname || '');
                    setEmail(data.email || '');
                    setContact(data.contact || '');
                    setAddress(data.address || '');
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleFullnameChange = (e) => setFullname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleContactChange = (e) => setContact(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = {
                fullname,
                email,
                contact,
                address,
                password // Add logic to handle password update if necessary
            };
    
            // Example of updating the profile using fetch API
            const response = await fetch('/api/profile', {
                method: 'PUT', // Assuming you use PUT method for updating the profile
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                // Optionally, you may handle success response (e.g., show success message)
                console.log('Profile updated successfully');
            } else {
                // Handle error response
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator
    }

    if (!user) {
        return <div>User not found.</div>; // handle case where user data is not found
    }

    const renderProductImage = (base64String) => {
        return `data:image/png;base64,${base64String}`;
    };

    return (
        <>
            <HeaderShop />
            <div className="w-full h-screen flex items-center justify-center mt-6">
                <div className="flex flex-col sm:flex-row w-full sm:w-3/4 lg:w-3/5 bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col items-center sm:w-1/3 mb-4 sm:mb-0">
                        {user.picture ? (
                            <img
                                src={renderProductImage(user.picture)}
                                alt={user.name}
                                className="w-40 h-40 rounded-full mb-4"
                            />
                            
                        ) : (
                            <img
                                src="/images/default-profile.jpg"
                                alt="Profile Photo"
                                className="w-40 h-40 rounded-full mb-4"
                            />
                        )}
                        <h2 className="text-xl font-semibold">{user.fullname}</h2>
                    </div>
                    <div className="sm:w-2/3 ml-0 sm:ml-8">
                        <h3 className="text-2xl font-bold mb-4 text-center sm:text-left">User Details</h3>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-4">
                                <label className="font-semibold">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={fullname}
                                    onChange={handleFullnameChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Contact Number:</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={contact}
                                    onChange={handleContactChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={handleAddressChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Profile Picture:</label>
                                <input type="file" name="picture" className="border p-2 rounded w-full" />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
