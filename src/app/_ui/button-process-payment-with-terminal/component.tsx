'use client';

import { processPaymentIntent } from '@/stripe-server';
import { Button } from '@/ui/button';

type Props = {
  readerId: string;
  paymentIntentId: string;
};

export function ButtonProcessPaymentWithTerminal({
  readerId,
  paymentIntentId,
}: Props) {
  const callback = async (onComplete: () => void) => {
    try {
      const reader = await processPaymentIntent({
        readerId,
        paymentIntentId,
      });
      onComplete();

      if (!location) {
        console.error(
          `Something went wrong while processing payment ${paymentIntentId} with reader ${readerId}`
        );
      }

      console.debug(
        `Payment Intent ${paymentIntentId} processed: ${JSON.stringify(reader)}`
      );
    } catch (error) {
      onComplete();
      console.error(error);
    }
  };

  return <Button callback={callback}>Process payment</Button>;
}
