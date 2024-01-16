'use server';

import { initStripeSDK } from '../../../_core';

type Props = {
  amount: number; // in cents
  stripeAccountDestinationTransfer: string;
  fee: number; // in cents
};

export async function createPaymentIntent({
  amount,
  stripeAccountDestinationTransfer,
  fee,
}: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(`[${createPaymentIntent.name} Stripe initialization failed]`);
    return null;
  }

  // For Terminal payments, the 'payment_method_types' parameter must include
  // 'card_present'.
  // To automatically capture funds when a charge is authorized,
  // set `capture_method` to `automatic`.
  const intent = await stripe.paymentIntents.create({
    amount,
    transfer_data: {
      destination: stripeAccountDestinationTransfer,
    },
    application_fee_amount: fee,
    currency: 'cad',
    payment_method_types: ['card_present', 'interac_present'],
    capture_method: 'manual',
    receipt_email: 'christopher.montoya@telus.com',
    metadata: {
      source: 'poc-stripe-terminal',
      context:
        'Collect payment with a Stripe Terminal. POC from Christopher (christopher.montoya@telus.com)',
    },
  });

  return intent;
}
