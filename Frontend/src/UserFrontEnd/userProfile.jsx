import React, { useEffect, useState } from 'react';
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import styles from "../css/style1.module.css";
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIcon from '@mui/icons-material/Assignment';


function userProfile() {
    const { id } = useParams();
    const userProfile = JSON.parse(localStorage.getItem("userProfile"))
    const [showProfileForm, setShowProfileForm] = useState(true);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [heading, setHeading] = useState('ACCOUNT DETAILS');
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        image: ''
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const [oldPassword, setOldPassword] = useState('')

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/getUserById/${userProfile.id}`);
                const data = response.data;
                setUser(data);
            } catch (error) {
                console.log('Error fetching user:', error);
                if (error.response.status === 401) {
                    window.location.href = "authentication/sign-in";
                }
            }
        };

        fetchUser();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUser({
            ...user,
            image: file
        });
    }

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('mobile', user.mobile);
            formData.append('password', user.password);
            formData.append('image', user.image);

            axios.put(`http://localhost:8000/user/editUser/${userProfile.id}`, formData, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(function (response) {
                console.log(response.data.message);
            }).catch(function (error) {
                console.log(error);
            });

            console.log('User updated successfully');
            window.location.href = "/UserHome"
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };
    const handleEditProfileClick = () => {
        setShowProfileForm(true);
        setShowChangePasswordForm(false);
        setHeading('ACCOUNT DETAILS');
    };

    const handleChangePasswordClick = () => {
        setShowProfileForm(false);
        setShowChangePasswordForm(true);
        setHeading('CHANGE PASSWORD');
    };

    const handleorder = () => {
        window.location.href = "/viewOrder"
    };

    const handlePasswordChange = async () => {
        try {
            if (newPassword === confirmPassword) {
                const response = await axios.put(
                    `http://localhost:8000/user/changePassword/${userProfile.id}`,
                    { newPassword, oldPassword },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.data.message === 'Password updated successfully') {
                    toast.success('Password changed successfully!', {
                        duration: 3000,
                    });
                    setPasswordChangeSuccess(true);
                }
            } else {
                toast.error('New Password and Confirm Password do not match', {
                    duration: 3000,
                });
                setPasswordChangeSuccess(false);
            }
        } catch (error) {
            console.log('Error changing password:', error);
            if (error.response.status === 405) {
                toast.error('Old password is incorrect', {
                    duration: 3000,
                });
            }
        }
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('userProfile');
        localStorage.removeItem("profileFormState");
        window.location.href = "/UserHome";
    };


    return (
        <>
            <Header />
            {/* <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Profile</h2>
                                <div className="breadcrumb__links">
                                    <a href="/UserHome"><Icon><span style={{ fontSize: "20px", color: "#db2d2e" }} className="material-symbols-outlined">
                                        house
                                    </span></Icon> Home -</a>
                                    <span>Profile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <section style={{ backgroundColor: '#eee' }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3 className='text-center text-muted pb-4' >PROFILE</h3>
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src={`http://localhost:8000/${userProfile.image}`} alt="avatar" className="rounded-circle img-fluid" style={{ width: 150 }} />
                                    <h3 style={{ marginTop: "5px" }} className="text-muted mb-2">{user.name}</h3>
                                    <p className="text-muted mb-1">{user.email}</p>
                                    <p className="text-muted mb-4">{user.mobile}</p>
                                    <div className="d-flex justify-content-center gap-3 mb-3">
                                        <button className="ripple ripple-surface btn btn-primary btn-warning" role="button" onClick={handleEditProfileClick}>Edit</button>
                                        <button className="ripple ripple-surface ripple-surface-light btn btn-primary btn-danger" role="button" onClick={handleLogoutClick}>Logout</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" onClick={handleChangePasswordClick}>
                                            <PasswordIcon />
                                            <p className="mb-0">Change Password</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" onClick={handleorder}>
                                            <AssignmentIcon />
                                            <p className="mb-0">Orders</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <h3 className='text-center text-muted pb-4'>{heading}</h3>
                            {showProfileForm && (

                                <div className="card mb-4">

                                    <div className="card-body">
                                        <form>

                                            <div className="form-group row">
                                                
                                                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Name</label>
                                                <div className="col-sm-10">
                                                    <input name="name" type="email" className="form-control" id="colFormLabel" placeholder="col-form-label" value={user.name}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-10">
                                                    <input name="email" type="email" className="form-control" id="colFormLabel" placeholder="col-form-label" value={user.email}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Mobile</label>
                                                <div className="col-sm-10">
                                                    <input name="mobile" type="number" className="form-control" id="colFormLabel" placeholder="col-form-label" value={user.mobile}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Image</label>
                                                <div className="col-sm-10">
                                                    <input name="image" type="file" className="form-control" id="colFormLabel" placeholder="col-form-label"
                                                        onChange={handleImageChange} />
                                                </div>
                                            </div>

                                            <div className="row gx-3 mb-3">
                                            </div>

                                            <div className="row gx-3 mb-3">

                                            </div>

                                            <button className="btn btn-primary" type="button" onClick={handleForm}>Edit Profile</button>
                                        </form>

                                    </div>
                                </div>
                            )}
                            {showChangePasswordForm && (
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label className="small mb-1" htmlFor="inputNewPassword">Old Password</label>
                                                <input className="form-control" id="inputNewPassword" type="password" placeholder="Enter your old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="small mb-1" htmlFor="inputNewPassword">New Password</label>
                                                <input className="form-control" id="inputNewPassword" type="password" placeholder="Enter your new password" value={newPassword} onChange={handleNewPasswordChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm Password</label>
                                                <input className="form-control" id="inputConfirmPassword" type="password" placeholder="Confirm your new password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                            </div>
                                            <Toaster />
                                            <button className="btn btn-primary" type="button" onClick={handlePasswordChange}>Confirm</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </>

    )
}

export default userProfile