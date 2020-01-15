import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { emptyCart } from "../../redux/cart/cart.actions";
import Button from "../custom-button/custom-button.component";

const StripeCheckoutButton = ({ price, emptyCart, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_6MriVS9VsteunQvCmCvRdLi700QQAhsZCn";

  const onToken = token => {
    emptyCart();
    alert(
      `Thank you for your order. You will receive any status updates at ${token.email}`
    );
    history.push("/");
  };

  return (
    <StripeCheckout
      name="The Crown Shop"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is €${price}`}
      amount={priceForStripe} // cents
      panelLabel="Pay"
      currency="EUR"
      token={onToken}
      stripeKey={publishableKey}
    >
      <Button>Order Now</Button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: () => dispatch(emptyCart())
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(StripeCheckoutButton)
);
