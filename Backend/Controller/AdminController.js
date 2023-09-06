var jwt = require('jsonwebtoken')
var adminModel = require('../Model/AdminModel');
const bcrypt = require('bcrypt');

module.exports = {

    adminSignUp: async (req, res) => {

        const { name, email, mobile, password,location,role } = req.body;
        const imagePath = req.file.path;
        if (!name || !email || !mobile || !password || !location || !role) {
            return res.status(400).json({ fieldRequired: true, message: 'Please enter all the fields' });
        }
        else {
            const adminExist = await adminModel.findOne({ email: req.body.email })
            if (adminExist) {
                res.status(400).json({ exist: 'Admin already exist' })
            }
            else {
                try {
                    let admin = await adminModel.create({
                        name: name,
                        email: email,
                        mobile: mobile,
                        password: password,
                        image: imagePath,
                        location:location,
                        role:role
                    });
                    res.status(200).json({ fieldRequired: false, message: 'Admin created' });

                } catch (err) {
                    console.log('Error in creating Admin', err);
                    res.status(500).json({ fieldRequired: false, message: 'Error creating admin' });
                }

            }
        }
    },
    adminLogin: async (req, res) => {
        const { email, password } = req.body;
        let admin = await adminModel.findOne({email});

        // Compare the provided password with the hashed password from the database
        const isPasswordMatch = await bcrypt.compare(password, admin.password);

        if (admin && isPasswordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ email: admin.email }, 'myjwtsecretkey');
            admin.tokens=token
            admin.save()
            
            // Return the token as a response
            res.status(200).json({error:false,message:'sucess', token: token });
        } else {
          
            res.status(400).json({ invalid: true, message: 'Invalid credentials' });
        }
    },
    adminUsers: async (req, res) => {
        try {
            let adminUsers = await adminModel.find();
            res.json(adminUsers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error fetching admin users', error: error });
        }
    },
    deleteAdmin: async (req, res) => {
        const { id } = req.params;
        try {
            await adminModel.findByIdAndDelete(id);
            res.send("deleted successfully");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "unable to deleted", error: error });
        }
    },
    getAdminById: async (req, res) => {
        const { id } = req.params;
        console.log(id)
        console.log('sdjggggggggggggggggA')
        try {
            var admin = await adminModel.findById(id);
            console.log(admin)
            res.json(admin)
        } catch (err) {
            console.log(err)
        }
    },
    editAdmin: async (req, res) => {
        const { id } = req.params;
        const { name, email, mobile, password,location,role } = req.body;
        console.log(name);
        try {
            const admin = await adminModel.findById(id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            admin.name = name;
            admin.email = email;
            admin.mobile = mobile;
            admin.location =location;
            admin.role = role;
            if (password) {
                admin.password = await bcrypt.hash(password, 10);
            }
            if (req.file && req.file.path) {
                const newImage = req.file.path.replace(/\\/g, '/');
                admin.image = newImage;
            }
            await admin.save();

            console.log('Admin updated successfully');
            console.log(admin);
            res.json({ message: 'Admin updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error updating admin' });
        }
    },
    adminLogout: async (req, res) => {
        const token = req.headers.authorization;
       
        if (token) {
            try {
                const admin = await adminModel.findOne({ tokens: token });
                if (admin && admin.tokens) {
                    admin.tokens = '';
                    await admin.save();
                }
            } catch (error) {
                console.error('Error while updating token:', error);
            }
        }
    
        res.json({ message: 'Logout successfully' });
    },
    adminProfile:async (req,res)=>{
     const tokenEmail=req.user.email;
     try{
        const  adminProfile =await adminModel.findOne({email:tokenEmail});
        if(adminProfile){
            res.json(adminProfile)

        }else{
            throw Error("No such user found")
        }
     }catch(err){
        console.log(err)
     }

    }
    
};
