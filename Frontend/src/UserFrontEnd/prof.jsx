import React from 'react';
import { Toaster, toast } from 'react-hot-toast'
import axios from "axios";
import { useState } from "react";
import { MDBInput } from 'mdb-react-ui-kit';


function ProductDetails() {
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
    <div >
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput label="name" id='form1' type='text' name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput label="mobile" id='form1' type='number' name="mobile"
                              value={mobile}
                              onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput label='email' id='form1' type='email' name='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput label='password' id='form1' type='password' name='password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-picture-o fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput name="image"
                              onChange={(e) => setImage(e.target.files[0])}
                              placeholder="Image" label='image' id='form1' type='file' />
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg">Register</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default ProductDetails;
