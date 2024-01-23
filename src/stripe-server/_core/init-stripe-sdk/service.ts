import { ServerConfig } from '@/config/server';
import Stripe from 'stripe';

export function initStripeSDK() {
  const key = ServerConfig.STRIPE_SECRET_KEY;

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
