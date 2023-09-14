import axios from 'axios';
import React, { useState } from 'react';

function UserSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = (e) => {
        e.preventDefault();

        // if (name === '' || email === '' || mobile === '' || password === '' || location === '' || role === '' || !image === '') {
        //     setFieldRequired(true);
        //     toast.error('Please enter all fields')
        //     return;
        // }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("password", password);
        formData.append("image", image);

        // const token = localStorage.getItem('token');
        // axios.defaults.headers.common['Authorization'] = token;
        axios
            .post('http://localhost:8000/user/signUp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(function (response) {
                window.location.href = '/UserHome';

            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    // setExist(true);
                    // toast.error('Admin Already Exist')
                    if (error.response.status == "401") {
                        window.location.href = "authentication/sign-in";
                    }
                }
            });
    };
    return (
        <div>
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
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Example1"
                                                        className="form-control"
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example1"
                                                    >
                                                        Name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="number"
                                                        id="form3Example2"
                                                        className="form-control"
                                                        name="mobile"
                                                        value={mobile}
                                                        onChange={(e) => setMobile(e.target.value)}
                                                        placeholder="Mobile"
                                                    />
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example2"
                                                        
                                                    >
                                                        Mobile
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Email input */}
                                        <div className="form-outline mb-4">
                                            <input
                                                type="email"
                                                id="form3Example3"
                                                className="form-control"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email"

                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="form3Example3"
                                               
                                            >
                                                Email address
                                            </label>
                                        </div>
                                        {/* Password input */}
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="form3Example4"
                                                className="form-control"
                                                name='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="form3Example4"
                                               
                                            >
                                                Password
                                            </label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="file"
                                                id="form3Example4"
                                                className="form-control"
                                                name="image"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                placeholder="Image"
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="form3Example4"
                                               
                                            >
                                                Image
                                            </label>
                                        </div>
                                        {/* Sign Up button */}
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
