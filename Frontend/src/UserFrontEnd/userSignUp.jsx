import axios from 'axios';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'
import { MDBInput } from 'mdb-react-ui-kit';

function UserSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [fieldRequired, setFieldRequired] = useState(false);
    const [Exist, setExist] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || mobile === '' || password === ''  || !image === '') {
            setFieldRequired(true);
            toast.error('Please enter all fields')
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("password", password);
        formData.append("image", image);
        axios
            .post('http://localhost:8000/user/signUp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                window.location.href = '/UserLogin';

            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    setExist(true);
                    toast.error('User Already Exist')
                    if (error.response.status == "401") {
                        window.location.href = "/UserLogin";
                    }
                }
            });
    };
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
                                    <h2 className="fw-bold mb-5">Sign up </h2>
                                    <form>
                                        <div className="row">
                                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput label="Name" id='form1' type='text' name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput label="Mobile" id='form1' type='number' name="mobile"
                              value={mobile}
                              onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>


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
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-camera fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput name="image"
                              onChange={(e) => setImage(e.target.files[0])}
                              placeholder="Image"  id='form1' type='file' />
                          </div>
                        </div>
                                        </div>
                                        {/* Email input */}
                                       
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block btn-lg mb-4"
                                            onClick={handleForm}
                                        >
                                            Sign up
                                        </button>
                                        {/* Already have an account? Sign In link */}
                                        <div>
                                            Already have an account? <a href="/UserLogin">Sign In</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img
                                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
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

export default UserSignUp;
