import React from 'react';
import { Toaster, toast } from 'react-hot-toast'
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBInput } from 'mdb-react-ui-kit';

function UserLogin() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fieldRequired, setFieldRequired] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const location=useLocation();
    
    const email = location.state && location.state.email;
        console.log(email,"hhhhhhhhhhhhhhhh")

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword === '' || confirmPassword === '') {
            setFieldRequired(true);
            toast.error("Please enter all fields");
            return;
        }
        

        const data = {
            newPassword:newPassword,
            confirmPassword:confirmPassword,
            email:email 
        };
        console.log(data)


        try {
            if (newPassword == confirmPassword) {
                const response = await axios.post("http://localhost:8000/user/resetPassword", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })  
                if (response.data) {
                    console.log("password changed")
                    toast.success('Password changed successfully!', {
                        duration: 3000,
                    });
                    setPasswordChangeSuccess(true);
                    window.location.href="/UserLogin"
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

    }
    return (
        <div>
            <Toaster/>
            {/* Section: Design Block */}
            <section className="text-center text-lg-start">
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
              .cascading-right {
              }
              @media (max-width: 991.98px) {
                .cascading-right {
                  margin-right: 0;
                }
              }
            `,
                    }}
                />
                {/* Jumbotron */}
                <div className="container py-4"  style={{marginTop:"50px"}}>
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div
                                className="card cascading-right"
                                style={{
                                    background: 'hsla(0, 0%, 100%, 0.55)',
                                    backdropFilter: 'blur(30px)',
                                }}
                            >
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">Reset Account Password</h2>
                                    <h6>Type and confirm a secure new password for the Account</h6>
                            <br/>
                                    <form>
                                        
                                        <div className="row">
                                        <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock  fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <MDBInput id='form1' type='password' name='newPassword'
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)} />
                                                </div>
                                            </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-check fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <MDBInput id='form1' type='password' name='confirmPassword'
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                                </div>
                                            </div>

                                      
                                            {/* Forgot Password link */}
                                            
                                            {/* Sign In button */}
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block mb-4"
                                                onClick={handlePasswordChange}
                                            >
                                               SUBMIT
                                            </button>
                                            {/* Don't have an account? Sign Up link */}
                                           
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
                                style={{ marginLeft: '150px' }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
            </section>
            {/* Section: Design Block */}
        </div>
    );
}

export default UserLogin;
