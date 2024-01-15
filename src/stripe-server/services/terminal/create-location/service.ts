import { initStripeSDK } from '../../_core';

export async function createLocation() {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(`[${createLocation.name} Stripe initialization failed]`);
    return null;
  }

  const location = await stripe.terminal.locations.create({
    display_name: 'My First Store',
    address: {
      line1: '1234 Main Street',
      city: 'San Francisco',
      postal_code: '94111',
      state: 'CA',
      country: 'US',
    },
  });

  return location;
}
