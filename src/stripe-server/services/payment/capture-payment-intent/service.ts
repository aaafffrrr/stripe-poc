'use server';

import { initStripeSDK } from '../../../_core';

type Props = {
  readerId: string;
  paymentIntentId: string;
};

export async function capturePaymentIntent({ paymentIntentId }: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(
      `[${capturePaymentIntent.name} Stripe initialization failed]`
    );
    return null;
  }

  try {
    const intent = await stripe.paymentIntents.capture(paymentIntentId);
    return intent;
  } catch (error) {
    console.error(
      `Something went wrong while capturing the payment intent ${paymentIntentId}`
    );
    console.error(error);
    return null;
  }
}
