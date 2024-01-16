'use client';

import { createLocation } from '@/src/stripe-server';
import { Button } from '@/ui/button';

export function ButtonCreatePaymentTerminalLocation() {
  const callback = async (onComplete: () => void) => {
    console.debug(`callback called!`);
    try {
      const location = await createLocation({});
      onComplete();

      if (!location) {
        console.error(`Something went wrong while creating a new location`);
      }

      console.log(`New location created is ${JSON.stringify(location)}`);
    } catch (error) {
      onComplete();

      console.error(error);
    }
  };

  return <Button callback={callback}>Add a new location</Button>;
}
