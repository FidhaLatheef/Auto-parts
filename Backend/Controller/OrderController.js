var orderModel = require('../Model/OrderModel');


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
    orderLists: async (req, res) => {
        console.log('looooooooooooo')
        try {
            console.log('hhiiiii')
            let orderList = await orderModel.find()
            console.log(orderList)
            res.json(orderList)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'error fetching admin users', error: err });

        }

    }
}