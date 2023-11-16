import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import { MDBInput } from 'mdb-react-ui-kit';

function forgotPswrd() {
    const [email, setEmail] = useState('')
    const [fieldRequired, setFieldRequired] = useState(false);
    const navigate = useNavigate("");
    const location = useLocation();

    const handleForm = (e) => {
        e.preventDefault();
        if (email === '') {
            setFieldRequired(true);
            toast.error("Please enter the Email");
            return;
        }
        const data = {
            email: email,

        };
        axios
            .post('http://localhost:8000/user/sendOTP', data)
            .then(function (response) {
                if (response.data) {
                    console.log("otp created...")

                    navigate("/enterOTP", { state: { email } });
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
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div
                                className="card cascading-right"
                                style={{
                                    background: 'hsla(0, 0%, 100%, 0.55)',
                                    backdropFilter: 'blur(30px)',
                                }}
                            >
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">Forgot Your Password ?</h2>
                                    {/* <br/> */}
                                    <h6>Please enter your email address and we will email you an OTP to Reset your Password</h6>
                                    <br />
                                    <form>
                                        {/* 2 column grid layout with text inputs for the first and last names */}
                                        <div className="row">
                                            {/* Email input */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <MDBInput id='form1' type='email' name='email'
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>

                                            {/* Sign In button */}
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block mb-4"
                                                onClick={handleForm}
                                            >
                                                Send OTP
                                            </button>


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img
                                src="https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg"
                                style={{ marginLeft: '100px' }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
            </section>
            {/* Section: Design Block */}
        </div>
    )
}

export default forgotPswrd
