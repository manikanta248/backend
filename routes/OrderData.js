const express = require('express');
const router = express.Router();

const Order = require('../models/Orders');

router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data;
    let orderDate = req.body.order_date;
    let userEmail = req.body.email;

    if (!userEmail) {
        return res.status(400).send("Email is required");
    }

    data.unshift({ Order_date: orderDate });

    try {
        let existingOrder = await Order.findOne({ 'email': userEmail });

        if (!existingOrder) {
            await Order.create({
                email: userEmail,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate({ email: userEmail }, { $push: { order_data: data } });
        }

        return res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let userEmail = req.body.email;
        let eId = await Order.findOne({ 'email': userEmail });
        return res.json({ orderData: eId });
    } catch (error) {
        return res.status(500).send("Error: " + error.message);
    }
});

module.exports = router;
