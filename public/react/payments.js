class CheckoutForm extends React.Component {
  state = {
    name: '',
    amount: '',
    paymentSucceeded: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { token } = await this.props.stripe.createToken({
        name: this.state.name,
      });
      const { amount } = this.state;
      await fetch('api/donate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ token, amount }),
      }).then(res => {
        this.paymentSuccess();
      });
      console.log(token);
    } catch (err) {
      throw err;
    }
  };

  paymentSuccess = () => {
    this.setState({ paymentSucceeded: !this.state.paymentSucceeded });
  };

  render() {
    console.log(this.state, this.props);
    return this.state.paymentSucceeded ? (
      <p>Thank you for your Donation!</p>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>Full Name: </label>
        <br />
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="Full Name"
        ></input>
        <br />
        <label>Amount: </label>
        <br />
        <input
          id="amount"
          type="number"
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })}
          placeholder="Amount"
        ></input>
        <br />
        <label>
          Card Details
          <ReactStripeElements.CardElement />
        </label>
        <button>Donate</button>
      </form>
    );
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
    );
  }
}

ReactDOM.render(<DonationApp />, document.getElementById('donate'));
