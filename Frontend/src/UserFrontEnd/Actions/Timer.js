import React, { useEffect, useState } from "react";

function CountdownTimer({ initialTime, onTimeout }) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time <= 0) {
            onTimeout();
        } else {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [time, onTimeout]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${ minutes }:${ remainingSeconds < 10 ? "0" : "" }${ remainingSeconds }`;
    };

    return <div style={{marginBottom:"30px"}}>Resend OTP In: {formatTime(time)}</div>;
    CountdownTimer.propTypes = {
        initialTime: PropTypes.number.isRequired, // Validate initialTime as a required number
        onTimeout: PropTypes.func.isRequired, // Validate onTimeout as a required function
    };
}

export default CountdownTimer;