var jwt = require('jsonwebtoken')
var userModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');

module.exports={
    userSignUp: async (req, res) => {

        const { name, email, mobile, password } = req.body;
        console.log(req.body)
        const imagePath = req.file.path;
        if (!name || !email || !mobile || !password ) {
            return res.status(400).json({ fieldRequired: true, message: 'Please enter all the fields' });
        }
        else {
            const userExist = await userModel.findOne({ email: req.body.email })
            if (userExist) {
                res.status(400).json({ exist: 'user already exist' })
            }
            else {
                try {
                    let user = await userModel.create({
                        name: name,
                        email: email,
                        mobile: mobile,
                        password: password,
                        image: imagePath,
                    });
                    console.log(user)
                    res.status(200).json({ fieldRequired: false, message: 'user created' });

                } catch (err) {
                    console.log('Error in creating user', err);
                    res.status(500).json({ fieldRequired: false, message: 'Error creating user' });
                }

            }
        }
    },
}