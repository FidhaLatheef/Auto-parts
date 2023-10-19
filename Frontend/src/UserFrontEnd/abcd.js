import regstyles from "../css/reg.module.css";
import img1 from "../assets/images/wallpaper/img4.jpg";
import img2 from "../assets/images/wallpaper/img2.jpg";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Icon } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import TopNavBar from "./userFrontEnd/topNavBar";
import Footer from "./userFrontEnd/footer";
import CountdownTimer from "./userFrontEnd/timer";

function Otp() {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const data = JSON.parse(localStorage.getItem("email"));
  const username = data.username;

  const otpSubmit = (event) => {
    event.preventDefault();
    console.log({ otp });

    if (otp === "") {
      setError1("Enter OTP");
    } else {
      var UserLogin = { otp: otp };
      axios
        .post("http://localhost:8000/users/verifyotp", UserLogin)
        .then((response) => {
          if (response.status === 200) {
            // localStorage.setItem("usertoken", response.data.token);
            // console.log(response.data.user);

            // localStorage.setItem("userProfile", JSON.stringify(response.data.user));
            console.log("hello");
            window.location.href = "/resetpassword";
          }
        })
        .catch((error) => {
          setError1("Invalid OTP");
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    }
  };

  const handleResendOTP = (event) => {
    event.preventDefault();
    console.log({ username });

    if (username === "") {
      setError1("Enter username");
    } else {
      var UserLogin = { Username: username };
      axios
        .post("http://localhost:8000/users/forgotpassword", UserLogin)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("email", JSON.stringify(response.data.email));
            console.log("hello", response.data.email);
            window.location.href = "/verifyotp";
          }
        })
        .catch((error) => {
          setError1("Invalid Username");
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    }
  };
  const handleTimeout = () => {
    setError1("OTP expired");
  };

  return (
    <div>
      <TopNavBar />
      <div className={regstyles.body}>
        <div className={regstyles.container}>
          <input type="checkbox" id="flip" className={regstyles.flip} />
          <div className={regstyles.cover}>
            <div className={regstyles.front}>
              <img src={img1} alt="front" />
              <div className={regstyles.text}>
                <span className={regstyles.text1}>
                  Every new friend is a
                  <br />
                  new adventure
                </span>
                <span className={regstyles.text2}>Lets get connected</span>
              </div>
            </div>
          </div>
          <div className={regstyles.forms}>
            <div className={regstyles.formcontent}>
              <div className={regstyles.loginform}>
                <div className={regstyles.title}>Verify OTP</div>
                <form action="#">
                  <div className={regstyles.inputboxes}>
                    <p>We have sent an OTP to your registered email</p>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-key" />
                      <input
                        type="text"
                        placeholder="Enter your OTP"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        required
                      />
                    </div>
                    <CountdownTimer initialTime={30} onTimeout={handleTimeout} />
                    {error1 && <p style={{ color: "red" }}>{error1}</p>}
                    {error1 === "OTP expired" && (
                      <button
                        className={`${regstyles.button} ${regstyles.inputbox}`}
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </button>
                    )}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className={`${regstyles.button} ${regstyles.inputbox}`}>
                      <input
                        type="submit"
                        onClick={otpSubmit}
                        placeholder="Verify OTP"
                        defaultValue="Submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Otp;