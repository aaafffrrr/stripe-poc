import { NextResponse } from 'next/server';
import {
  STRIPE_WEBHOOK_EVENTS_ENUM,
  StripeWebhookEventsEnum,
} from '@/stripe-server';

// Example to listen Wehhook events from Stripe API. This code is not used in the current demo app. I added here as example only.
export async function POST(req: Request) {
  const event = await req.json();

  // Handle the event
  switch (event.type as StripeWebhookEventsEnum) {
    case STRIPE_WEBHOOK_EVENTS_ENUM.TERMINAL_READER_SUCCEEEDED:
      console.debug(
        `Event receives is ${
          STRIPE_WEBHOOK_EVENTS_ENUM.TERMINAL_READER_SUCCEEEDED
        } with value ${JSON.stringify(event.data)}`
      );
      // event.data.object; // value should be the paymentIntent
      break;
    case STRIPE_WEBHOOK_EVENTS_ENUM.TERMINAL_READER_FAILED:
      console.debug(
        `Event receives is ${
          STRIPE_WEBHOOK_EVENTS_ENUM.TERMINAL_READER_FAILED
        } with value ${JSON.stringify(event.data)}`
      );
      // event.data.object; // value should be the paymentIntent
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json(
    {
      received: true,
    },
    { status: 200 }
  );
}
