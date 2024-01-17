'use server';

import { initStripeSDK } from '../../../_core';

type Props = {
  id: string;
};

export async function findOnePaymentIntent({ id }: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(
      `[${findOnePaymentIntent.name} Stripe initialization failed]`
    );
    return null;
  }

  try {
    const intent = await stripe.paymentIntents.retrieve(id);

    if (!intent) {
      console.error(`No payment intent found with the id ${id}`);
      return null;
    }

    return intent;
  } catch (error) {
    console.error(
      `Something went wrong while retrieving payment intent with id ${id}.`
    );
    console.error(error);
    return null;
  }
}
