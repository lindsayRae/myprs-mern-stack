import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51IJe8vKIlzeRvEPs3C898zTKf3PrZ5IPAD7b9WSSGoWGLUpfw0X0dbdSMk5lrpfhGpIaoPw4KVlHHmeiWLIaA2oN00HOXfsn3g';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
