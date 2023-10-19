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