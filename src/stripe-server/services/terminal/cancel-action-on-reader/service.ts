'use server';

import { initStripeSDK } from '../../../_core';

type Props = {
  readerId: string;
};

export async function cancelActionOnReader({ readerId }: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(
      `[${cancelActionOnReader.name} Stripe initialization failed]`
    );
    return null;
  }

  return stripe.terminal.readers.cancelAction(readerId);
}
