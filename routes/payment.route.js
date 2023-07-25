const express = require('express');
const router = express.Router();
const stripe = require('stripe');
const Stripe =
    stripe('sk_test_51NXUeJLatTBVvli346ZoBCOpmlgs2aIpsrb1RtyNLlLqGaYJE6jKI6ECMME2Iy3GDlplAb81OQf2T4Mp0RZFW0PG00TSql6w54');
//dans stripe on ajoute notre sercret key
router.post('/', async (req, res) => {
    console.log(req.body)
    let status, error;
    const { token, amount } = req.body;
    try {
        await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
        });
        status = 'success';
    } catch (error) {
        console.log(error);
        status = 'Failure';
    }
    res.json({ error, status });
});
module.exports = router;
