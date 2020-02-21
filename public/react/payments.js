class CheckoutForm extends React.Component {
  state = {
    name: null,
    amount: null,
    paymentSucceeded: false,
    errors: {
      name: '',
      amount: '',
    },
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { errors } = this.state;
    // this.setState({ [name]: value });

    switch (name) {
      case 'name':
        errors.name =
          value.length < 4 ? 'Full Name must be at least 4 characters' : '';
        break;
      case 'amount':
        errors.amount = value.length !== 0 ? 'Amount must have value' : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  // errorTrue = () => {
  //   this.state.name === '' && (
  //     <React.Fragment>
  //       <form onSubmit={this.handleSubmit}>
  //         <label style={{ color: 'red' }}>* Full Name is Required: </label>
  //         <br />
  //         <input
  //           id="name"
  //           type="text"
  //           value={this.state.name}
  //           onChange={e => this.setState({ name: e.target.value })}
  //           placeholder="Full Name"
  //           style={{ outline: '3px solid red' }}
  //         ></input>
  //         <br />
  //         <label>Amount: </label>
  //         <br />
  //         <input
  //           id="amount"
  //           type="number"
  //           value={this.state.amount}
  //           onChange={e => this.setState({ amount: e.target.value })}
  //           placeholder="Amount"
  //         ></input>
  //         <br />
  //         <label>
  //           Card Details
  //           <ReactStripeElements.CardElement />
  //         </label>
  //         <button>Donate</button>
  //       </form>
  //     </React.Fragment>
  //   );
  //   this.state.amount === '' && (
  //     <React.Fragment>
  //       <form onSubmit={this.handleSubmit}>
  //         <label>Full Name: </label>
  //         <br />
  //         <input
  //           id="name"
  //           type="text"
  //           value={this.state.name}
  //           onChange={e => this.setState({ name: e.target.value })}
  //           placeholder="Full Name"
  //         ></input>
  //         <br />
  //         <label style={{ color: 'red' }}>Amount is Required: </label>
  //         <br />
  //         <input
  //           id="amount"
  //           type="number"
  //           value={this.state.amount}
  //           onChange={e => this.setState({ amount: e.target.value })}
  //           placeholder="Amount"
  //           style={{ outline: '3px solid red' }}
  //         ></input>
  //         <br />
  //         <label>
  //           Card Details
  //           <ReactStripeElements.CardElement />
  //         </label>
  //         <button>Donate</button>
  //       </form>
  //     </React.Fragment>
  //   );
  // };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.name && this.state.amount !== '') {
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
    }
  };

  paymentSuccess = () => {
    this.setState({ paymentSucceeded: !this.state.paymentSucceeded });
  };

  render() {
    console.log(this.state);
    return this.state.paymentSucceeded ? (
      <p>Thank you for your Donation!</p>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>Full Name: </label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={e => this.handleChange(e)}
          placeholder="Full Name"
        ></input>
        <br />
        <label>Amount: </label>
        <br />
        <input
          id="amount"
          name="amount"
          type="number"
          value={this.state.amount}
          onChange={e => this.handleChange(e)}
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
