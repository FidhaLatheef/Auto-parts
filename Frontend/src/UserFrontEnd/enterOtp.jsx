import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "UserFrontEnd/Actions/Timer"
import { MDBInput } from 'mdb-react-ui-kit';

function enterOTP() {
    const [otp, setOTP] = useState('')
    const [fieldRequired, setFieldRequired] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const navigate = useNavigate("");
    const location = useLocation();

    const handleForm = (e) => {
        e.preventDefault();
        if (otp === '') {
            setFieldRequired(true);
            toast.error("Please enter the OTP");
            return;
        }

        const email = location.state && location.state.email;
        console.log(email, "dthgfhvhvnnmbnm")

        const data = {
            otp: otp,
            email: email
        }
        axios.post("http://localhost:8000/user/verifyOTP", data)
            .then(function (response) {
                if (response.data) {
                    console.log("otp created...")

                    navigate("/changePswrd", { state: { email } });
                }

            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    toast.error("Please enter valid credentials")

                }

            })

    }
    const handleResendOTP = (e) => {
        e.preventDefault();
        // if (email === '') {
        //     setFieldRequired(true);
        //     toast.error("Please enter the Email");
        //     return;
        // }
        const email = location.state && location.state.email;
        console.log(email, "dthgfhvhvnnmbnm")
        const data = {
            email: email,

        };
        axios
            .post('http://localhost:8000/user/sendOTP', data)
            .then(function (response) {
                console.log("111111111111", response);
                if (response.data) {
                    console.log("otp created...hhh")

                    window.location.href = "/enterOTP", { state: { email } };
                }

            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    toast.error("Please enter valid credentials")

                }

            })


    }

    const handleTimeout = () => {
        setTimerExpired(true);
        toast.error('OTP expired');
    };


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
                <div className="container py-5" style={{ marginTop: "50px" }}>
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
                                    <h2 className="fw-bold mb-5">Receieved an OTP ?</h2>
                                    {/* <br/> */}
                                    <h6>Please enter your OTP</h6>
                                    <br />
                                    <form>
                                        {/* 2 column grid layout with text inputs for the first and last names */}
                                        <div className="row">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-ellipsis-h fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <MDBInput id='form1' type='email' name='otp'
                                                        value={otp}
                                                        onChange={(e) => setOTP(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* Email input */}

                                            <Timer initialTime={30} onTimeout={handleTimeout} />
                                            {/* Sign In button */}
                                            {timerExpired ? (

                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-block mb-4"
                                                    onClick={handleResendOTP}
                                                >
                                                    Resend OTP
                                                </button>
                                            ) : (
                                                // If the timer is still running, show the "SUBMIT" button
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block mb-4"
                                                    onClick={handleForm}
                                                >
                                                    SUBMIT
                                                </button>
                                            )}


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/otp-verification-5152137-4309037.png"
                                style={{ marginLeft: '90px' }}
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

export default enterOTP
