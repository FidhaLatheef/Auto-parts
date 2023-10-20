import React, { useEffect, useState } from 'react';
import Header from "UserFrontEnd/components/Header"
import Footer from "UserFrontEnd/components/Footer"
import styles from "../css/style1.module.css";
import HeroBg from "assets/images/breadcrumb-bg.jpg"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@mui/material';

function userProfile() {
    const { id } = useParams();
    const userProfile = JSON.parse(localStorage.getItem("userProfile"))
    const [showProfileForm, setShowProfileForm] = useState(true);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
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
    const [oldPassword,setOldPassword]=useState('')

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
    };

    const handleChangePasswordClick = () => {
        setShowProfileForm(false);
        setShowChangePasswordForm(true);
    };
    const handleorder = () => {
       window.location.href="/orders"
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
            <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${HeroBg})` }}>
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
            </div>
            <div className="container-xl px-4 mt-4">
                {/* <hr className="mt-0 mb-4" /> */}
                <div className="row">
                    <div className="col-xl-4" style={{marginBottom:"40px"}}>
                        
                        <div className="card mb-4 mb-xl-0" >
                            <div className={styles.cardheader}>User Profile</div>
                            <div className="card-body text-center">
                               
                                <img className="img-account-profile rounded-circle mb-2" src={`http://localhost:8000/${userProfile.image}`} alt />
        
                                <div className={styles.buttonWrapper}>
                                    <button className="btn btn-primary" type="button" onClick={handleEditProfileClick}>Edit Profile</button>
                                    <button className="btn btn-primary" type="button" onClick={handleChangePasswordClick}>Change Password</button>
                                    <button className="btn btn-primary" type="button" onClick={handleorder}>Orders</button>
                                    <button className="btn btn-primary" type="button" onClick={handleLogoutClick}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        {/* Account details card*/}
                        {showProfileForm && (
                            <div className="card mb-4">
                                <div className={styles.cardheader}>Account Details</div>
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
                        {/* Change Password card */}
                        {showChangePasswordForm && (
                            <div className="card mb-4">
                                <div className="card-header">Change Password</div>
                                <div className="card-body">
                                    <form>
                                    <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputNewPassword">Old Password</label>
                                            <input className="form-control" id="inputNewPassword" type="password" placeholder="Enter your new password"value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
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
                                        {/* {passwordChangeSuccess && (
                                            <div className="alert alert-success" role="alert">
                                                Password changed successfully!
                                            </div>
                                        )}
                                        {!passwordChangeSuccess && (
                                            <div className="alert alert-danger" role="alert">
                                                Password change failed. Please make sure the passwords match.
                                            </div>
                                        )} */}
                                        <button className="btn btn-primary" type="button" onClick={handlePasswordChange}>Confirm</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default userProfile