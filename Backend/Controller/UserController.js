var jwt = require('jsonwebtoken')
var userModel = require('../Model/UserModel');
var orderModel = require('../Model/OrderModel');
const bcrypt = require('bcrypt');
var BrandModel=require('../Model/BrandModel')
var categoryModel=require('../Model/CategoryModel')
var productModel=require('../Model/ProductModel')

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
    userLogin: async (req, res) => {
        const { email, password } = req.body;
        let user = await userModel.findOne({email});
        console.log(user)

        // Compare the provided password with the hashed password from the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (user && isPasswordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ email: user.email }, 'myjwtsecretkey');
            user.tokens=token
            user.save()
            
            const userProfile={
                id:user._id ,
                name:user.name,
                email:user.email,
                mobile:user.mobile,
                image:user.image,
            }
            // Return the token as a response
            res.status(200).json({error:false,message:'sucess', token: token ,userProfile:userProfile});
        } else {
          
            res.status(400).json({ invalid: true, message: 'Invalid credentials' });
        }
    },
    brandList: async (req, res) => {
        try {
            let brandList = await BrandModel.find()
            console.log(brandList)
            return res.status(201).send({ "data": brandList})
        } catch (err) {
            console.log(err)
        }
    },
    categoryList: async (req, res) => {
        try {
            let categories = await categoryModel.find();
            console.log(categories)
            return res.status(201).send({ "data": categories })
        }
        catch (err) {
            console.log(err)
        }
    },
    productList: async (req, res) => {
        try {
          let products = await productModel.find();
          console.log(products);
          products = products.map((product) => {
            if (product.images) {
              return {
                ...product.toObject(),
                images: product.images.map((image) => `${image}`), 
              };
            }
            return product;
          });
          res.json(products);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Error retrieving products' });
        }
      },
      getProductById: async (req, res) => {
        const { id } = req.params
        try {
          let product = await productModel.findById(id)
          console.log(product)
          res.json(product)
        } catch (err) {
          console.log('errorr...', err)
        }
      },
      userList: async (req, res) => {
        console.log('hiiiiiiiiiiiiiiiii')
        try {
            let Users = await userModel.find();
            console.log('looooooooo')
            res.json(Users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error fetching  users', error: error });
        }
    },
        deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await userModel.findByIdAndDelete(id);
            res.send("deleted successfully");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "unable to deleted", error: error });
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        console.log(id)
        console.log('sdjggggggggggggggggA')
        try {
            var user = await userModel.findById(id);
            console.log(user)
            res.json(user)
        } catch (err) {
            console.log(err)
        }
    },
    editUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, mobile, password } = req.body;
        console.log(name);
        try {
            const user = await userModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.name = name;
            user.email = email;
            user.mobile = mobile;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            if (req.file && req.file.path) {
                const newImage = req.file.path.replace(/\\/g, '/');
                user.image = newImage;
            }
            await user.save();

            console.log('User updated successfully');
            console.log(user);
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error updating user' });
        }
    },
    
}