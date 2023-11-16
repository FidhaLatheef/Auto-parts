var orderModel = require('../Model/OrderModel');
var nodemailer = require('nodemailer');

module.exports = {
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

            const email=billingDetails.email;
            const name=billingDetails.name;
            console.log(email)

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
                subject: 'Order Placed',
                text: `Hey ${name},
                Thank you for your purchase!
                Your order ID: ${orderId},
                The products will be shipped to the address given below.
                To,
                    ${shippingDetails.name} ,
                    ${shippingDetails.address1}, ${shippingDetails.address2},
                    ${shippingDetails.city}, ${shippingDetails.state},
                    ${shippingDetails.country}, ${shippingDetails.postcode},
                    ${shippingDetails.phone},
                Copy the order ID and track your order from out Website.
                We will send you an email as soon as your parcel is on its way.
    
                Thank you for your purchase,
                
                Best Regards,
                
                AutoParts`,    

            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("your orderId is : ", orderId)
                    //   console.log('Email sent: ' + info.response);
                }
            });

            res.status(200).json({ fieldRequired: false, orderId: orderId, message: 'order created' });


        } catch (err) {
            console.log('Error in creating order', err);
            res.status(500).json({ fieldRequired: false, message: 'Error creating order' });
        }
    },
    orderListById: async (req, res) => {
        const orderId = req.params.id;
        console.log('1', orderId);
        try {
            // const orderId=req.params.id;
            let orderList = await orderModel.findOne({ orderId });
            if (!orderList) {
                return res.status(403).send("No Order Found");
            }
            console.log('2')
            res.status(200).json({ status: "success", data: orderList });



            console.log(orderList)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error fetching order List', error: error });
        }
    },
    orderListByUserId: async (req, res) => {
        const userId = req.params.id;
        console.log(userId)
        try {
            let orders = await orderModel.find({ userId });
            console.log(orders)
            if (!orders) {
                return res.status(403).send("No Orders Found")
            }
            res.status(200).json({ status: "Success", data: orders })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error Fetching User Orders', error: error })
        }


    },
    orderLists: async (req, res) => {
        // console.log('looooooooooooo')
        try {
            // console.log('hhiiiii')
            let orderList = await orderModel.find()
            // console.log(orderList)
            res.json(orderList)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'error fetching admin users', error: err });

        }

    },
    // addOrderStatus:async(req,res)=>{
    //     const{orderId,status}=req.body;
    //     console.log(req.body)
    //     const {id}=req.params;
    //     console.log(id);

    //     try {
    //         // Find the order by orderId
    //         const order = await orderModel.findOne({ orderId });
    //         console.log(order);

    //         // Check if the order exists
    //         if (!order) {
    //           return { success: false, message: 'Order not found' };
    //         }

    //         // Find the product within the cartItem array based on productId
    //         const productToUpdate = order.cartItem.findIndex((product) => product.id.toString() === id);
    //         console.log("uuuuuuuuuuuuuuu",productToUpdate);

    //         // Check if the product exists
    //         if (!productToUpdate) {
    //           return { success: false, message: 'Product not found in order' };
    //         }

    //         console.log("1",order.cartItem[productToUpdate].status);
    //         // Update the status of the product
    //         order.cartItem[productToUpdate].status = status;
    //         console.log("2",order.cartItem[productToUpdate].status);

    //         // Save the updated order back to the database
    //         await order.save();

    //         return { success: true, message: 'Status updated successfully' };
    //       } catch (error) {
    //         return { success: false, message: 'Error updating status: ' + error.message };
    //       }
    // },
    addOrderStatus: async (req, res) => {
        const { orderId, status } = req.body;
        const { id } = req.params;

        try {
            // Find the order by orderId
            const order = await orderModel.findOne({ orderId });
            console.log(order);

            // Check if the order exists
            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            // Find the product within the cartItem array based on productId
            const productToUpdateIndex = order.cartItem.findIndex(
                (product) => product.id === id
            );

            // Check if the product exists
            if (productToUpdateIndex === -1) {
                return res.status(404).json({ success: false, message: 'Product not found in order' });
            }

            // Update the status of the product
            order.cartItem[productToUpdateIndex].status = status;

            // Save the updated order back to the database
            await order.save();

            return res.status(200).json({ success: true, message: 'Status updated successfully' });
        } catch (error) {
            console.error('Error updating status:', error);
            return res.status(500).json({ success: false, message: 'Error updating status: ' + error.message });
        }
    },
}