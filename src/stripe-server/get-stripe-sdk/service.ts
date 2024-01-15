import { config } from '@/config';
import Stripe from 'stripe';

export function getStripeSDK() {
  const key = config.STRIPE_SECRET_KEY;

  if (!key) {
    console.error(`Stripe secret key is missing`);
    return null;
  }

  const stripe = new Stripe(key, {
    apiVersion: '2023-10-16',
  });

  if (!stripe) {
    console.error(`Failed to load Stripe SDK`);
    return null;
  }

  return stripe;
}
