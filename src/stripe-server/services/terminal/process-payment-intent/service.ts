'use server';

import { initStripeSDK } from '../../../_core';

type Props = {
  readerId: string;
  paymentIntentId: string;
};

export async function processPaymentIntent({
  readerId,
  paymentIntentId,
}: Props) {
  const stripe = initStripeSDK();

  if (!stripe) {
    console.error(
      `[${processPaymentIntent.name} Stripe initialization failed]`
    );
    return null;
  }

  let attempt = 0;
  const tries = 3;
  while (true) {
    attempt++;
    try {
      let reader;

      console.debug(`[ProcessPaymentIntent] Starting`);
      reader = await stripe.terminal.readers.processPaymentIntent(readerId, {
        payment_intent: paymentIntentId,
      });

      // This code is for simulated reader only
      // console.debug(
      //   `[ProcessPaymentIntent] Presenting payment method to reader`
      // );
      // reader = await stripe.testHelpers.terminal.readers.presentPaymentMethod(
      //   reader.id
      // );

      console.debug(
        `[ProcessPaymentIntent] Process completed. Returning the reader ${reader}`
      );
      return reader;
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case 'terminal_reader_timeout':
          // Temporary networking blip, automatically retry a few times.
          if (attempt == tries) {
            console.error(error);
            return null;
          }
          break;
        case 'terminal_reader_offline':
          // Reader is offline and won't respond to API requests. Make sure the reader is powered on
          // and connected to the internet before retrying.
          console.error(error);
          return null;
        case 'terminal_reader_busy':
          // Reader is currently busy processing another request, installing updates or changing settings.
          // Remember to disable the pay button in your point-of-sale application while waiting for a
          // reader to respond to an API request.
          console.error(error);
          return null;
        case 'intent_invalid_state':
          // Check PaymentIntent status because it's not ready to be processed. It might have been already
          // successfully processed or canceled.
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
          console.log(
            'PaymentIntent is already in ' + paymentIntent.status + ' state.'
          );
          console.error(error);
          return null;
        default:
          console.error(error);
          return null;
      }
    }
  }
}
