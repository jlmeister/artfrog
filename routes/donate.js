import express from 'express';
const router = express.Router();

router.post('api/donate', (req, res, next) => {
  
})


app.post('/donate', (req, res) => {
  // // Token is created using Checkout or Elements!
  // // Get the payment token ID submitted by the form:
  // const token = req.body.stripeToken; // Using Express

  // (async () => {
  //   const charge = await stripe.charges.create({
  //     amount: 999,
  //     currency: 'usd',
  //     description: 'Example charge',
  //     source: token,
  //   });
  // })();
  res.render('success.ejs');
});