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
    addOrder: async (req, res) => {
        const { userId, cartItem, shippingDetails, billingDetails, total } = req.body;
        console.log(req.body);
    
        const generateOrderID = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); 
            const day = String(now.getDate()).padStart(2, '0'); 
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const orderId = `${year}${month}${day}${hours}${minutes}${seconds}`;
    
            return orderId;
        };
    
        try {
            const orderId = generateOrderID();
            let order = await orderModel.create({
                userId: userId,
                orderId: orderId,
                cartItem: cartItem,
                shippingDetails: shippingDetails,
                billingDetails: billingDetails,
                total: total,
            });
            console.log(order);
            console.log(orderId);
            res.status(200).json({ fieldRequired: false, message: 'order created' });
    
        } catch (err) {
            console.log('Error in creating order', err);
            res.status(500).json({ fieldRequired: false, message: 'Error creating order' });
        }
    }
    
}