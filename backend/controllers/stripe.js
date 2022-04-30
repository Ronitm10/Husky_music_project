const express = require('express');
const router = express.Router();
const User = require('../models/User');

const stripe = require('stripe')('sk_test_51Ku9QlCTx5CXOGLGJ4QQ8BwOdNmk0vC22iE2YoSXe8L37JwkHc2dR8DGEpDPvEJv6LBvIDTKtohkUNURlaK3ftv300RapnIcR6')
router.post('/checkout/:id', async (req, res) => {
    const id = req.params.id;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Husky Premium',
                    },
                    unit_amount: 0500,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/paymentSuccess',
        cancel_url: 'https://localhost:3000/paymentFailure',
    });
    console.log('wtf is', session.url);
    if (session.url.includes('Success')) {
        try {
            const user = User.findById(id);
            user.premium = true;
            await user.save();
        }
        catch (error) {
            console.error("Error marking premium", error);
        }
    }



    res.redirect(303, session.url);
})

module.exports = router;