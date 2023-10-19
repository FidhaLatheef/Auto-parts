const OtpModel = require("../Model/OtpModel");
const userModel = require("../Model/UserModel");
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = {
    sendOtp: async (req, res) => {
        const { email } = req.body;
        try {

            let user = await userModel.findOne({ email });
            console.log(user)

            if (!user) {
                return res.status(401).json("Email not found")
            }

            if (user) {
                // Generate OTP and save it to the database
                var OTP = Math.floor((Math.random() * 900000 + 100000))

                var otpForm = await OtpModel.create({
                    email: email,
                    otp: OTP
                })
                await otpForm.save()

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'fashionoofshn@gmail.com',
                        pass: 'ehsl znhi yjyj krdi'
                    }
                });

                var mailOptions = {
                    from: 'fashionoofshn@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: `Your OTP is ${OTP}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("your OTP is : ", OTP)
                        //   console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json(`An OTP has been sent to your registered email`)
            }


        } catch (err) {
            console.log(err);
        }
    },
    verifyOTP: async (req, res) => {
        console.log("hiiiiiiiiiii")
        const { otp, email } = req.body
        console.log("000000000",email)
        try {
            let otpCheck = await OtpModel.findOne({ email })
            console.log("11111111111111",otpCheck);
            if (!otpCheck) {
                return res.status(403).json("Invalid OTP");
            }else{
                if (otp == otpCheck.otp) {

                    return res.status(200).json("Valid OTP")
                }
            }
                

        
        } catch (err) {
            console.log(err)
        }
    },
    resetPassword: async (req, res) => {
        const { newPassword, confirmPassword, email } = req.body;
        console.log(req.body)
        console.log("fiiiiiiiii")

        try {
            if (!newPassword || !confirmPassword) {
                return res.status(500).json("Fields cannot be empty");
            } else if (newPassword !== confirmPassword) {
                return res.status(500).json("Passwords do not match");
            }

            const user = await userModel.findOne({email});
            console.log('User password from database:', user.password);
        
            // If the user doesn't exist, return an error
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            // Check if the current password matches the one in the database
            // const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        
            // If the current password is not valid, return an error
            // if (!isPasswordValid) {
            //   console.log("uuuuuuuuuuuuuuuuuuuuuu")
            //   return res.status(405).json({ oldError:true, message: 'Current password is incorrect' });
            // }
        
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
        
            // Update the user's password in the database
            user.password = hashedPassword;
            await user.save();
          
            return res.status(200).send({ message: "Password updated successfully" });
            
        } catch (err) {
            console.log(err)
        }

    }
};
