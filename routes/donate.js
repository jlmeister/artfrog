const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SK);
require('dotenv').config();
const router = express.Router();

const charge = (token, amount) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: 'usd',
    source: token,
    description: 'just a donation'
  })
}

router.post('/api/donate', async (req, res) => {
  console.log('token: ', req.body);
  try {
    let data = await charge(req.body.token.id, req.body.amount);
    console.log(data);
    res.send('charged!')
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

module.exports = router;