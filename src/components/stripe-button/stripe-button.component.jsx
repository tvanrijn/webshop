import React from "react";
import "./stripe-button.styles.scss";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_6MriVS9VsteunQvCmCvRdLi700QQAhsZCn";

  const onToken = token => {
    console.log(token);
    alert("Payment succesful");
    //empty cart
  };

  return (
    <StripeCheckout
      label="Pay Now"
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
    />
  );
};

export default StripeCheckoutButton;
