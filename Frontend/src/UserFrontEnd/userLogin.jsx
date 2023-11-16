import React from 'react';
import { Toaster, toast } from 'react-hot-toast'
import axios from "axios";
import { useState } from "react";
import { MDBInput } from 'mdb-react-ui-kit';

function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fieldRequired, setFieldRequired] = useState(false);


    const handleForm = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setFieldRequired(true);
            toast.error("Please enter all fields");
            return;
        }

        const data = {
            email: email,
            password: password
        };

        axios
            .post('http://localhost:8000/user/Login', data)
            .then(function (response) {

                if (response.data.fieldRequired) {
                } else {
                    localStorage.setItem('userToken', response.data.token);
                    localStorage.setItem('userProfile', JSON.stringify(response.data.userProfile));
                    window.location.href = '/UserHome'
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    toast.error("Please enter valid credentials")

                }

            })


    }
    return (
        <div>
            <Toaster />
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
                <div className="container py-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0 mt-5">
                            <div
                                className="card cascading-right"
                                style={{
                                    background: 'hsla(0, 0%, 100%, 0.55)',
                                    backdropFilter: 'blur(30px)',
                                }}
                            >
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">Login</h2>
                                    <form>
                                        {/* 2 column grid layout with text inputs for the first and last names */}
                                        <div className="row">
                                            {/* Email input */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <MDBInput label='Email' id='form1' type='email' name='email'
                                                        value={email}
                                                       
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <MDBInput label='Password' id='form1' type='password' name='password'
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* Forgot Password link */}
                                            <div className="mb-3">
                                                <a href="/forgotPswrd">Forgot password?</a>
                                            </div>
                                            {/* Sign In button */}
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block mb-4"
                                                onClick={handleForm}
                                            >
                                                Sign in
                                            </button>
                                            {/* Don't have an account? Sign Up link */}
                                            <div>
                                                Dont have an account? <a href="/UserSignUp">Sign Up</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img
                                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                                style={{ marginLeft: '200px' }}
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
