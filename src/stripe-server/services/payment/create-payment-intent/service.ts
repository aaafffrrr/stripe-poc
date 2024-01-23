'use server';

import { initStripeSDK } from '../../../_core';
import { ServerConfig } from '@/config/server';

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
  const email = ServerConfig.DEVELOPER_EMAIL;
  const intent = await stripe.paymentIntents.create({
    amount,
    transfer_data: {
      destination: stripeAccountDestinationTransfer,
    },
    application_fee_amount: fee,
    currency: 'cad',
    payment_method_types: ['card_present', 'interac_present'],
    // capture_method: 'manual',
    capture_method: 'automatic',
    receipt_email: email,
    metadata: {
      source: 'poc-stripe-terminal',
      context: `Collect payment with a Stripe Terminal. POC from Christopher (${email})`,
    },
  });

  return intent;
}
