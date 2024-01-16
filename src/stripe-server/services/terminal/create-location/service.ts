'use server';

import { generateRandomName } from '@/utils/generate-random-name';
import { initStripeSDK } from '../../../_core';
import { generateRandomAddress } from '@/src/utils/generate-random-address';

type Props = {
  displayName?: string;
  address?: {
    line1: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  } | null;
};

export async function createLocation({ displayName, address }: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(`[${createLocation.name} Stripe initialization failed]`);
    return null;
  }

  let display_name = displayName || `Clinic ${generateRandomName()}`;
  let paramAddress = address || generateRandomAddress();

  const { line1, city, postalCode: postal_code, state, country } = paramAddress;
  const location = await stripe.terminal.locations.create({
    display_name,
    address: {
      line1,
      city,
      postal_code,
      state,
      country,
    },
  });

  return location;
}
