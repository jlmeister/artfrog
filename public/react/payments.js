const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class CheckoutForm extends React.Component {
  state = {
    name: '',
    amount: '',
    paymentSucceeded: false
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await this.props.stripe.createToken({ name: this.state.name })
      const amount = this.state.amount;
      await fetch('api/donate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ token, amount })
      })
      .then(res => {
        this.paymentSuccess();
      })
      console.log(token);
    }
    catch (err) {
      throw err;
    }
  }

  paymentSuccess = () => {
    this.setState({ paymentSucceeded: !this.state.paymentSucceeded });
  }

  render() {
    console.log(this.state, this.props);
    return (
      this.state.paymentSucceeded ? (
        <p>Thank you for your Donation!</p>
      ) : (
        <form onSubmit={this.handleSubmit}>
          <label>Fullname: </label>
          <input id="name" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="fullname"></input>
          <br />
          <label>Amount: </label>
          <input id="amount" type="number" value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} placeholder="amount"></input>
          <br />
          <label>
            Card Details
          <ReactStripeElements.CardElement {...createOptions()} />
          </label>
          <button>Donate</button>
        </form>
      )
    )
  }
}

const InjectedCheckoutForm = ReactStripeElements.injectStripe(CheckoutForm);

class DonationApp extends React.Component {
  render() {
    return (
      <ReactStripeElements.StripeProvider apiKey="pk_test_05kE5hIzVOyQ5Yab8kovIuDU002CVjKPcB">
        <ReactStripeElements.Elements>
          <InjectedCheckoutForm />
        </ReactStripeElements.Elements>
      </ReactStripeElements.StripeProvider>
    )
  }
}

ReactDOM.render(<DonationApp />, document.getElementById('donateArt'))