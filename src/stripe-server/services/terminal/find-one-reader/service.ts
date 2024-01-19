'use server';

import Stripe from 'stripe';
import { initStripeSDK } from '../../../_core';

type Props = {
  id: string;
};

export async function findOneReader({ id }: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(`[${findOneReader.name} Stripe initialization failed]`);
    return null;
  }

  const reader = await stripe.terminal.readers.retrieve(id);

  if (!reader) {
    return null;
  }

  if (reader.deleted) {
    return null;
  }

  return reader as Stripe.Response<Stripe.Terminal.Reader>;
}
